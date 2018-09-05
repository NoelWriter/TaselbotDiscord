module.exports.run = async (client, message, args) => {
  if (!args[0]) {
    message.reply('I mean I can shake this 8ball all I want but without a question it\'s kinda dumb.')
    return
  }
  var answers = [
    'Signs point to yes.',
    'Yes.',
    'Reply hazy, try again.',
    'Without a doubt.',
    'My sources say no.',
    'As I see it, yes.',
    'You may rely on it.',
    'Concentrate and ask again.',
    'Outlook not so good.',
    'It is decidedly so.',
    'Better not tell you now.',
    'Very doubtful.',
    'Yes - definitely.',
    'It is certain.',
    'Cannot predict now.',
    'Most likely.',
    'Ask again later.',
    'My reply is no.',
    'Outlook good.',
    'Don\'t count on it.',
    'Who cares?',
    'Never, ever, ever.',
    'Possibly.',
    'There is a small chance.',
    'Stop this #SOG, but yes',
  ]
  var answer = answers[Math.floor(Math.random() * answers.length)]
  message.channel.send('The Magic 8 Ball says:\n```' + answer + '```')
}
module.exports.help = {
  name: "8ball",
  help: "Answers your question, by the power of the 8 ball.",
  usage: ">8ball [question]",
}
