module.exports.run = async (client, message, args) => {
  const superagent = require('superagent');
  superagent.get('http://api.adviceslip.com/advice')
  .end((err, res) => {
    if (!err && res.status === 200) {
      try {
        JSON.parse(res.text)
      } catch (e) {
        message.channel.sendMessage('The API returned an unconventional response.')
        return
      }
      var advice = JSON.parse(res.text)
      message.channel.sendMessage(advice.slip.advice)
    } else {
      Logger.error(`Got an error: ${err}, status code: ${res.status}`)
    }
  })
}
module.exports.help = {
  name: "advice",
  help: "Returns advice",
  usage: ">advice",
}
