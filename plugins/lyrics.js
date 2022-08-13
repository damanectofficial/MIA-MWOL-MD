const {
    Module
} = require('../main');
const { requestLyricsFor, requestAuthorFor, requestTitleFor, requestIconFor } = require("solenolyrics");
const {MODE} = require('../config');
let fromMe = setting.MODE == 'public' ? false : true
Module({
    pattern: 'lyrics ?(.*)',
    fromMe: fromMe,
    desc: 'Lyrics search & find',
    use: 'download'
}, (async (message, match) => {
    if (!match[1]) return await message.sendReply("_Need query!_");
    var lyrics = await requestLyricsFor(`${match[1]}`); 
    var author = await requestAuthorFor(`${match[1]}`);
    var cover_image = await requestIconFor(`${match[1]}`);
    var title = await requestTitleFor(`${match[1]}`);
    var text = `_*Title:* ${title}_\n_*Author:* ${author}_\n\n${"```===== LYRICS =====```"}\n\n${lyrics}`
    var msg = {}
    if (cov) msg.image = {url:cover_image}; msg.caption = text;
    if (!cov) msg.text = text
    return await message.client.sendMessage(message.jid,msg,{quoted:message.data});
}));