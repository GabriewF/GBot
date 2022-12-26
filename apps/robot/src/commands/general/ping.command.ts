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

import { CommandInteraction, EmbedBuilder, Locale } from 'discord.js';
import { PingLang } from '@gbot/meta';
import { Discord, Slash } from 'discordx';

@Discord()
export abstract class Ping {
  @Slash({
    // Slash Info
    name: PingLang().info.name,
    description: PingLang().info.description,
    dmPermission: PingLang().info.dmPermission,

    // Name Localization
    nameLocalizations: {
      'pt-BR': PingLang(Locale.PortugueseBR).info.name,
      'en-US': PingLang(Locale.EnglishUS).info.name,
    },

    // Description Localization
    descriptionLocalizations: {
      'pt-BR': PingLang(Locale.PortugueseBR).info.description,
      'en-US': PingLang(Locale.EnglishUS).info.description,
    },
  })
  async Handle(command: CommandInteraction) {
    const loc = PingLang(command.locale);

    await command.deferReply({
      ephemeral: false,
      fetchReply: true,
    });

    const successEmbedLoc = loc.strings.successEmbed;

    // Embed of the message
    const successEmbed = new EmbedBuilder()
      .setTitle(successEmbedLoc.title)
      .setColor(successEmbedLoc.color)
      .setFooter({
        text: successEmbedLoc.footer.text(command.user.tag),
        iconURL: successEmbedLoc.footer.icon(String(command.user.avatarURL())),
      })
      .setTimestamp();

    // Get Ping
    const gatewayPing = loc.strings.gatewayPing(command.client.ws.ping);

    // Add the Gateway Ping
    successEmbed.addFields({
      name: successEmbedLoc.fields[0].name,
      value: successEmbedLoc.fields[0].value(gatewayPing),
    });

    const apiPing = loc.strings.apiPing(command.createdTimestamp);

    // Add the API Ping
    successEmbed.addFields({
      name: successEmbedLoc.fields[1].name,
      value: successEmbedLoc.fields[1].value(apiPing),
    });

    // Return the embed
    await command.followUp({
      content: loc.strings.content(command.user.id),
      embeds: [successEmbed],
    });

    return;
  }
}
