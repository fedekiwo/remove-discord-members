const Discord = require('discord.js');
const client = new Discord.Client();

const TOKEN = "EL TOKEN";
const ROLES_TO_IGNORE = ["docentes"];
const CHANNELS_TO_IGNORE = ["consultas", "docentes", "offtopic", "lobby"]
client.login(TOKEN);

client.once("ready", () => {
  const ddsGuild = client.guilds.cache.get("695310789556568104");
  const $channelDeletion = [];
  ddsGuild.channels.cache
  .filter(channel => !CHANNELS_TO_IGNORE.some(it => channel.name.toLowerCase().includes(it)))
  .each(channel => 
    $channelDeletion.push(
      channel.delete()
      .catch(e => console.log("falle con el", channel.name, e))
    )
  );
  
  Promise.all($channelDeletion)
  .then(it => console.log("SE BORRARON LOS CANALES"))
  .catch(e => console.log("HUBO UN ERROR AL BORRAR LOS CANALES", e))
  .finally(() => process.exit(0));
});
