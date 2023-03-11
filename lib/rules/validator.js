/**
 * @fileoverview Ensure that given props exists in React Native Components
 * @author Samitha Nanayakkara
 */
'use strict';

const { checkForValidity } = require('../../helper');
const validatorSchema = require('../../schemas/validator');

/** @type {import('eslint').Rule.RuleModule} */

/**
 * { 
 *  "props": [
 *      { "propName":"testID", "components":["Button", {"component": "Text", "dependOn":"onPress"}] }, 
 *      { "propName":"accessible", "components":["TextInput"] }
 *    ]
 *  }]
 */

function JSXOpeningElementInspector(context, node, propConfigs) {
    propConfigs.forEach(propConfiguration => {
        let componentName;
        let dependOn;
        const propName = propConfiguration.propName;
        const components = propConfiguration.components;
        components.forEach(component => {
            if (typeof component === 'string') {
                componentName = component;
            } else {
                componentName = component.component;
                dependOn = component.dependOn;
            }

            if (!checkForValidity(node, componentName, dependOn, propName)) {
                context.report({
                    node,
                    messageId: 'missingProps',
                    data: {
                        componentName: `${node.name.name}`,
                        propName: `${propName}`
                    }
                });
            }
        });
    });
}

module.exports = {
    meta: {
        type: 'problem',
        docs: {
            description: 'Ensure that given props exist on specified components',
            category: 'Best Practices',
            recommended: true
        },
        schema: validatorSchema,
        messages: {
            missingProps: 'Expected component `{{componentName}}` to have a {{propName}} property.'
        }
    },

    create(context) {
        const propConfigs = context.options[0].props;
        return {
            JSXOpeningElement(node) {
                JSXOpeningElementInspector(context, node, propConfigs);
            }
        };
    }
};
