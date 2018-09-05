module.exports.run = async (client, message, args) => {
  const randomCat = require('random.cat.js');
  const randomCatApi = randomCat.api();
  try {
      var request = require("request");
  } catch (e) {
      console.log("Can't request request, sorry. reason:" + e)
  }
  randomCatApi.getCat().then((cat) => message.channel.send(cat.file))
}
module.exports.help = {
  name: "meow",
  help: "Returns a random cat",
  usage: ">meow"
}
