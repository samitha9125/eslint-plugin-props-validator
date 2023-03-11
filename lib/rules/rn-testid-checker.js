/**
 * @fileoverview Ensure that testID prop exists in React Native Components
 * @author Samitha Nanayakkara
 */
"use strict";

/** @type {import('eslint').Rule.RuleModule} */
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
        if (
          node.name.type === "JSXIdentifier" &&
          componentsToCheck.includes(node.name.name) && 
          node.name.name !== "Text"
        ) {
          const hasTestIDProp = node.attributes.some(
            (attribute) =>
              attribute.type === "JSXAttribute" &&
              attribute.name.type === "JSXIdentifier" &&
              attribute.name.name === "testID"
          );

          const hasIgnoreTestIDProp = node.attributes.some(
            (attribute) =>
              attribute.type === "JSXAttribute" &&
              attribute.name.type === "JSXIdentifier" &&
              attribute.name.name === "ignoreTestID"
          );

          if (!hasTestIDProp && !hasIgnoreTestIDProp) {
            context.report({
              node,
              messageId: "missingTestID",
              data: {
                componentName: `${node.name.name}`,
              },
            });
          }
        }
      },

      JSXElement(node) {
        if (
          node.openingElement.name.type === "JSXIdentifier" &&
          node.openingElement.name.name === "Text"
        ) {
          const hasOnPressProp = node.openingElement.attributes.some(
            (attribute) =>
              attribute.type === "JSXAttribute" &&
              attribute.name.type === "JSXIdentifier" &&
              attribute.name.name === "onPress"
          );
          if (hasOnPressProp) {
            const hasTestIDProp = node.openingElement.attributes.some(
              (attribute) =>
                attribute.type === "JSXAttribute" &&
                attribute.name.type === "JSXIdentifier" &&
                attribute.name.name === "testID"
            );

            const hasIgnoreTestIDProp = node.openingElement.attributes.some(
              (attribute) =>
                attribute.type === "JSXAttribute" &&
                attribute.name.type === "JSXIdentifier" &&
                attribute.name.name === "ignoreTestID"
            );

            if (!hasTestIDProp && !hasIgnoreTestIDProp) {
              context.report({
                node,
                messageId: "missingTestIDOnPress",
              });
            }
          }
        }
      },
    };
  },
};
