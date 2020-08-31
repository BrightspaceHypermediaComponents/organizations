[![Build Status](https://travis-ci.com/BrightspaceHypermediaComponents/organizations.svg?branch=master)](https://travis-ci.com/BrightspaceHypermediaComponents/organizations)

# d2l-organizations

[Polymer](https://www.polymer-project.org)-based web components for D2L organizations.

## Installation

```shell
bower install d2l-organizations
```

## Usage

## Developing, Testing and Contributing

After cloning the repo, run `npm install` to install dependencies.

### Running the demos

Start an [es-dev-server](https://open-wc.org/developing/es-dev-server.html) that hosts the demo pages:

```shell
npm start
```

### Linting

To lint ([eslint](http://eslint.org/) and [Polymer lint](https://www.polymer-project.org/2.0/docs/tools/polymer-cli-commands#lint)):

```shell
npm run lint
```

To run unit tests locally:

```shell
npm run test:headless
```

To lint AND run local unit tests:

```shell
npm run test
```

## Versioning, Releasing & Deploying

By default, when a pull request is merged the patch version in the `package.json` will be incremented, a tag will be created, and a Github release will be created.

Include `[increment major]`, `[increment minor]` or `[skip version]` in your merge commit message to change the default versioning behavior.
