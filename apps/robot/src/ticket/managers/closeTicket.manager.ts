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
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  EmbedBuilder,
} from 'discord.js';
import { ButtonComponent, Discord } from 'discordx';

@Discord()
export abstract class CloseTicket {
  @ButtonComponent({ id: 'closeTicket' })
  async Handle(interaction: ButtonInteraction) {
    if (!interaction.channel?.isThread()) return;

    const channel = await interaction.channel.fetch();

    await channel.setLocked(true);
    await channel.setArchived(false);

    const initEmbed = new EmbedBuilder()
      .setDescription('Esse ticket trancado!')
      .setTimestamp()
      .setFooter({
        text: `Ticket iniciado por ${interaction.user.tag}`,
        iconURL: String(interaction.user.avatarURL()),
      });

    const closeTicketDef = new ButtonBuilder()
      .setLabel('Fechar Ticket')
      .setCustomId('closeTicketDef')
      .setStyle(ButtonStyle.Danger);

    const reOpenTicket = new ButtonBuilder()
      .setLabel('Re-abrir Ticket')
      .setCustomId('reOpenTicket')
      .setStyle(ButtonStyle.Success);

    const buttonRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
      reOpenTicket,
      closeTicketDef,
    );

    await interaction.reply({
      embeds: [initEmbed],
      components: [buttonRow],
    });
  }

  @ButtonComponent({ id: 'closeTicketDef' })
  async HandleClose(interaction: ButtonInteraction) {
    if (!interaction.channel?.isThread()) return;

    const channel = await interaction.channel.fetch();

    const initEmbed = new EmbedBuilder()
      .setDescription('Esse ticket sera fechado em 5 segundos...')
      .setTimestamp()
      .setFooter({
        text: `Ticket iniciado por ${interaction.user.tag}`,
        iconURL: String(interaction.user.avatarURL()),
      });

    await interaction.reply({
      embeds: [initEmbed],
    });

    await channel.setLocked(true);
    await channel.setArchived(true);

    const timeout = setTimeout(async () => {
      await channel.delete();
      clearInterval(timeout);
    }, 5000);
  }

  @ButtonComponent({ id: 'reOpenTicket' })
  async HandleReOpen(interaction: ButtonInteraction) {
    if (!interaction.channel?.isThread()) return;

    const channel = await interaction.channel.fetch();

    await channel.setLocked(false);
    await channel.setArchived(false);
  }
}
