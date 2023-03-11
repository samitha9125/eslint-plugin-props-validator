/**
 * @fileoverview Ensure that testID prop exists in React Native Components
 * @author Samitha Nanayakkara
 */
"use strict";

const rule = require("../../../lib/rules/rn-testid-checker"),
  RuleTester = require("eslint").RuleTester;
const path = require("path");

const ruleTester = new RuleTester({
  parser: path.resolve(__dirname, "../../../node_modules/@babel/eslint-parser"),
  parserOptions: {
    ecmaVersion: 12,
    requireConfigFile: false,
    sourceType: "module",
    babelOptions: {
      presets: ["@babel/preset-react"],
    },
  },
});

ruleTester.run("test-id", rule, {
  valid: [
    {
      /**
       * When there are other components in the additionalComponents array,
       * the rule should work for default components as well.
       */
      code: '<Text testID="text" onPress={()=>{}} />',
      options: [{ additionalComponents: ["Button"] }],
    },
    {
      /**
       * When there are other components in the additionalComponents array,
       * the rule should work for default components as well.
       */
      code: '<TextInput testID="input" />',
      options: [{ additionalComponents: ["Button"] }],
    },
    {
      /**
       * When there are no other components in the additionalComponents array,
       * general components should work without any issue regardless the prop.
       */
      code: '<Button testID="button" />',
      options: [{ additionalComponents: [] }],
    },
    {
      /**
       * When a Text component is being used without testID and onPress exists, 
       * the rule should work as expected if ignoreTestID is true.
       */
      code: "<Text ignoreTestID onPress={()=>{}}/>",
    },
    {
      /**
       * When any component that has validation turned on (default components) are being used, 
       * the rule should work as expected if ignoreTestID is true.
       */
      code: "<Pressable ignoreTestID/>",
    },
    {
      /**
       * When a component (passed via additionalComponents) is being used, 
       * the rule should work as expected if ignoreTestID is true.
       */
      code: "<Button ignoreTestID otherProps={false} />",
      options: [{ additionalComponents: ["Button"] }],
    },
  ],
  invalid: [
    {
      code: "<Text onPress={()=>{}}/>",
      errors: [
        {
          messageId: "missingTestIDOnPress",
        },
      ],
    },
    {
      code: "<TextInput/>",
      errors: [
        {
          messageId: "missingTestID",
          data: {
            componentName: "TextInput",
          },
        },
      ],
    },
    {
      code: "<CustomButton/>",
      options: [{ additionalComponents: ["CustomButton"] }],
      errors: [
        {
          messageId: "missingTestID",
          data: {
            componentName: "CustomButton",
          },
        },
      ],
    },
  ],
});
