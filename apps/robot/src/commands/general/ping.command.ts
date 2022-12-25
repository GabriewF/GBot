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

import { codeBlock, CommandInteraction, EmbedBuilder } from 'discord.js';
import { Discord, Slash } from 'discordx';

@Discord()
export abstract class Ping {
  @Slash({
    // Slash Info
    name: 'ping',
    description: "Return with a Pong if it's working!",
    dmPermission: true,

    // Name Localization
    nameLocalizations: {
      'pt-BR': 'latência',
    },

    // Description Localization
    descriptionLocalizations: {
      'pt-BR': 'Retorno com um Pong se estiver funcionando!',
    },
  })
  async Handle(command: CommandInteraction) {
    await command.deferReply({
      ephemeral: false,
      fetchReply: true,
    });

    // Embed of the message
    const embed = new EmbedBuilder()
      .setTitle('Latência')
      .setColor('Random')
      .setFooter({
        text: `Comando enviado por ${command.user.tag}`,
        iconURL: String(command.user.avatarURL()),
      })
      .setTimestamp();

    // Get Ping
    const gatewayPing = `${Math.round(command.client.ws.ping)}ms`;

    // Add the Gateway Ping
    embed.addFields({
      name: ':stopwatch: Latência do Gateway',
      value: codeBlock(gatewayPing),
    });

    const apiPing = `${Math.abs(Date.now() - command.createdTimestamp)}ms`;

    // Add the API Ping
    embed.addFields({
      name: ':zap: Latência da API',
      value: codeBlock(apiPing),
    });

    // Return the embed
    await command.editReply({
      content: `<@${command.user.id}> *Pong! :ping_pong:*`,
      embeds: [embed],
    });
  }
}
