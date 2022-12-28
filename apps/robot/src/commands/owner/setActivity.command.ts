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
  ActivityType,
  ApplicationCommandOptionType,
  codeBlock,
  CommandInteraction,
  EmbedBuilder,
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
export abstract class SetActivity {
  @Slash({
    // Slash Info
    name: 'set-activity',
    description: "Set's bot activity's",

    // Name Localization
    nameLocalizations: {
      'pt-BR': 'setar-atividade',
    },

    // Description Localization
    descriptionLocalizations: {
      'pt-BR': 'Seta a atividade do bot',
    },
  })
  @SlashGroup('bot')
  async Handle(
    // Activity Option
    @SlashChoice(
      {
        // Slash Choice Info
        name: 'Playing',
        value: ActivityType.Playing,

        // Name Localization
        nameLocalizations: {
          'pt-BR': 'Jogando',
        },
      },
      {
        // Slash Choice Info
        name: 'Listening',
        value: ActivityType.Listening,

        // Name Localization
        nameLocalizations: {
          'pt-BR': 'Ouvindo',
        },
      },
      {
        // Slash Choice Info
        name: 'Watching',
        value: ActivityType.Watching,

        // Name Localization
        nameLocalizations: {
          'pt-BR': 'Assistindo',
        },
      },
      {
        // Slash Choice Info
        name: 'Streaming',
        value: ActivityType.Streaming,

        // Name Localization
        nameLocalizations: {
          'pt-BR': 'Transmitindo',
        },
      },
      {
        // Slash Choice Info
        name: 'Competing',
        value: ActivityType.Competing,

        // Name Localization
        nameLocalizations: {
          'pt-BR': 'Competindo',
        },
      },
    )
    @SlashOption({
      // Slash Option Info
      name: 'activity',
      description: 'The type of activity',
      type: ApplicationCommandOptionType.Number,
      required: true,

      // Limiter
      maxValue: 5,
      minValue: 0,

      // Name Localization
      nameLocalizations: {
        'pt-BR': 'atividade',
      },

      // Description Localization
      descriptionLocalizations: {
        'pt-BR': 'O tipo da atividade',
      },
    })
    activity: Exclude<ActivityType, ActivityType.Custom>,

    // Name Option
    @SlashOption({
      // Slash Option Info
      name: 'name',
      description: 'The text of stats',
      type: ApplicationCommandOptionType.String,
      required: true,

      // Name Localization
      nameLocalizations: {
        'pt-BR': 'nome',
      },

      // Description Localization
      descriptionLocalizations: {
        'pt-BR': 'O texto do status',
      },
    })
    name: string,

    // Optional URL Option
    @SlashOption({
      // Slash Option Info
      name: 'address',
      description: 'The url of the Streaming activity',
      type: ApplicationCommandOptionType.String,
      required: false,

      // Name Localization
      nameLocalizations: {
        'pt-BR': 'endereço',
      },

      // Description Localization
      descriptionLocalizations: {
        'pt-BR': 'A url da atividade de transmissão',
      },
    })
    address: string,

    command: CommandInteraction,
    client: Client,
  ) {
    if (!client.user) return;

    await command.deferReply({ ephemeral: true });

    client.user.setActivity({
      name: name,
      type: activity,
      url: address,
    });

    const embed = new EmbedBuilder()
      .setDescription(`Atividade alterada para ${codeBlock(name)}`)
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
