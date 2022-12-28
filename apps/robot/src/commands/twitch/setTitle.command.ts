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

import { getApiClient } from '@gbot/helpers';
import { ApplicationCommandOptionType, CommandInteraction } from 'discord.js';
import { Discord, Slash, SlashGroup, SlashOption } from 'discordx';

@Discord()
export abstract class SetTitle {
  @Slash({
    // Info of the slash command
    name: 'set-title',
    description: 'Set your channel title!',

    // Name Localizations
    nameLocalizations: {
      'pt-BR': 'setar-title',
    },

    // And descriptions
    descriptionLocalizations: {
      'pt-BR': 'Sete a title do seu canal',
    },
  })
  @SlashGroup('twitch')
  async Handle(
    @SlashOption({
      // Slash Option Info
      name: 'title',
      description: 'Your title',
      type: ApplicationCommandOptionType.String,
      required: true,

      // Name Localization
      nameLocalizations: {
        'pt-BR': 'title',
      },

      // Description Localization
      descriptionLocalizations: {
        'pt-BR': 'Sua title',
      },
    })
    _description: string,

    command: CommandInteraction,
  ) {
    await command.deferReply({ ephemeral: true });

    const apiClient = await getApiClient(command.user.id);

    if (apiClient == null) {
      await command.reply('Se registre Primeiro!');
      return;
    }

    // await apiClient?.callApi({
    //   url: ''
    // })

    await command.editReply(`Seu titulo...`);

    return;
  }
}
