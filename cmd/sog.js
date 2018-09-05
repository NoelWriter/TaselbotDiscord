module.exports.run = async (client, message, args) => {
  message.channel.send(`Studie Ontwijkend Gedrag Inbound`, {
    files: [
      "./assets/SOG_2.gif"
    ]
  })
}
module.exports.help = {
  name: "sog",
  help: "Studie Ontwijkend Gedrag Gif",
  usage: ">sog"
}
