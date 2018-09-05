module.exports.run = async (client, message, args) => {
    var request = require('superagent')
    if (!args[0]) {
        message.reply('Yes, let\'s just look up absolutely nothing.')
      } else {
        request.get('http://api.urbandictionary.com/v0/define')
          .query({term: args[0]})
          .end((err, res) => {
            if (!err && res.status === 200) {
              var uD = res.body
              if (uD.result_type !== 'no_results') {
                message.channel.sendMessage({embed :{
                  color: 0x6832e3,
                  author: {name: 'UrbanDictionary'},
                  title: `The internet's definition of ${uD.list[0].word}`,
                  url: uD.list[0].permalink,
                  timestamp: new Date(),
                  fields: [
                    {name: 'Word', value: `\`\`\`${uD.list[0].word}\`\`\``},
                    {name: 'Definition', value: `\`\`\`${uD.list[0].definition}\`\`\``},
                    {name: 'Example', value: `\`\`\`${uD.list[0].example}\`\`\``},
                    {name: 'Thumbs up', value: `\`\`\`${uD.list[0].thumbs_up}\`\`\``, inline: true},
                    {name: 'Thumbs down', value: `\`\`\`${uD.list[0].thumbs_down}\`\`\``, inline: true}

                  ]
                }})
              } else {
                message.reply(args[0] + ': This word is so screwed up, even Urban Dictionary doesn\'t have it in its database')
              }
            } else {
              Logger.error(`Got an error: ${err}, status code: ${res.status}`)
            }
        })
    }
  }
  module.exports.help = {
    name: "urban",
    help: "Returns a definition of the given word from urbandictionary",
    usage: ">urban [tag]",
  }
  