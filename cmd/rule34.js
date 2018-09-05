module.exports.run = async (client, message, args) => {
  const superagent = require('superagent');
  if (!message.channel.nsfw) {
    message.reply("What rule are you talking about, littering? (nsfw is off)");
  } else {
    superagent.post('http://rule34.xxx/index.php') // Fetching 100 rule34 pics
    .query({page: 'dapi', s: 'post', q: 'index', tags: args[0]})
    .end((err, result) => {
      if (err || result.status !== 200) {
        Logger.error(`${err}, status code ${result.status}`)
        message.channel.sendMessage('The API returned an unconventional response.')
      }
      var xml2js = require('xml2js')
      if (result.text.length < 75) {
        message.reply('sorry, nothing found.') // Correct me if it's wrong.
      } else {
        xml2js.parseString(result.text, (err, reply) => {
          if (err) {
            message.channel.sendMessage('The API returned an unconventional response.')
          } else {
            var count = Math.floor((Math.random() * reply.posts.post.length))
            var FurryArray = []
            if (!args[0]) {
              FurryArray.push(message.author.mention + ', you\'ve searched for `random`')
            } else {
              FurryArray.push(message.author.mention + ', you\'ve searched for `' + args[0] + '`')
            }
            FurryArray.push(`${reply.posts.post[count].$.file_url}`)
            message.channel.sendMessage(FurryArray.join('\n'))
          }
        })
      }
    })
  }
}
module.exports.help = {
  name: "rule34",
  help: "(requires nsfw) returns result from rule34.com",
  usage: ">rule34 [search tag]",
}
