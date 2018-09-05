module.exports.run = async (client, message, args) => {
  const superagent = require('superagent');
  if (!message.channel.nsfw) {
    message.reply("Why are you searching for monosodium glutamate? (nsfw is off)");
  } else {
    superagent.post(`https://e621.net/post/index.json`)
    .query({limit: '30', tags: args[0]})
    .set({'Accept': 'application/json', 'User-Agent': 'Superagent Node.js'})
    .end(function (err, result) {
      if (!err && result.status === 200) {
        if (result.body.length < 1) {
          message.reply('Sorry, nothing found.')
        } else {
          var count = Math.floor((Math.random() * result.body.length))
          var FurryArray = []
          if (args[0]) {
            FurryArray.push(`${message.author.mention}, you've searched for ` + '`' + args[0] + '`')
          } else {
            FurryArray.push(`${message.author.mention}, you've searched for ` + '`random`')
          }
          FurryArray.push(result.body[count].file_url)
          message.channel.sendMessage(FurryArray.join('\n'))
        }
      } else {
        Logger.error(`Got an error: ${err}, status code: ${result.status}`)
      }
    })
  }
}
module.exports.help = {
  name: "e621",
  help: "(requires nsfw) returns result from e621.net",
  devnotes: "<3 Tasel is bae",
  usage: ">e621 [search tag]",
}
