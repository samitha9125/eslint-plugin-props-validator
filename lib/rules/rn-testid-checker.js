/**
 * @fileoverview Ensure that testID prop exists in React Native Components
 * @author Samitha Nanayakkara
 */
"use strict";

const { checkForExistence } = require("../../helper");

/** @type {import('eslint').Rule.RuleModule} */

function JSXOpeningElementInspector(context, node, componentsToCheck) {
  const component = node.name;
  if (
    component.type === "JSXIdentifier" &&
    componentsToCheck.includes(component.name) &&
    component.name !== "Text"
  ) {
    const hasTestIDProp = checkForExistence(node.attributes, "testID");
    const hasIgnoreTestIDProp = checkForExistence(
      node.attributes,
      "ignoreTestID"
    );

    if (!hasTestIDProp && !hasIgnoreTestIDProp) {
      context.report({
        node,
        messageId: "missingTestID",
        data: {
          componentName: `${component.name}`,
        },
      });
    }
  }
}

function JSXElementInspector(context, node) {
  const component = node.openingElement.name;
  const attributes = node.openingElement.attributes;
  if (component.type === "JSXIdentifier" && component.name === "Text") {
    const hasOnPressProp = checkForExistence(attributes, "onPress");
    if (hasOnPressProp) {
      const hasTestIDProp = checkForExistence(attributes, "testID");
      const hasIgnoreTestIDProp = checkForExistence(attributes, "ignoreTestID");
      if (!hasTestIDProp && !hasIgnoreTestIDProp) {
        context.report({
          node,
          messageId: "missingTestIDOnPress",
        });
      }
    }
  }
}

module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "Ensure testID prop exists on specified components",
      category: "Best Practices",
      recommended: true,
    },
    schema: [
      {
        type: "object",
        properties: {
          additionalComponents: {
            type: "array",
            items: { type: "string" },
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      missingTestID:
        "Expected component `{{componentName}}` to have a `testID` prop.",
      missingTestIDOnPress:
        "Expected component `Text` with onPress prop to have a `testID` prop.",
    },
  },

  create(context) {
    const configuration = context.options[0] || {};
    const additionalComponents = configuration.additionalComponents || [];
    const componentsToCheck = [
      "Text",
      "TextInput",
      "TouchableOpacity",
      "TouchableHighlight",
      "TouchableWithoutFeedback",
      "Pressable",
      ...additionalComponents,
    ];
    return {
      JSXOpeningElement(node) {
        JSXOpeningElementInspector(context, node, componentsToCheck);
      },
      JSXElement(node) {
        JSXElementInspector(context, node);
      },
    };
  },
};
