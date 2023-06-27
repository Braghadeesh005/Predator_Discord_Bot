import { SlashCommandBuilder } from "@discordjs/builders";

const linkedin = new SlashCommandBuilder()
    .setName('linkedin')
    .setDescription('Link to LinkedIn')
    

export default linkedin.toJSON();    