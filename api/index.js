import { onRequest } from 'firebase-functions/https';

// export const api = onRequest(async (req, res) => {
//     debugger
//     const workerApi = await fetch(`http://127.0.0.1:5001/${process.env.GCLOUD_PROJECT}/us-central1/worker/test`)
//     const workerResponse = await workerApi.text()
//     res.send(`Hello from the API. Worker says "${workerResponse}"`)
// })

export const immediateFunction = onRequest(async (req, res) => {
    console.log("--- [API] pre debugger")
    debugger
    console.log("--- [API] post debugger")
    res.send("Hello world");
});