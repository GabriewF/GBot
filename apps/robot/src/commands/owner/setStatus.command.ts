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
  ApplicationCommandOptionType,
  codeBlock,
  CommandInteraction,
  EmbedBuilder,
  PresenceStatusData,
} from 'discord.js';
import {
  Client,
  Discord,
  Slash,
  SlashChoice,
  SlashGroup,
  SlashOption,
} from 'discordx';

@Discord()
export abstract class SetStatus {
  @Slash({
    // Slash Option
    name: 'set-status',
    description: "Set's bot stats's",

    // Name Localization
    nameLocalizations: {
      'pt-BR': 'setar-status',
    },

    // Description Localization
    descriptionLocalizations: {
      'pt-BR': 'Seta a status do bot',
    },
  })
  @SlashGroup('bot')
  async Handle(
    @SlashChoice(
      {
        // Slash Choice Info
        name: 'Online',
        value: 'online',

        // Name Localization
        nameLocalizations: {
          'pt-BR': 'Disponível',
        },
      },
      {
        // Slash Choice Info
        name: 'Idle',
        value: 'idle',

        // Name Localization
        nameLocalizations: {
          'pt-BR': 'Ausente',
        },
      },
      {
        // Slash Choice Info
        name: 'Do Not Disturb',
        value: 'dnd',

        // Name Localization
        nameLocalizations: {
          'pt-BR': 'Não Perturbe',
        },
      },
      {
        // Slash Choice Info
        name: 'Invisible',
        value: 'invisible',

        // Name Localization
        nameLocalizations: {
          'pt-BR': 'Invisível',
        },
      },
    )
    @SlashOption({
      // Slash Option Info
      name: 'stats',
      description: 'The type of status',
      type: ApplicationCommandOptionType.String,
      required: true,

      // Name Localization
      nameLocalizations: {
        'pt-BR': 'status',
      },

      // Description Localization
      descriptionLocalizations: {
        'pt-BR': 'O tipo de status',
      },
    })
    status: PresenceStatusData,

    command: CommandInteraction,
    client: Client,
  ) {
    if (!client.user) return;

    await command.deferReply({ ephemeral: true });

    client.user.setStatus(status);

    const embed = new EmbedBuilder()
      .setDescription(`Status alterado para ${codeBlock(status)}`)
      .setColor('Random')
      .setFooter({
        text: `Comando enviado por ${command.user.tag}`,
        iconURL: String(command.user.avatarURL()),
      })
      .setTimestamp();

    await command.editReply({
      content: `<@${command.user.id}>`,
      embeds: [embed],
    });

    return;
  }
}
