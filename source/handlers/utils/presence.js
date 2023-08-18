const { ActivityType, Activity, ActivityFlags } = require("discord.js");

module.exports.setClientPresence = async (client, presence) => {
  /**
   * THE CLIENT PRESENCES
   * @define - name -  The name of the presence
   * @define - type - The type of presence (playing, watching, streaming or listening)
   * @define - url - The url for the presence (if streaming) if not set leave blank with ""
   */
  let presences = [
    {
        name: "Help: <<help",
        type: "PLAYING",
        url: "https://twitch.tv/monstercat",
      },
      {
        name: "with the Support Panel",
        type: "PLAYING",
        url: "https://twitch.tv/monstercat",
      },
  ];

  /**
   * SET THE CLIENT STATUS
   * @type idle
   * @type online
   * @type dnd
   * @type invisible
   */
  client.user.setStatus("online");

  setInterval(function () {
    let presence = presences[Math.floor(Math.random() * presences.length)];

    client.user.setActivity(presence.name, {
      type: presence.type,
      url: presence.url ? presence.url : "",
    });
  }, 10000);
};