# cccmc-sustainable-rubber
## Model Inference

-expects a lightgbm model saved with `model.booster_.save_model(filename)`
- put model at `inference/models/model`
- `cd inference; docker build . -t cccmc-serving`
- publish this image somewhere, use with chip-n-scale

## Data Preparation

- Build docker image

```
docker build .devcontainer -t cccmc/lambda-gdal
```

[data-preparation doc](data-pred/)

## [Dashboard development](dashboard/)
