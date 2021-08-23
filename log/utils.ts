export const getTimeDiff = () => {
    const d = new Date();

    const currentTime = d.getTime();

    const elapsedTime = currentTime - parseInt(process.env.__BINGUS_APP_STARTED as any);

    var secs = Math.floor((elapsedTime / 1000) % 60);
    var mins = Math.floor(
        (elapsedTime / (60 * 1000)) % 60
    );
    var hours = Math.floor(
        (elapsedTime / (60 * 60 * 1000)) % 24
    );

    const format = (r: number) => {
        return r.toString().length == 1 ? "0" + r : r;
    };

    return `${format(hours)}:${format(mins)}:${format(
        secs
    )}`;
}