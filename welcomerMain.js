const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
    ]
});

// Customizable settings
const ROLE_NAME = "Member"; // Change this to your desired role name
const LOG_CHANNEL_NAME = "★║bot-logs"; // Change to your preferred logging channel

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('guildMemberAdd', async (member) => {
    try {
        const role = member.guild.roles.cache.find(r => r.name === ROLE_NAME);
        if (!role) {
            console.log(`Role '${ROLE_NAME}' not found in ${member.guild.name}.`);
            return;
        }

        await member.roles.add(role);
        console.log(`Assigned '${ROLE_NAME}' role to ${member.user.tag}.`);

        const logChannel = member.guild.channels.cache.find(c => c.name === LOG_CHANNEL_NAME && c.isTextBased());
        if (logChannel) {
            logChannel.send(`★║ **${member.user.tag}** has been given the **${ROLE_NAME}** role.`);
        }
    } catch (error) {
        console.error(`Failed to assign role: ${error}`);
    }
});

client.login(process.env.TOKEN);
