"""
Calculate statistics from data, also clean and standardize
Author: @developmentseed
Run:
    python vector_stats.py --help
"""

import click
import json
from geojson import FeatureCollection as fc
from shapely.geometry import shape


def update_dict_sum(key, value, data=None):
    if not data:
        data = {}
    if key in data.keys():
        data[key] += value
    else:
        data.update({key: value})
    return data


def categorize(setup, county, val):
    if county in setup.keys():
        cat = 0
        for (c, condit) in setup[county].items():
            if len(condit) == 2 and (condit[0] <= val < condit[1]):
                cat = c
            if len(condit) == 1 and (condit[0] <= val):
                cat = c
            if val == 0:
                cat = 0
        return int(cat)
    return None


categorize_setup = {
    "agepop_2010_stat_cat": {
        "la": {
            "1": (1, 15023),
            "2": (15023, 30334),
            "3": (30334, 65410),
            "4": (65410, 106425),
            "5": (106425,),
        },
        "mm": {
            "1": (1, 144201),
            "2": (144201, 307623),
            "3": (307623, 621810),
            "4": (621810, 1002498),
            "5": (1002498,),
        },
        "vn": {
            "1": (1, 15082),
            "2": (15082, 30323),
            "3": (30323, 60049),
            "4": (60049, 100933),
            "5": (100933,),
        },
    },
    "tropical_storm_total_cat": {
        "la": {
            "1": (1, 7),
            "2": (7, 14),
            "3": (14,),
        },
        "mm": {
            "1": (1, 4),
            "2": (4, 8),
            "3": (8,),
        },
        "vn": {
            "1": (1, 7),
            "2": (7, 14),
            "3": (14,),
        },
    },
    "social_risk_total_cat": {
        "la": {"1": (1, 3), "2": (3, 8), "3": (8, 12), "4": (12,)},
        "mm": {"1": (1, 114), "2": (114, 562), "3": (562, 1212), "4": (1212,)},
        "vn": {"1": (1, 5), "2": (5, 10), "3": (10, 15), "4": (15,)},
    },
}


@click.command(short_help="Calculate stats")
@click.option(
    "--input_boundary",
    help="Input boundaries geojson (ADM)",
    required=True,
    type=str,
)
@click.option(
    "--output_boundary",
    help="Output geojson boundaries",
    required=True,
    type=str,
)
def main(input_boundary, output_boundary):
    with open(input_boundary) as f:
        boundaries = json.load(f).get("features")
    country = output_boundary.split("/")[1].split("_")[-1].split(".")[0].split("-")[0]
    admin = output_boundary.split("/")[1].split("_")[-1].split(".")[0].split("-")[1]

    #  validate name
    with click.progressbar(boundaries, label=f"Process : {output_boundary}") as bar:
        for boundary in bar:
            properties_boundary = boundary.get("properties")

            ############################################################################
            # remove fields no use
            ############################################################################
            fields_no_use = [
                "cpi",
                "landslide",
                "producer_price_index",
                "producer_prices",
                "tropical_storm",
                "social_risk",
                "tropical_storn_total",
            ]
            for f in fields_no_use:
                if f in properties_boundary.keys():
                    del properties_boundary[f]
            ############################################################################
            # remove 00 valeus from raster
            ############################################################################
            fields_clear = [
                "landslide_risk",
                "landuse",
                "forest_loss",
                "rubber_2020",
                "market_acc",
            ]
            for f in fields_clear:
                if f in properties_boundary.keys():
                    new_raster_data = {}
                    raster_data = properties_boundary.get(f)
                    for rd in raster_data.keys():
                        if float(rd):
                            new_raster_data.update({f"{rd}": raster_data.get(rd)})
                    properties_boundary[f] = new_raster_data

            ############################################################################
            # Processing  Tropical storm tracks : remove duplicates
            ############################################################################
            # ADV_DATE

            tropical_storm_adv_date = properties_boundary.get("tropical_storm_ADV_DATE")
            tropical_storm_adv_speed = properties_boundary.get(
                "tropical_storm_ADV_DATE__SPEED"
            )
            if tropical_storm_adv_date and tropical_storm_adv_speed:
                dates_by_10y = {}
                dates_by_month = {}
                if tropical_storm_adv_date:
                    for date in tropical_storm_adv_date.keys():
                        value = int(tropical_storm_adv_date.get(date, 0))
                        #  by 10 years
                        dates_by_10y.update(
                            update_dict_sum(date[:3], value, dates_by_10y)
                        )
                        dates_by_month.update(
                            update_dict_sum(date[5:7], value, dates_by_month)
                        )
                    del properties_boundary["tropical_storm_ADV_DATE"]
                # ADV_DATE__SPEED
                dates_by_10y_speed = {}

                if tropical_storm_adv_speed:
                    # category
                    for date_speed in tropical_storm_adv_speed.keys():
                        value = int(tropical_storm_adv_speed.get(date_speed))
                        date, speed = f"{date_speed}".split("__")
                        if date[:3] in dates_by_10y_speed.keys():
                            dates_by_10y_speed[date[:3]].update(
                                update_dict_sum(
                                    speed, value, dates_by_10y_speed.get(date[:3])
                                )
                            )
                        else:
                            dates_by_10y_speed[date[:3]] = {speed: value}
                    # mean
                    for year in dates_by_10y_speed.keys():
                        year_data = dates_by_10y_speed.get(year)
                        total_speed = 0
                        total_count = 0
                        for speed in year_data:
                            total_speed += int(speed) * int(year_data.get(speed, 1))
                            total_count += int(year_data.get(speed, 0))
                        dates_by_10y_speed[year] = round((total_speed / total_count), 2)

                    del properties_boundary["tropical_storm_ADV_DATE__SPEED"]

                total_tropical_storn = sum(
                    [float(dates_by_10y[i]) for i in dates_by_10y.keys()]
                )
                properties_boundary.update(
                    {
                        "tropical_storm_total": total_tropical_storn,
                        "tropical_storm_stats_year": dates_by_10y,
                        "tropical_storm_stats_month": dates_by_month,
                        "tropical_storm_stats_year_speed": dates_by_10y_speed,
                    }
                )
            properties_boundary["tropical_storm_total_cat"] = {
                f"{categorize(categorize_setup['tropical_storm_total_cat'],country,properties_boundary.get('tropical_storm_total', 0))}": properties_boundary.get(
                    "tropical_storm_total", 0
                )
            }
            ############################################################################
            # Processing  market accessibility %
            ############################################################################
            market_acc = properties_boundary.get("market_acc")
            count_market_acc = sum(
                [float(market_acc[i]) for i in market_acc.keys() if float(i)]
            )
            new_market_acc = {}
            for market in market_acc.keys():
                if float(market):
                    new_market_acc[market] = round(
                        (market_acc[market] / count_market_acc) * 100, 2
                    )
            properties_boundary["market_acc_stat"] = new_market_acc
            ############################################################################
            # Processing  social risk
            ############################################################################
            social_risk = properties_boundary.get("social_risk_year")
            if social_risk:
                social_risktotal = sum(
                    [float(social_risk[i]) for i in social_risk.keys() if float(i)]
                )
                properties_boundary["social_risk_total"] = social_risktotal
            properties_boundary["social_risk_total_cat"] = {
                f"{categorize(categorize_setup['social_risk_total_cat'], country, properties_boundary.get('social_risk_total', 0))}": properties_boundary.get(
                    "social_risk_total", 0
                )
            }

            ############################################################################
            # Processing  labor hability :agepop_2010
            ############################################################################
            #  only county
            if "adm2" == admin:
                properties_boundary["agepop_2010_stat"] = properties_boundary.get(
                    "agepop_2010"
                )
                properties_boundary["agepop_2010_stat_cat"] = {
                    f"{categorize(categorize_setup['agepop_2010_stat_cat'],country,properties_boundary.get('agepop_2010', 0))}": properties_boundary.get(
                        "agepop_2010", 0
                    )
                }
            ############################################################################
            #  add bbox
            ############################################################################
            properties_boundary["bbox"] = shape(boundary.get("geometry")).bounds
            ############################################################################
            #  lower case properties
            ############################################################################

            new_properties = {}
            for key, value in boundary.get("properties", {}).items():
                if key == "shapeID":
                    new_properties[key] = value
                else:
                    new_properties[f"{key}".lower()] = value

            boundary["properties"] = new_properties
    with open(output_boundary, "w") as f:
        f.write(json.dumps(fc(boundaries), ensure_ascii=False).encode("utf8").decode())


if __name__ == "__main__":
    main()
