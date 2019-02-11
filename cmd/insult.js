module.exports.run = async (client, message, args) => {
  const superagent = require('superagent');
  superagent.get('http://quandyfactory.com/insult/json/')
  .end((err, res) => {
    if (!err && res.status === 200) {
      var fancyinsult = res.body
      if (args[0] === '') {
        message.channel.send(fancyinsult.insult)
      } else {
        message.channel.send(args[0] + ', ' + fancyinsult.insult)
      }
    } else {
      Logger.error(`Got an error: ${err}, status code: ${res.status}`)
    }
  })
}
module.exports.help = {
  name: "insult",
  help: "insults a given user",
  usage: ">insult [@user]",
}
