module.exports.run = async (client, message, args) => {
    message.channel.send(`.`, {
      files: [
        "./assets/Zemmer.jpg"
      ]
    })
  }
  module.exports.help = {
    name: "ruben",
    help: "ZEMMER",
    usage: ">ruben"
  }
  