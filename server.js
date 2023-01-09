import express from 'express';
import { appname } from './config/environment.js';
import { port } from './config/environment.js';
import { dbURI } from './config/environment.js';
import { connectToDb } from './db/helpers.js';
import router from './config/router.js';

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
    });
app.use(express.json());
app.use(`/api/${appname.toLowerCase()}`, router);
// app.use('/api', router);


async function startServer() {
    try {
        console.log(`\nStarting ${appname}\n`);
        await connectToDb();
        console.log('Success - mongoose is connected');
        app.listen(port, () => {
            console.log(` - Listening on port ${port}\n - via ${dbURI}`);
        })
    } catch (err) {
        console.log('Error - failed connecting to db\n\n', err)
    }
}

function print(path, layer) {
    if (layer.route) {
        layer.route.stack.forEach(print.bind(null, path.concat(split(layer.route.path))))
    } else if (layer.name === 'router' && layer.handle.stack) {
        layer.handle.stack.forEach(print.bind(null, path.concat(split(layer.regexp))))
    } else if (layer.method) {
        console.log('%s /%s',
            layer.method.toUpperCase(),
            path.concat(split(layer.regexp)).filter(Boolean).join('/'))
    }
}

function split(thing) {
    if (typeof thing === 'string') {
        return thing.split('/')
    } else if (thing.fast_slash) {
        return ''
    } else {
        var match = thing.toString()
            .replace('\\/?', '')
            .replace('(?=\\/|$)', '$')
            .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//)
        return match
            ? match[1].replace(/\\(.)/g, '$1').split('/')
            : '<complex:' + thing.toString() + '>'
    }
}

app._router.stack.forEach(print.bind(null, []))

startServer();
