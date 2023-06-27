import { SlashCommandBuilder } from "@discordjs/builders";

const github = new SlashCommandBuilder()
    .setName('github')
    .setDescription('Link to Github')
    

export default github.toJSON();    