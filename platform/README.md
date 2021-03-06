# cccmc-sustainable-rubber-web

Front end repo for the [cccmc-sustainable-rubber](https://github.com/developmentseed/cccmc-sustainable-rubber) data visualization.


### Install modules dependencies

Requirements:

- [git](https://git-scm.com)
- [nvm](https://github.com/creationix/nvm)
- [yarn](https://yarnpkg.com/docs/install)

[Clone this repository locally](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository) and activate required Node.js version:

```
nvm install
```

Install Node.js dependencies:

```
yarn install
```
## Documentation

Read more documentation in the [docs directory](docs/).

## License
[MIT](LICENSE.md)

## Development

```
yarn develop
```

## Deployment

```
yarn deployment
```
# cccmc-sustainable-rubber-web

Front end repo for the [cccmc-sustainable-rubber](https://github.com/developmentseed/cccmc-sustainable-rubber) data visualization.


### Install modules dependencies

Requirements:

- [git](https://git-scm.com)
- [nvm](https://github.com/creationix/nvm)
- [yarn](https://yarnpkg.com/docs/install)

[Clone this repository locally](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository) and activate required Node.js version:

```
nvm install
nvm use 10.14.2
```

Install Node.js dependencies:

```
yarn install
```
## Documentation

Read more documentation in the [docs directory](docs/).

## License
[MIT](LICENSE.md)

## Development

```
export MAPBOX_ACCESS_TOKEN="pk.xxx"
yarn develop
```

## Dist folder creation

```
export MAPBOX_ACCESS_TOKEN="pk.xxx"
yarn build
```

## Deployment and publish in Surge: https://cccmc-sustainable-rubber.surge.sh/

```
export MAPBOX_ACCESS_TOKEN="pk.xxx"
yarn deployment
```