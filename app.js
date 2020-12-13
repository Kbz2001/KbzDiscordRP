const express = require('express');
const discordRPC = require('discord-rpc');
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

/*

**Ignore these comments they are for the developer**

Use "npm start" in project directory BEFORE loading Chrome extension. (This opens the localhost server) >>> ONLY FOR TESTING.
To load extension, upload "extension" file in directory to Chrome Extensions page using "Load Unpacked".

Use npm list -g --depth=0 to see ALL currently installed npm packages.

Use pm2 to launch 24/7 localhost server (In project directory: Cmd Prompt -> "pm2 start app.js") >>> ONLY FOR DEPLOYING.

 */