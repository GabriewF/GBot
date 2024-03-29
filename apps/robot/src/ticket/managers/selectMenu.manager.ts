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
  ButtonStyle,
  ChannelType,
  EmbedBuilder,
  StringSelectMenuInteraction,
  TextChannel,
  ThreadAutoArchiveDuration,
} from 'discord.js';
import { Discord, SelectMenuComponent } from 'discordx';

@Discord()
export abstract class SelectMenu {
  @SelectMenuComponent({ id: 'ticketCategory' })
  async Handle(interaction: StringSelectMenuInteraction) {
    // Defer Reply
    await interaction.deferReply({
      ephemeral: true,
    });

    const ticketCategory = interaction.values?.[0];

    if (!ticketCategory) {
      await interaction.editReply({
        content: 'Categoria Invalida!',
      });
      return;
    }

    const ch = <TextChannel>await interaction.channel?.fetch();

    const thread = await ch.threads.create({
      // Info
      name: `Ticket de ${interaction.user.tag}`,
      reason: `Ticket sobre ${ticketCategory}`,

      // Config
      autoArchiveDuration: ThreadAutoArchiveDuration.OneDay,

      type: ChannelType.PrivateThread,

      // Other
      invitable: false,
    });

    const initEmbed = new EmbedBuilder()
      .setTitle(`Olá ${interaction.user.username}`)
      .setDescription(
        'Explique de forma clara e detalhada o seu problema para que seja elaborada uma solução o mais rápido possível.**:bulb: Observação:** Em caso de inatividade, o ticket será encerrado em até 24 horas!',
      )
      .setTimestamp()
      .setFooter({
        text: `Ticket iniciado por ${interaction.user.tag}`,
        iconURL: String(interaction.user.avatarURL()),
      });

    const button = new ButtonBuilder()
      .setLabel('Fechar Ticket')
      .setCustomId('closeTicket')
      .setStyle(ButtonStyle.Danger);

    const buttonRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
      button,
    );

    await thread.send({
      content: `<@${interaction.user.id}> ・ <@&${process.env['HELPER_ROLE']}>`,
      embeds: [initEmbed],
      components: [buttonRow],
    });

    await thread.members.add(interaction.user.id);

    await interaction.editReply({
      content: `Você selecionou: ${ticketCategory}`,
    });
  }
}
