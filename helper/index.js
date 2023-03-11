const checkForValidity = (node, componentName, dependOn, propName) => {
    const cComp = node.name;
    const cCompAttr = node.attributes;
    
    if (cComp.name !== componentName) return true;
    
    if (cCompAttr.some(attr => attr.name && attr.name.name === 'ignoreESLintPropValidation')) return true;
    
    if (dependOn) {
        const dependable = cCompAttr.some(attr => attr.name && attr.name.name === dependOn);
        return !dependable || cCompAttr.some(attr => attr.name && attr.name.name === propName);
    } else {
        return cCompAttr.some(attr => attr.name && attr.name.name === propName);
    }
};

module.exports = { checkForValidity };
