# d2l-organizations

[Polymer](https://www.polymer-project.org)-based web components for D2L organizations.

## Installation

```shell
npm install BrightspaceHypermediaComponents/organizations
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

To debug tests locally, run the command below and then navigate to `http://localhost:9876/debug.html`:
```shell
npm run test:headless:watch
```

## Versioning & Releasing

All version changes should obey [semantic versioning](https://semver.org/) rules.

Releases use the [semantic-release](https://semantic-release.gitbook.io/) tooling and the [angular preset](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular) for commit message syntax. Upon release, the version in `package.json` is updated and a tag and GitHub release is created.

Commits prefixed with `feat` will trigger a minor release, while `fix` or `perf` will trigger a patch release. A commit containing `BREAKING CHANGE` will cause a major release to occur.

Other useful prefixes that will not trigger a release: `build`, `ci`, `docs`, `refactor`, `style` and `test`. More details in the [Angular Contribution Guidelines](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#type).
