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

3. Configute ESLint

```
ng add @angular-eslint/schematics
```
