import { onRequest } from 'firebase-functions/https';

// export const worker = onRequest((req, res) => {
//     debugger
//     res.send("Hello from the worker")
// })

export const delayedFunction = onRequest(async (req, res) => {
    console.log("--- [WORKER] pre debugger")
    debugger
    console.log("--- [WORKER] post debugger")
    await new Promise(f => setTimeout(f, 5000));
    res.send("This is delayed");
});