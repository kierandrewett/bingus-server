export const canStringifyAsJson = (obj: object) => {
    try {
        JSON.stringify(obj);
        return true;
    } catch(e) {
        return false;
    }
}