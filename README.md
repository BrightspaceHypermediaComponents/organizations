[![Build Status](https://travis-ci.com/BrightspaceHypermediaComponents/organizations.svg?branch=master)](https://travis-ci.com/BrightspaceHypermediaComponents/organizations)

# d2l-organizations

[Polymer](https://www.polymer-project.org)-based web component for D2L organizations.


## Installation

```shell
bower install d2l-organizations
```

## Usage

## Developing, Testing and Contributing

After cloning the repo, run `npm install` to install dependencies.

If you don't have it already, install the [Polymer CLI](https://www.polymer-project.org/2.0/docs/tools/polymer-cli) globally:

```shell
npm install -g polymer-cli
```

To start a [local web server](https://www.polymer-project.org/2.0/docs/tools/polymer-cli-commands#serve) that hosts the demo page and tests:

### local url
http://127.0.0.1:8081/components/d2l-organizations/demo/

```shell
polymer analyze > analysis.json && polymer serve
```

To lint ([eslint](http://eslint.org/) and [Polymer lint](https://www.polymer-project.org/2.0/docs/tools/polymer-cli-commands#lint)):

```shell
npm run lint
```

To run unit tests locally using [Polymer test](https://www.polymer-project.org/2.0/docs/tools/polymer-cli-commands#tests):

```shell
polymer test --skip-plugin sauce
```

To lint AND run local unit tests:

```shell
npm test
```

## Versioning, Releasing & Deploying

By default, when a pull request is merged the patch version in the `package.json` will be incremented, a tag will be created, and a Github release will be created.

Include `[increment major]`, `[increment minor]` or `[skip version]` in your merge commit message to change the default versioning behavior.
