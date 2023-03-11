const checkForValidity = (node, componentName, dependOn, propName) => {
    // Return whether the validity is a success or not.
    const cComp = node.name;
    const cCompAttr = node.attributes;
    if (cComp.name === componentName) {
        if (cCompAttr.some(attr => attr.name && attr.name.name === 'ignoreESLintPropValidation')) {
            return true;
        }
        if (dependOn) {
            const dependable = cCompAttr.some(attr => attr.name && attr.name.name === dependOn);
            if (dependable && cCompAttr.every(attr => attr.name && attr.name.name !== propName)) {
                return false;
            }
            return true;
        } else {
            if (cCompAttr.some(attr => attr.name && attr.name.name === propName)) {
                return true;
            }
            return false;
        }
    }
    return true;
};

module.exports = { checkForValidity };
