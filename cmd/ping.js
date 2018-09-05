module.exports.run = async (client, message, args) => {
  const m = await message.channel.send("Ping?");
  m.edit(`*PONG*, Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
}
module.exports.help = {
  name: "ping",
  help: "pings the bot and returns latency",
  usage: ">ping"
}
