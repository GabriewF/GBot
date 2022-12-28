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

import { codeBlock, ColorResolvable, Locale } from 'discord.js';
import { ApplicationCommandOptions, VerifyName, NotEmpty } from 'discordx';

interface PingInterface {
  // Slash - L32
  info: Omit<
    ApplicationCommandOptions<VerifyName<string>, NotEmpty<string>>,
    'nameLocalizations' | 'descriptionLocalizations'
  >;

  // Content - L79 | L105
  content: (userId: string) => string;

  // Gateway Ping - L84
  gatewayPing: (ping: number) => string;

  // API Ping - L92
  apiPing: (sentTimestamp: number, createdTimestamp: number) => string;

  embeds: {
    // Ping Embed - L59
    pingEmbed: {
      title: string;
      color: ColorResolvable;

      footer: {
        text: (tag: string) => string;
        icon: (avatarURL: string) => string;
      };

      fields: [
        {
          name: string;
          preValue: string;
          value: (apiPing: string) => string;
        },
        {
          name: string;
          preValue: string;
          value: (apiPing: string) => string;
        },
      ];
    };
  };
}

type PingRecord = Record<Locale, PingInterface>;

const PingCommand: Partial<PingRecord> = {
  // English, US - English, US
  [Locale.EnglishUS]: {
    // Slash - L32
    info: {
      name: 'ping',
      description: "Return with a Pong if it's working!",
      dmPermission: true,
    },

    // Content - L79 | L105
    content: (userId: string) => `<@${userId}> *Pong! :ping_pong:*`,

    // Gateway Ping - L84
    gatewayPing: (ping: number) => `${Math.abs(ping)}ms`,

    // API Ping - L92
    apiPing: (sentTimestamp: number, createdTimestamp: number) =>
      `${Math.abs(sentTimestamp - createdTimestamp)}ms`,

    embeds: {
      // Ping Embed - L59
      pingEmbed: {
        title: 'Latency',
        color: 'Random',

        footer: {
          text: (tag: string) => `Command sent by: ${tag}`,
          icon: (avatarURL: string) => avatarURL,
        },

        fields: [
          {
            name: ':stopwatch: Gateway Latency',
            preValue: codeBlock('...ms'),
            value: (gatewayPing: string) => codeBlock(gatewayPing),
          },
          {
            name: ':zap: API Latency',
            preValue: codeBlock('...ms'),
            value: (apiPing: string) => codeBlock(apiPing),
          },
        ],
      },
    },
  },

  // Portuguese, Brazilian - Português do Brasil
  [Locale.PortugueseBR]: {
    // Slash - L32
    info: {
      name: 'latência',
      description: 'Retorno com um pong se estiver funcionando!',
      dmPermission: true,
    },

    // Content - L79 | L105
    content: (userId: string) => `<@${userId}> *Pong! :ping_pong:*`,

    // Gateway Ping - L84
    gatewayPing: (ping: number) => `${Math.abs(ping)}ms`,

    // API Ping - L92
    apiPing: (sentTimestamp: number, createdTimestamp: number) =>
      `${Math.abs(sentTimestamp - createdTimestamp)}ms`,

    embeds: {
      // Ping Embed - L59
      pingEmbed: {
        title: 'Latência',
        color: 'Random',

        footer: {
          text: (tag: string) => `Comando enviado por: ${tag}`,
          icon: (avatarURL: string) => avatarURL,
        },

        fields: [
          {
            name: ':stopwatch: Latência do Gateway',
            preValue: codeBlock('...ms'),
            value: (gatewayPing: string) => codeBlock(gatewayPing),
          },
          {
            name: ':zap: Latência da API',
            preValue: codeBlock('...ms'),
            value: (apiPing: string) => codeBlock(apiPing),
          },
        ],
      },
    },
  },
};

export const PingLang = (loc?: Locale) => {
  const locale = (loc ?? Locale.EnglishUS) as Locale;
  switch (Object.hasOwn(PingCommand, locale)) {
    case true:
      return PingCommand[locale] as PingInterface;
    default:
      return PingCommand[Locale.EnglishUS] as PingInterface;
  }
};
