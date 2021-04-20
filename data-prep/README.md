# Data preparation for the dashboard

### Build contianer

```sh
docker build . -t cccmc-data-prep

```

- Development mode

```
docker run -v ${PWD}:/mnt -it cccmc-data-prep bash
```

Data preparation involve many raster and vector data processing, The list below is the sequence of how we need to run the data workflow

## Vector processing

The script takes a vector layer from s3 and clips many of the for boundaries since, getting the stats.

```
./process_vector.sh
```

## Raster stats

Processing all the raster files, sometimes it needs to be customized, take a look at the code, also this process can take 1 hour on getting all data.

```
./raster_stats.sh
```


After running the two above scripts, make a commit to github in order to keep track of the changes and then run the above script to create the mbtiles.

## Mbtiles creation

The script 👇 is in charge to get all the admin layers and create a mbtiles and upload to `cccmc` mapbox account.

```sh
    export MAPBOX_ACCESS_TOKEN=<1password>
    ./mbtiles.sh
```
