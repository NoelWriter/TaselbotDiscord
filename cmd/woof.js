module.exports.run = async (client, message, args) => {
  try {
      var request = require("request");
  } catch (e) {
      console.log("Can't request request, sorry. reason:" + e)
  }
  request("http://random.dog/woof", function (error, response, body) {
    if (!error && response.statusCode == 200) {
      if (typeof (body) != "undefined") {
        message.channel.send("http://random.dog/" + body);
      } else {
        message.channel.send("Things are going wrong all over.");
      }
    } else {
      message.channel.send(error);
    }
  });
}
module.exports.help = {
  name: "woof",
  help: "Returns a random dog",
  usage: ">woof"
}
