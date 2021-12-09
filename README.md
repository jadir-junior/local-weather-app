# LocalWeatherApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Extensions (Plugins) for Angular Development

- Angular Language Service
- Angular Snippets (John Papa)
- TSLint (Microsoft)
- ESLint (Microsoft)
- Nx Console (nrwl)

## Configuration Envorinment

1. Style and Style Fix

extesions VSCODE **prettier** and **beautify**

`npm install --save-dev prettier js-beautify`

```
// .prettierrc
{
  "tabWidth": 2,
  "useTabs": false,
  "printWidth": 90,
  "semi": false,
  "singleQuote": true,
  "trailingComma": "es5",
}
```

```
//.jsbeautifyrc
{
  "indent_size": 2,
  "wrap_line_length": 90,
  "language": {
    "html": [
      "html"
    ]
  },
  "end_with_newline": true
}
```

```
// package.json
{
    scripts: {
        ...
        "style": "prettier --check '**/{src,tests,e2e}/**/*.{*.css,ts}'",
        "style:fix": "prettier --write '**/{src,tests,e2e}/**/*.{*css,ts}' && js-beautify '**/src/**/*.html'",
    }
}
```

2. Configure Test Unit

configure code coverage and debug

```
// package.json
{
    scripts: {
        ...
        "test:debug": "npm test -- --source-map",
        "test:coverage": "npm test -- --code-coverage",
    }
}
```

4. Configure Import Sort

Install the extension on **VScode** -> **sort-imports**

Install the pacakge **import-sort** on dev deps

`npm i -D import-sort import-sort-cli`

add on prettier (style) script import-sort configuration

```
// package.json
{
  ...
  scripts: {
    "style": "import-sort -l '**/{src,tests,e2e}/**/*.ts' && prettier --check '**/{src,tests,e2e}/**/*.{*.css,ts}'",
    "style:fix": "import-sort --write '**/{src,tests,e2e}/**/*.ts' && prettier --write '**/{src,tests,e2e}/**/*.{*css,ts}' && js-beautify '**/src/**/*.html'",
  }
}
```

5. Configute ESLint

```
ng add @angular-eslint/schematics
```

configure eslint-prettier `npm i -D eslint-plugin-prettier eslint-config-prettier`

6. Configure Cypress

```
ng add @cypress/schematic
```

To run cypress we have to start the local Angular application on `http://localhost:4200` as well and in parellel start the cypress runner to reach the site under where it is living

We can do this by installing a small `http-server` and run it in parellel to either the dist build (`cypress:run`) or the dev build (`cypress:open`). To run commands in parallel we can install the package concurrently. Now we can modify the commands as below:

`npm install --save-dev http-server concurrently`

`package.json`

```
"cypress:open": "concurrently 'npm start' 'cypress open'",
"cypress:run": "npm run build && concurrently 'npm run serve:dist' 'cypress run'",
"serve:dist": "http-server ./dist/{name project} -a localhost -p 4200 -c-1"
```

# CI with Github Actions

### Creating GitHub Actions

Create the folders and file on root aplication

folder: `.github/workflows` and file: `{{name}}.yml` example: `ci.yml`

### Name of workflow

`name: Angular Github CI`

### Trigger on Pull Request

Let's trigger the job whenever `pull request` branch got new push

```
on: [pull_request]
```

### Node Version (on variables)

```
jobs:
  build:
    runs-on: ubuntu-latest

  strategy:
    matrix:
      node-version: [14.x]
```

### Checkout source code

Let's checkout the code first.

```
steps:
  - name: Checkout Repository
    uses: actions/checkout@v2
```

### Setup Node Environment

```
  - name: Setup Node
    uses: actions/setup-node@v1
    with:
      node-version: ${{ matrix.node-version }}
```

### Use Github cache

```
  - name: Cache Node modules
    uses: actions/cache@v2
    env:
      cache-name: cache-node-modules
    with:
      path: node_modules
      key: ${{ runner.os }}-build-${{ env.cache-name }}-${{ hashFiles('**/package-lock.json') }}
      restore-keys: |
        ${{ runner.os }}-build-${{ env.cache-name }}-
        ${{ runner.os }}-build-
        ${{ runner.os }}
```

### Install Dependencies

Next we must install node packages conditionally.
obs: `npm ci` is better on ci envoriment otherwise `npm install`

```
  - name: Install dependencies
    if: steps.cache-nodemodules.outputs.cache-hit != 'true'
    run: npm ci
```

### Unit testing (Jasmine + Karma)

Let1s run test in production mode, we need to make sure while running Test:

- we are using **chrome headless broweser**
- Generating **code coverage**
- Ignoring **source map**
- make sure not in **watch mode**

```
// package.json
scripts: {
  "test:ci": "ng test --browsers ChromeHeadless --code-coverage --watch=false"
}
```

```
  - name: Unit Testing (Jasmine + Karma)
    run: npm run test:ci
```
