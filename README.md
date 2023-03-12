# ESlint Plugin to Check whether Props exist

[![Maintainability](https://api.codeclimate.com/v1/badges/b3c97859f2e06cd3a6b0/maintainability)](https://codeclimate.com/github/samitha9125/eslint-plugin-props-validator/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/b3c97859f2e06cd3a6b0/test_coverage)](https://codeclimate.com/github/samitha9125/eslint-plugin-props-validator/test_coverage) [![codecov](https://codecov.io/gh/samitha9125/eslint-plugin-props-validator/branch/main/graph/badge.svg?token=PAB35G2RNG)](https://codecov.io/gh/samitha9125/eslint-plugin-props-validator) ![Master Flow](https://github.com/samitha9125/eslint-plugin-props-validator/actions/workflows/main.yml/badge.svg)
## Introduction

This ESLint plugin is designed to verify that certain components (**in React/React Native**) have specific props defined. This can be useful to ensure that components have whatever props you want them to have.

If the rules are configured correctly, the plugin will generate an error if a component is missing any of the required props.

The plugin also includes a `dependOn` feature that allows you to specify that prop validation for a particular component should only be performed if another prop is present. For example, you could use this feature to validate that a `testID` prop exists only if an `onPress` prop is also present on a component.

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-props-checker`:

```sh
npm install eslint-plugin-props-checker --save-dev
```

## Usage

Add `props-checker` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": ["props-checker"]
}
```

Then configure the rules you want to use under the rules section. Once you enable this, it will errors for all the components that we have mentioned.

A sample can be found below.

```yaml
{
    'rules':
        {
            'props-checker/validator':
                [
                    'error',
                    {
                        props:
                            [
                                { propName: 'testID', components: ['Button', { component: 'Text', dependOn: 'onPress' }] },
                                { propName: 'accessible', components: ['TextInput'] }
                            ]
                    }
                ]
        }
}
```

According to the above configuration, the plugin will throw an error,

-   if the `Button` component does not have a `testID` prop.
-   if the `Text` component does not have a `testID` prop only if it has an `onPress` prop defined.
-   if the `TextInput` component does not have an `accessible` prop.

## Rule Configurations

You can use the following configurations to customize the plugin. But,

-   `props`, `propName` and `components` are mandatory.
-   `components` can be a `string` or an `object` with `component` and `dependOn` properties.

1. `Props`: Array of validation objects
2. `PropName`: Name of the prop to be validated
3. `Components`: Array of components to be validated against the `propName`

## Features

#### 1. `dependOn` feature
If you need to check whether a prop exists only if another prop exists, you can use the `dependOn` feature. This feature allows you to specify that prop validation for a particular component should only be performed if another prop is present.

#### 2. `ignoreESLintPropValidation` prop feature
If you need to ignore the ESLint prop validation of a component in a specific scenario, you can use the `ignoreESLintPropValidation` prop. [Examples](##Examples) are included below.



## Examples

1. A warning will be generated instead of an error

```yaml
{ 'rules': { 'props-checker/validator': ['warn', { props: [{ propName: 'customProp', components: ['CustomComponent'] }] }] } }
```

2. Multiple components with multiple dependOn to validate against `testID` prop.

```yaml
{
    'rules':
        {
            'props-checker/validator':
                [
                    'error',
                    {
                        props:
                            [
                                { propName: 'testID', components: [{ component: 'Button', dependOn: 'title' }, { component: 'Text', dependOn: 'onPress' }] }
                            ]
                    }
                ]
        }
}
```
3. Using `ignoreESLintPropValidation` prop

In this example, as you can see, `AnyComponent` must have a `anyProp` property. But, we can ignore the ESLint prop validation by using the ignoreESLintPropValidation prop.

```yaml
{ 'rules': { 'props-checker/validator': ['error', { props: [{ propName: 'anyProp', components: [ 'AnyComponent'] }] }] } }
```

If you want to ignore the ESLint prop validation of the `AnyComponent` in a particular situation/screen, you can use the `ignoreESLintPropValidation` prop.
```tsx
<AnyComponent ignoreESLintPropValidation>
```

## ESLint Extends
If this plugin configurations take too much space from your main `eslintrc` file, you can use the extends feature from eslint to keep these rule settings in another file in another directory. [Example](https://gist.github.com/randallreedjr/40282968b6f39dc3f423dd3cf1106455) can be found here.

## Contribution

All PRs are welcome. Please raise an issue before raising a PR.