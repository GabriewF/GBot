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

import {
  ActionRowBuilder,
  ApplicationCommandOptionType,
  Channel,
  CommandInteraction,
  EmbedBuilder,
  StringSelectMenuBuilder,
  TextChannel,
} from 'discord.js';
import { Client, Discord, Slash, SlashGroup, SlashOption } from 'discordx';

@Discord()
export abstract class SendMessage {
  @Slash({
    // Slash Option
    name: 'send-message',
    description: 'Send the Bot ticket message',

    // Name Localization
    nameLocalizations: {
      'pt-BR': 'enviar-mensagem',
    },

    // Description Localization
    descriptionLocalizations: {
      'pt-BR': 'Envia a mensagem de ticket do Bot',
    },
  })
  @SlashGroup('ticket')
  async Handle(
    @SlashOption({
      // Slash Option Info
      name: 'channel',
      description: 'The channel where I will send',
      type: ApplicationCommandOptionType.Channel,
      required: true,

      // Name Localization
      nameLocalizations: {
        'pt-BR': 'canal',
      },

      // Description Localization
      descriptionLocalizations: {
        'pt-BR': 'O canal aonde irei enviar',
      },
    })
    channel: Channel,

    command: CommandInteraction,
    client: Client,
  ) {
    if (!client.user) return;

    await command.deferReply({
      ephemeral: true,
    });

    if (!channel.isTextBased()) {
      await command.editReply('Use um canal de texto!');
      return;
    }

    const sendChannel = <TextChannel>channel;

    const embed = new EmbedBuilder()
      .setTitle('Atendimento do Paraguai')
      .setAuthor({
        name: 'Paraguai',
        iconURL: String(client.user.avatarURL({ forceStatic: true })),
      })
      .setDescription(
        'Tá precisando de ajuda? clica nesses botão que alguém tenta te ajudar',
      )
      .setColor('Random')
      .setTimestamp();

    const selectionBox = new StringSelectMenuBuilder()
      .setCustomId('ticketCategory')
      .addOptions([
        {
          label: 'Brasil',
          value: 'br',
        },
        {
          label: 'U.S.A',
          value: 'usa',
        },
      ]);

    const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
      selectionBox,
    );

    await sendChannel.send({
      embeds: [embed],
      components: [row],
    });

    await command.editReply('Mensagem enviada com sucesso!');
  }
}
