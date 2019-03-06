export const getFieldStateKey = (packagePath: string, additionalPaths: string[]) => {
    if (additionalPaths && additionalPaths.length > 0) {
        return `${packagePath}-${additionalPaths.join('-')}`;
    } else {
        return packagePath;
    }
}