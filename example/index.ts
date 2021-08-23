import { Server } from "bingus/server";

const app = new Server({
    securityFeatures: true
});

app.get("/", (req, res) => {
    res.header("X-Bingus", "Yes");

    return "Hello world! 👋"
})

app.get("/json", (req, res) => {
    return {
        ok: true,
        data: "bingus bongus"
    }
})

app.get("/404", (req, res) => {
    res.status(404);

    return {
        ok: false,
        error: 404
    }
})

app.start();

