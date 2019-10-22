const express = require('express');
const discordRPC = require('discord-rpc')
const clientID = '584594920745074688';
const rpc = new discordRPC.Client({ transport: 'ipc' });

rpc.login({ clientId: clientID }).catch(console.error);

rpc.once('ready', () => {
    const app = express();
    app.use(express.json());
    app.post("/", (request, response) => {
        let body = request.body;
        if (body.action == "set") {
            let presence = {
                details: body.details.substring(0, 128),
                largeImageKey: body.largeImageKey.substring(0, 128),
                largeImageText: body.largeImageText.substring(0, 128),
                smallImageKey: body.smallImageKey.substring(0, 128),
                smallImageText: body.smallImageText.substring(0, 128),
                startTimestamp: new Date(),
                instance: true
            };
            rpc.setActivity(presence);
        } else if (body.action == "clear") {
            rpc.clearActivity();
        }
        response.sendStatus(200);
    });

    app.listen(3000, () => console.log('Discord-Chrome-Presence is ready!'));

});