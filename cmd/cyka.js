module.exports.run = async (client, message, args) => {
  const rusarray = ["сука", "блять", "иди", "нахуи", "ебать", "дебил", "хуй", "это пиздец", "мудак", "отвали", "ты чё"];
      var generatedsentance = "ты";
      for (let index = 0; index < 5; index++) {
        var randomnumber = Math.floor(Math.random() * (rusarray.length - 1));
        generatedsentance = generatedsentance + ` ${rusarray[randomnumber]}`;
      }
      message.channel.send(generatedsentance)
}
module.exports.help = {
  name: "cyka",
  help: "Returns a random sentence of random russian swear words",
  usage: ">cyka",
}
