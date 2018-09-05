module.exports.run = async (client, message, args) => {
  const ticker = require('cryptocurrency-ticker');
  if (args.length > 1) {
    ticker.ticker(args[0], args[1]).then((ticker) => {
      message.channel.send({
        embed: {
        color: 3447003,
        title: "Crypto exchange bot",
        fields: [{
          name: "Exchange",
          value: ticker.exchange,
        },
        {
          name: "Pair",
          value: ticker.pair,
        },
        {
          name: "Exchange Rate",
          value: ticker.ask.toString(),
        }
      ],
      timestamp: new Date(),
      footer: {
        icon_url: client.user.avatarURL,
        text: "© Taselbot 2018"
      }
      }
      });
    }).catch((err) => {
      message.reply(err);
    });
  } else if (args.length > 0 && args.length < 2) {
    ticker.availablePairs(args[0]).then((pairs) => {
      message.channel.send({
        embed: {
      color: 3447003,
      title: "Crypto exchange bot",
      fields: [{
        name: "Pairs",
        value: pairs.toString()
      }],
      timestamp: new Date(),
      footer: {
      icon_url: client.user.avatarURL,
      text: "© Taselbot 2018"
      }
      }
    });
    }).catch((err) => {
  message.reply(err);
  });
  } else {
  ticker.availableExchanges().then((exchanges) => {
    message.channel.send({
      embed: {
      color: 3447003,
      title: "Crypto exchange bot",
      fields: [{
        name: "Exchanges",
        value: exchanges.toString()
      }
    ],
    timestamp: new Date(),
    footer: {
      icon_url: client.user.avatarURL,
      text: "© Taselbot 2018"
    }
  }
});
});
}
}
module.exports.help = {
  name: "crypto",
  usage: ">crypto [provider] [trade pair] | >crypto [provider] | >crypto",
  help: "Entering >crypto without provider will return a list of providers, entering >crypto with only a provider will return a list of pairs on that providers, entering >crypto with provider and pair return the exchange rate.",
}
