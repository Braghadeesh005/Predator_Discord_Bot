import { SlashCommandBuilder } from "@discordjs/builders";

const about = new SlashCommandBuilder()
    .setName('about')
    .setDescription('About the bot')
    
export default about.toJSON();    