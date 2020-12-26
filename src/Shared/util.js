export const moveInArray = (array, startIndex, endIndex) => {
    while (endIndex < 0) {
        endIndex += array.length;
    }
    while (startIndex < 0) {
        startIndex += array.length;
    }
    if (startIndex >= array.length) {
        let tmp = startIndex - array.length + 1;
        while (tmp--) {
            array.push(undefined);
        }
    }
    array.splice(startIndex, 0, array.splice(endIndex, 1)[0]);
    return [...array];
}
