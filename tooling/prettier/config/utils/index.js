// @ts-check
/**
 * @param {string[][]} groups
 */
exports.generateImportOrder = groups => {
    const result = [];
    const groupBreak = '';

    for (const group of groups) {
        result.push(...group, groupBreak);
    }

    return result;
};
