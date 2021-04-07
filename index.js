const Discord = require('discord.js');
const client = new Discord.Client({ fetchAllMembers: true });

const TOKEN = "";
const USER_ROLES_TO_DELETE = ["grupo", "alumnos"];
const CHANNELS_TO_IGNORE = ["consultas", "docentes", "offtopic", "lobby"]
client.login(TOKEN);

function _deleteChannels(ddsGuild) {
  return ddsGuild.channels.cache
  .filter(channel => !CHANNELS_TO_IGNORE.some(it => channel.name.toLowerCase().includes(it)))
  .map(channel => 
      channel.delete()
      .catch(e => console.log("falle con el", channel.name, e))
  )
}

function _deleteMembers(ddsGuild) {
  return ddsGuild.members.cache.filter(member =>
    member.roles.cache.map(role => role.name.toLowerCase())
    .some(role => USER_ROLES_TO_DELETE.some(it => role.includes(it)))
  ).map(member => 
      member.kick()
      .catch(e => console.log("falle con el", member.user.username, e))
  );
}

client.once("ready", () => {
  client.guilds.fetch("695310789556568104")
  .then(ddsGuild => {

    return Promise.all(_deleteChannels(ddsGuild))
    .then(() => console.log("SE BORRARON LOS CANALES"))
    .catch(e => console.log("HUBO UN ERROR AL BORRAR LOS CANALES", e))
    .then(() => Promise.all(_deleteMembers(ddsGuild)))
    .then(() => console.log("SE BORRARON LOS USERS"))
    .catch(e => console.log("HUBO UN ERROR AL BORRAR LOS USERS", e))
  })
  .finally(() => process.exit(0));
});
