# CCCMC SUSTAINABLE RUBBER PLATFORM

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

- MapBox access token https://docs.mapbox.com/help/how-mapbox-works/access-tokens

```
export MAPBOX_ACCESS_TOKEN=
```
- Formspree url and form id https://help.formspree.io/hc/en-us/articles/360013470814-Submit-forms-with-JavaScript-AJAX-

```
export FORMSPREE_FORM_ID=""
```



```
yarn develop
```

## Deployment

```
yarn deployment
```
