import click
import pandas as pd


@click.command(short_help="Remove values from csv")
@click.option(
    "--input_csv",
    help="Input csv file",
    required=True,
    type=str,
)
def main(input_csv):
    df = pd.read_csv(input_csv)
    colums = [i for i in df.columns if "Unnamed" not in i]
    df_filter = df.filter(colums)
    df_filter.to_csv(input_csv, index=False)


if __name__ == "__main__":
    main()
