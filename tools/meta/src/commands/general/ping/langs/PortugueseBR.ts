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

// import { codeBlock } from 'discord.js';
import { codeBlock } from 'discord.js';
import { ILocale } from '../types/ILocale';

// Portuguese, Brazilian - Português do Brasil
export const PortugueseBR: ILocale = {
  // Slash
  info: {
    name: 'latência',
    description: 'Retorno com um pong se estiver funcionando!',
    dmPermission: true,
  },

  // Gateway Ping
  gatewayPing: (ping: number) => `${Math.abs(ping)}ms`,

  // API Ping
  apiPing: (sentTimestamp: number, createdTimestamp: number) =>
    `${Math.abs(sentTimestamp - createdTimestamp)}ms`,

  embeds: {
    // Ping Embed
    pingEmbed: {
      title: ':ping_pong: Latência',
      color: 'Random',

      footer: {
        text: (tag: string) => `Comando enviado por: ${tag}`,
        icon: (avatarURL: string) => avatarURL,
      },

      // thumbnail:
      //   'https://raw.githubusercontent.com/twitter/twemoji/master/assets/72x72/1f3d3.png',

      fields: [
        {
          name: ':stopwatch: Latência do Gateway',
          preValue: codeBlock('...ms'),
          value: (gatewayPing: string) => codeBlock(gatewayPing),
          inline: true,
        },
        {
          name: ':zap: Latência da API',
          preValue: codeBlock('...ms'),
          value: (apiPing: string) => codeBlock(apiPing),
          inline: true,
        },
      ],
    },
  },
};
