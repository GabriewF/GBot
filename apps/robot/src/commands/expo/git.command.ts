/*
 * This file is part of GBot, licensed under the MIT License.
 *
 *  Copyright 2022 (c) GabriewF
 *  Copyright 2022 (c) contributors
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in all
 *  copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  SOFTWARE.
 */

import { pino } from '@gabriewf/logging';
import {
  ActionRowBuilder,
  CommandInteraction,
  Guild,
  ModalBuilder,
  ModalSubmitInteraction,
  TextChannel,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js';
import { Client, Discord, ModalComponent, Slash, SlashGroup } from 'discordx';

@Discord()
export abstract class Git {
  @Slash({
    name: 'git',
    description: 'An simple Git!',
    dmPermission: false,

    descriptionLocalizations: {
      'pt-BR': 'Um simples Git!',
    },
  })
  @SlashGroup('expo')
  async Handle(
    // @SlashOption({
    //   name: 'lang',
    //   description: 'What\'s is your programming language?',

    //   descriptionLocalizations: {
    //     'pt-BR': 'Qual a sua linguagem de programação?'
    //   },

    //   required: true,

    //   autocomplete: (interaction: AutocompleteInteraction) => {
    //     interaction.respond([
    //       {
    //         name: 'Python',
    //         value: 'python'
    //       },
    //       {
    //         name: 'JavaScript',
    //         value: 'javascript'
    //       }
    //     ])
    //   },

    //   type: ApplicationCommandOptionType.String
    // })
    // lang: string,

    command: CommandInteraction,
  ) {
    const modal = new ModalBuilder()
      .setTitle('Git do Paraguai!')
      .setCustomId('gitInput');

    const lang = new TextInputBuilder()
      .setCustomId('langField')
      .setLabel('Linguagem')
      .setStyle(TextInputStyle.Short)
      .setPlaceholder('python')
      .setRequired(true);

    const code = new TextInputBuilder()
      .setCustomId('codeField')
      .setPlaceholder('Seu código aqui!')
      .setMaxLength(1500)
      .setMinLength(10)
      .setLabel('Seu código!')
      .setStyle(TextInputStyle.Paragraph)
      .setRequired(true);

    const langSelect = new ActionRowBuilder<TextInputBuilder>().addComponents(
      lang,
    );

    const codeSelect = new ActionRowBuilder<TextInputBuilder>().addComponents(
      code,
    );

    modal.addComponents(langSelect, codeSelect);

    await command.showModal(modal);
  }

  @ModalComponent({ id: 'gitInput' })
  async HandleGit(interaction: ModalSubmitInteraction, client: Client) {
    const lang = interaction.fields.getTextInputValue('langField');
    const code = interaction.fields.getTextInputValue('codeField');

    const gitGuild = <Guild>(
      client.guilds.cache.get(String(process.env['DISCORD_GUILD_ID']))
    );
    const gitChannel = <TextChannel>(
      gitGuild.channels.cache.get(String(process.env['GIT_CHANNEL']))
    );

    // const embed = new EmbedBuilder()
    //   .setColor('Random')
    //   .setDescription(`\`\`\`${lang}${code}\`\`\``)

    await gitChannel.send({
      content: `\`\`\`${lang}${code}\`\`\``,
    });

    pino.debug(lang);
    pino.debug(code);

    await interaction.reply('Certin');
  }
}
