/**
 * @fileoverview Ensure that given props exists in React Native Components
 * @author Samitha Nanayakkara
 */
'use strict';

const rule = require('../../../lib/rules/validator'),
    RuleTester = require('eslint').RuleTester;
const path = require('path');

const ruleTester = new RuleTester({
    parser: path.resolve(__dirname, '../../../node_modules/@babel/eslint-parser'),
    parserOptions: {
        ecmaVersion: 12,
        requireConfigFile: false,
        sourceType: 'module',
        babelOptions: {
            presets: ['@babel/preset-react']
        }
    }
});

const propConfigs = {
    props: [
        { propName: 'testID', components: ['Button', { component: 'Text', dependOn: 'onPress' }] },
        { propName: 'accessible', components: ['TextInput'] }
    ]
};

ruleTester.run('validator', rule, {
    valid: [
        {
            /**
             * When a Text component is being used with testID when onPress exists,
             */
            code: '<Text testID="text" onPress={()=>{}} />',
            options: [{ ...propConfigs }]
        },
        {
            /**
             * Text component can be used without testID when onPress does not exist.
             */
            code: '<Text />',
            options: [{ ...propConfigs }]
        },
        {
            /**
             * Text component can be used even with testID when onPress does not exist.
             */
            code: '<Text testID="text" />',
            options: [{ ...propConfigs }]
        },
        {
            /**
             * Button should be able to use with testID.
             */
            code: '<Button testID="button" />',
            options: [{ ...propConfigs }]
        },
        {
            /**
             * When a Text component is being used without testID and onPress exists,
             * the rule should work as expected if ignoreESLintPropValidation is true.
             */
            code: '<Text ignoreESLintPropValidation onPress={()=>{}}/>',
            options: [{ ...propConfigs }]
        },
        {
            /**
             * When a TextInput component is being used with accessible prop,
             */
            code: '<TextInput accessible />',
            options: [{ ...propConfigs }]
        },
        {
            /**
             * When a TextInput component is being used without accessible prop,
             * if ignoreESLintPropValidation is true.
             */
            code: '<TextInput ignoreESLintPropValidation/>',
            options: [{ ...propConfigs }]
        },
        {
            /**
             * When a Text component is being used with testID when onPress exists,.
             * but ignoreESLintPropValidation is also defined. So it should work without any issue.
             */
            code: '<Text ignoreESLintPropValidation testID="text" onPress={()=>{}} />',
            options: [{ ...propConfigs }]
        },
        {
            /**
             * When a TextInput component is being used without accessible prop,
             * but ignoreESLintPropValidation turned on, the rule should work as expected.
             * should be able to use without any issue even if they have additional props.
             */
            code: '<TextInput ignoreESLintPropValidation otherProps={false}/>',
            options: [{ ...propConfigs }]
        },
        {
            /**
             * Any other component which are not mentioned in the eslint validation rules,
             * should be able to use without any issue.
             */
            code: '<CustomComponent />',
            options: [{ ...propConfigs }]
        },
        {
            /**
             * Any other component which are not mentioned in the eslint validation rules,
             * should be able to use without any issue even if they have additional props.
             */
            code: '<CustomComponent otherProps={false} />',
            options: [{ ...propConfigs }]
        }
    ],
    invalid: [
        {
            /**
             * Text should not be able to use without testID when onPress presents.
             */
            code: '<Text onPress={()=>{}} />',
            options: [{ ...propConfigs }],
            errors: [
                {
                    messageId: 'missingProps'
                }
            ]
        },
        {
            /**
             * Button should not be able to use without testID.
             */
            code: '<Button />',
            options: [{ ...propConfigs }],
            errors: [
                {
                    messageId: 'missingProps'
                }
            ]
        },
        {
            /**
             * TextInput should not be able to use without accessible Prop.
             */
            code: '<TextInput />',
            options: [{ ...propConfigs }],
            errors: [
                {
                    messageId: 'missingProps'
                }
            ]
        },
        {
            /**
             * TextInput should not be able to use without accessible Prop.
             * Even if it has unnecessary props which does not fall under the
             * validation criteria.
             */
            code: '<TextInput testID="text"/>',
            options: [{ ...propConfigs }],
            errors: [
                {
                    messageId: 'missingProps'
                }
            ]
        }
    ]
});
