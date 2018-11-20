module.exports.run = async (client, message, args) => {
    const superagent = require('superagent');
    if (!message.channel.nsfw) {
      message.reply("Bel die kech, Belgie. (nsfw is off)");
    } else {
      var randSInt = Math.floor(Math.random() * (900 - 100) + 100);
      console.log("CHOOSING QUERY : " + randSInt);
      superagent.post('https://scrolller.com/api/media')
      .send([[969,8,randSInt,50]])
      .end((err, result) => {
        if (err || result.status !== 200) {
          Logger.error(`${err}, status code ${result.status}`)
          message.channel.sendMessage('The API returned an unconventional response.' + err)
        }
        console.log(result.body[0][3][0][3][0][1][0][0][1]);
        var imgUrl = result.body[0][3][0][3][0][1][0][0][1];
        if (result.text.length < 75) {
          message.channel.sendMessage('sorry, nothing found.')
        } else {
          message.channel.sendMessage("https://scrolller.com/media/" + imgUrl);
        }
      })
    }
  }
  module.exports.help = {
    name: "kech",
    help: "Mahyar's supercommand",
    usage: ">kech",
  }

  
  