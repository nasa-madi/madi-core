import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express';
import crypto from 'crypto';
import { Debug } from './utils/logger.js'
import path from 'path';
import { fileURLToPath } from 'url';
import { redisClient } from './utils/redis.js'
import { router } from './router/router.js'
import * as proxyCache from './proxycache/proxycache.js'
import { parseBoolean } from './utils/boolean.js';
import stripAnsi from 'strip-ansi';
import Convert from 'ansi-to-html';
import merge from 'deepmerge/index.js'
import { establishMemory } from './memory/memory.js';

/**
 * @typedef {import("./types.js").Metadata} Metadata 
 * @typedef {import("./types.js").ServerResponse} ServerResponse
 */


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const debug = Debug(import.meta.url)
const app = express();
const PORT = process.env.PORT || 3030
app.use(express.json());
await redisClient.connect()

/**
 * Initialization of client side state
 */
let memId = crypto.randomBytes(5).toString('hex');
let clientMemory = [];
let routerKey = null;
let context = {};
let message = "Hello! I'm Madi. How can I help you?";
let metadata = {
    clientMemory,
    routerKey,
    context,
    memId
}
let i = 0
let maxIterations = 10
let enablePreBuild = parseBoolean(process.env.ENABLE_PRE_BUILD)
let enableAutoRespond = parseBoolean(process.env.ENABLE_AUTO_RESPOND)
let inputs = [
    "I'm James. How are you today?",
    "What can you do?",
    "I want to select an investigation",
    "Health & Wellness",
    "Which categories need more research?",
    "What categories are biased too positively or too negatively?",
    "What do you know about emergency medical drones?",
    "Web",
    "I want to add an article to my data.",
    "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8605877/",
    "Can you generate a scenario based on that article?"
]

if(parseBoolean(process.env.USE_PROXY)){
    process.env.PROXY_PATH  = `http://localhost:${process.env.PROXY_PORT}/v1`
    proxyCache.initializeProxy()
}else{
    process.env.PROXY_PATH  = 'https://api.openai.com/v1'
}


/**
 * Sends the relevant information from the client to the backend to the initial flow function
 * @param {string} message -
 * @param {Metadata} metadata - the metadata passed between client and server
 * @return {Promise} response -
 */
export const sendToBackend = async (message, { clientMemory, memId, routerKey, context }) => {
    debug({ memId, routerKey, context, clientMemory })
    if (!clientMemory) throw new Error(JSON.stringify(clientMemory))
    return router(message, { clientMemory, memId, routerKey, context })
}


app.use('/images', express.static('images'))



app.all('/*', async (req, res) => {
    console.log(req.body)
    if (enablePreBuild) {
        message = inputs[i] || req.body.message;
    }else{
        if(req.body.messages){
            metadata.clientMemory = establishMemory(req.body.messages)
            // metadata.clientMemory = [...req.body.messages]
            message = req.body.messages.pop().content
        }
    }

    let [aiMessage, newMetadata] = await sendToBackend(message, metadata)
    aiMessage = stripAnsi(aiMessage)
    // aiMessage = convert.toHtml(aiMessage); // 
    // TODO: fix this so that html can be sent from the backend.
    // console.log('returning ', aiMessage)
    metadata = merge(metadata, newMetadata, {arrayMerge:(d,s)=>s})

    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('content-type', 'text/event-stream')
    res.setHeader('transfer-encoding', 'chunked');


    // res.write(`data: ` + JSON.stringify({metadata})+ "\n\n");

    async function sendMessages(message, res) {
        const messageArr = message.split(" ");
        for (let i = 0; i < messageArr.length; i++) {
            await new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * 200) + 0));
            const msg = ((i > 0) ? " " : "") + messageArr[i];
            // console.log(JSON.stringify(msg))
            res.write(`data: ` + JSON.stringify({
                "choices": [{
                    "delta": {
                        "content": msg
                    },
                    "index": 0
                }]
            }) + "\n\n");
        }
        res.write("data: [DONE]\n\n");
        res.end();
    }
    sendMessages(aiMessage, res);
    i++;
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));
