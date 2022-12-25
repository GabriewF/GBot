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
  Attachment,
  CommandInteraction,
  EmbedBuilder,
} from 'discord.js';
import { Client, Discord, Slash, SlashGroup, SlashOption } from 'discordx';

@Discord()
export abstract class SetAvatar {
  @Slash({
    // Slash Info
    name: 'set-avatar',
    description: "Set's bot avatar",

    // Name Localization
    nameLocalizations: {
      'pt-BR': 'setar-avatar',
    },

    // Description Localization
    descriptionLocalizations: {
      'pt-BR': 'Seta o avatar do bot',
    },
  })
  @SlashGroup('bot')
  async Handle(
    @SlashOption({
      // Slash Option Info
      name: 'avatar',
      description: 'The avatar to upload!',
      type: ApplicationCommandOptionType.Attachment,
      required: true,

      // Description Localization
      descriptionLocalizations: {
        'pt-BR': 'O avatar para fazer o Upload!',
      },
    })
    avatar: Attachment,

    command: CommandInteraction,
    client: Client,
  ) {
    if (!client.user) return;

    await command.deferReply({
      ephemeral: true,
    });

    client.user.setAvatar(avatar.url);

    const embed = new EmbedBuilder()
      .setTitle('Status Alterado com sucesso!')
      .setDescription('Status alterado para: ')
      .setColor('Random')
      .setThumbnail(avatar.url)
      .setFooter({
        text: `Comando enviado por ${command.user.tag}`,
        iconURL: String(command.user.avatarURL()),
      })
      .setTimestamp();

    await command.editReply({
      content: `<@${command.user.id}>`,
      embeds: [embed],
    });
  }
}
