# ESlint Plugin to Check whether Props exists

## Introduction

This ESLint plugin is designed to verify that certain components have specific props defined. This can be useful for ensuring that components have required props such as testID and accessible.

If the rules are configured correctly, the plugin will generate an error if a component is missing any of the required props.

The plugin also includes a `dependOn` feature that allows you to specify that prop validation for a particular component should only be performed if another prop is present. For example, you could use this feature to validate that a `testID` prop exists only if an `onPres`s prop is also present on a component.

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-rn-props-checker`:

```sh
npm install eslint-plugin-rn-props-checker --save-dev
```

## Usage

Add `rn-props-checker` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": ["rn-props-checker"]
}
```

Then configure the rules you want to use under the rules section. Once you enable this, it will errors for all the components that we have mentioned.

Sample can be found below.

```yaml
{
    'rules':
        {
            'rn-props-checker/validator':
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

-   if the `Button` component do not have a `testID` prop
-   if the `Text` component does not have a `testID` prop only if it has an `onPress` prop defined.
-   if the `TextInput` component does not have an `accessible` prop.

## Rule Configurations

You can use the following configurations to customize the plugin. But,

-   `props`, `propName` and `components` are mandatory.
-   `components` can be a `string` or an `object` with `component` and `dependOn` properties.

Props: Array of validation objects
PropName: Name of the prop to be validated
Components: Array of components to be validated against the `propName`


## Samples

1. A warning will be generated instead of an error

```yaml
{ 'rules': { 'rn-props-checker/validator': ['warn', { props: [{ propName: 'customProp', components: ['CustomComponent'] }] }] } }
```

2. Multiple components with multiple dependOn to validate against `testID` prop.

```yaml
{
    'rules':
        {
            'rn-props-checker/validator':
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

## Contribution

All PRs are welcome. Please raise an issue before raising a PR.