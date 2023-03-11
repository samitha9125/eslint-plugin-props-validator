const checkForExistence = (object, name) => {
  return object.some(
    (attribute) =>
      attribute.type === "JSXAttribute" &&
      attribute.name.type === "JSXIdentifier" &&
      attribute.name.name === name
  );
};

module.exports = { checkForExistence };
