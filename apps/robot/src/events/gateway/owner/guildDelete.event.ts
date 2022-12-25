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
  codeBlock,
  Colors,
  EmbedBuilder,
  Guild,
  TextChannel,
} from 'discord.js';
import { ArgsOf, Client, Discord, On } from 'discordx';

@Discord()
export abstract class GuildDelete {
  @On({ event: 'guildDelete' })
  async Handle([guild]: ArgsOf<'guildDelete'>, client: Client) {
    if (!client.user) return;

    const panelGuild = <Guild>(
      client.guilds.cache.get(String(process.env['DISCORD_GUILD_ID']))
    );
    const logChannel = <TextChannel>(
      panelGuild.channels.cache.get(String(process.env['LOG_CHANNEL']))
    );

    const guildCreatedDay = guild.createdAt.getDay();
    const guildCreatedMonth = guild.createdAt.getMonth();
    const guildCreatedYear = guild.createdAt.getFullYear();

    const guildCreatedHour = guild.createdAt.getHours();
    const guildCreatedMinute = guild.createdAt.getMinutes();

    const embed = new EmbedBuilder({
      // Info of the embed
      title: 'Guild Deletada',
      color: Colors.Red,
      description: 'Saí de uma Guild!',

      // Fields of the embed
      fields: [
        {
          name: ':computer: ID da Guild',
          value: codeBlock(guild.id),
        },
        {
          name: ':date: Criado em: ',
          value: codeBlock(
            `${guildCreatedDay}/${guildCreatedMonth}/${guildCreatedYear} ${guildCreatedHour}h${guildCreatedMinute}m (${guild.createdTimestamp})`,
          ),
        },
      ],

      // Thumbnail of the embed
      thumbnail: {
        url: String(guild.iconURL({ forceStatic: true })),
      },

      // Footer of the embed
      footer: {
        text: `ID da Guild: ${guild.id}`,
        iconURL: String(client.user.avatarURL({ forceStatic: true })),
      },

      // Timestamp of the embed
      timestamp: Date.now(),
    });

    logChannel.send({
      embeds: [embed],
    });

    pino.info(`Entrei em uma Guild: ${guild.id}`);
  }
}
