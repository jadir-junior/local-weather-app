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

2. Configure Lint

install the packages in development

`npm install --save-dev tslint tslint-config-prettier tslint-plugin-prettier tslint-etc codelyzer npm-run-all`

create a file tslint.json

```
{
  "extends": [
    "tslint:recommended",
    "tslint-config-prettier",
    "tslint-plugin-prettier",
    "tslint-etc"
  ],
  "rules": {
    "prettier": true,
    "no-unused-declaration": true,
    "array-type": false,
    "arrow-parens": false,
    "deprecation": {
      "severity": "warning"
    },
    "component-class-suffix": true,
    "contextual-lifecycle": true,
    "directive-class-suffix": true,
    "directive-selector": [true, "attribute", "app", "camelCase"],
    "component-selector": [true, "element", "app", "kebab-case"],
    "import-blacklist": [true, "rxjs/Rx"],
    "interface-name": false,
    "max-classes-per-file": false,
    "max-line-length": [false, 90],
    "member-access": false,
    "member-ordering": [
      true,
      {
        "order": ["static-field", "instance-field", "static-method", "instance-method"]
      }
    ],
    "no-consecutive-blank-lines": false,
    "no-console": [true, "debug", "info", "time", "timeEnd", "trace"],
    "no-empty": false,
    "no-inferrable-types": [true, "ignore-params"],
    "no-non-null-assertion": true,
    "no-switch-case-fall-through": true,
    "no-var-requires": false,
    "object-literal-key-quotes": [true, "as-needed"],
    "object-literal-sort-keys": false,
    "ordered-imports": false,
    "quotemark": [true, "single", "avoid-escape"],
    "trailing-comma": false,
    "semicolon": [true, "never"],
    "no-conflicting-lifecycle": true,
    "no-host-metadata-property": true,
    "no-input-rename": true,
    "no-inputs-metadata-property": true,
    "no-output-native": true,
    "no-output-on-prefix": true,
    "no-output-rename": true,
    "no-outputs-metadata-property": true,
    "template-banana-in-box": true,
    "template-no-negated-async": true,
    "use-lifecycle-interface": true,
    "use-pipe-transform-interface": true
  },
  "rulesDirectory": ["codelyzer"]
}
```

and write the scripts on packeage json

```
// package.json
{
  ...
  scripts: {
    "lint:ts": "tslint --config tslint.json --project . -e '**/{test,polyfills}.ts'",
    "lint:ts:fix": "tslint --config tslint.json --fix --project . -e '**/{test,polyfills}.ts'",
    "lint:tsc": "tsc --noEmit --skipLibCheck",
    "lint": "run-p lint:ts lint:tsc",
    "lint:fix": "run-s lint:ts:fix lint:tsc"
  }
}
```
