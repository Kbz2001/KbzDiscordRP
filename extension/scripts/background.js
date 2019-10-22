chrome.runtime.onInstalled.addListener(function () {
    console.log("Installed Successfully!");
});

var savedURLs = [];

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {

    const smallImg = 'airkbzsmall';
    const smallTxt = 'Developed by Kbz!';

    if (changeInfo.status === 'complete' && tab.status === 'complete' && tab.url !== undefined) {

        var hostFound;
        var urlFound;

        savedURLs[tabId] = new URL(tab.url);

        let theURL = new URL(tab.url);

        switch (theURL.hostname) {
            case 'www.youtube.com':
                updatePresence(tab, 'Watching', 'youtubebig', 'Youtube', smallImg, smallTxt);
                hostFound = true;
                break;
            case 'mail.google.com':
                updatePresence(tab, 'Mailing', 'gmailbig', 'Gmail', smallImg, smallTxt);
                hostFound = true;
                break;
            case 'drive.google.com':
                updatePresence(tab, 'Storing Files', 'drivebig', 'Google Drive', smallImg, smallTxt);
                hostFound = true;
                break;
            case 'github.com':
                updatePresence(tab, 'Coding', 'githubbig', 'GitHub', smallImg, smallTxt);
                hostFound = true;
                break;

            default:
                hostFound = false;
                break;

        }

        if (theURL.toString().indexOf('https://docs.google.com/document/') !== -1) {

            updatePresence(tab, 'Writing', 'docsbig', 'Google Docs', smallImg, smallTxt);
            urlFound = true;

        } else if (theURL.toString().indexOf('https://docs.google.com/presentation/') !== -1) {

            updatePresence(tab, 'Presenting', 'slidesbig', 'Google Slides', smallImg, smallTxt);
            urlFound = true;

        } else if (theURL.toString().indexOf('https://docs.google.com/spreadsheets/') !== -1) {

            updatePresence(tab, 'Calculating', 'sheetsbig', 'Google Sheets', smallImg, smallTxt);
            urlFound = true;

        } else if (!hostFound && !urlFound) {

            setDefaultPresence(tab);

        }
    }
});

chrome.tabs.onRemoved.addListener(function (tabId) {

    var hostFound;
    var urlFound;

    var url = savedURLs[tabId];

    switch (url.hostname) {
        case 'www.youtube.com':
            hostFound = true;
            updatePresence(null);
            break;
        case 'mail.google.com':
            hostFound = true;
            updatePresence(null);
            break;
        case 'drive.google.com':
            hostFound = true;
            updatePresence(null);
            break;
        case 'github.com':
            hostFound = true;
            updatePresence(null);
            break;

        default:
            hostFound = false;
    }

    if (url.toString().indexOf('https://docs.google.com/document/') !== -1) {

        updatePresence(null);
        urlFound = true;

    } else if (url.toString().indexOf('https://docs.google.com/presentation/') !== -1) {

        updatePresence(null);
        urlFound = true;

    } else if (url.toString().indexOf('https://docs.google.com/spreadsheets/') !== -1) {

        updatePresence(null);
        urlFound = true;

    } else if (!hostFound && !urlFound) {
        updatePresence(null);

    }
});

function updatePresence(tab, dets, largeImgKey, largeImgTxt, smallImgKey, smallImgTxt) {
    if (tab) {
        var url = new URL(tab.url);
        var data = {
            action: "set",
            url: url,
            details: dets,
            smallText: url,
            largeText: tab.title,
            largeImageKey: largeImgKey,
            largeImageText: largeImgTxt,
            smallImageKey: smallImgKey,
            smallImageText: smallImgTxt,
            instance: true
        };
    } else {
        var data = {
            action: "clear"
        };
    }

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:3000/",
        "method": "POST",
        "headers": {
            "content-type": "application/json"
        },
        "processData": false,
        "data": JSON.stringify(data)
    }

    $.ajax(settings);

}

function setDefaultPresence(tab) {
    if (tab) {
        var url = new URL(tab.url);
        var data = {
            action: "set",
            url: url,
            details: 'Browsing',
            smallText: url,
            largeText: tab.title,
            largeImageKey: 'chromebig',
            largeImageText: 'Browsing',
            smallImageKey: 'airkbzsmall',
            smallImageText: 'Developed by Kbz!',
            instance: true
        };
    } else {
        var data = {
            action: "clear"
        };
    }

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:3000/",
        "method": "POST",
        "headers": {
            "content-type": "application/json"
        },
        "processData": false,
        "data": JSON.stringify(data)
    }

    $.ajax(settings);

}