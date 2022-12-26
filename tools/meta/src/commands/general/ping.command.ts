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

import { codeBlock, ColorResolvable, Locale, resolveColor } from 'discord.js';
import { ApplicationCommandOptions, VerifyName, NotEmpty } from 'discordx';

interface PingInterface {
  // Slash Command Information
  info: Omit<
    ApplicationCommandOptions<VerifyName<string>, NotEmpty<string>>,
    'nameLocalizations' | 'descriptionLocalizations'
  >;

  strings: {
    // Content - L82
    content: (userId: string) => string;

    // Success Embed - L54
    successEmbed: {
      // Title - L66
      title: string;
      // Color - L67
      color: ColorResolvable;

      // Footer - L68
      footer: {
        text: (tag: string) => string;
        icon: (avatarURL: string) => string;
      };

      fields: [
        // Field 01 - L67
        {
          name: string;
          value: (gatewayPing: string) => string;
        },

        // Field 01 - L75
        {
          name: string;
          value: (apiPing: string) => string;
        },
      ];
    };

    // Gateway Ping - L64
    gatewayPing: (ping: number) => string;

    // Gateway Ping - L72
    apiPing: (createdTimestamp: number) => string;
  };
}

type PingRecord = Record<Locale, PingInterface>;

const PingCommand: Partial<PingRecord> = {
  // English, US - English, US
  [Locale.EnglishUS]: {
    // Slash Command Information
    info: {
      name: 'ping',
      description: "Return with a Pong if it's working!",
      dmPermission: true,
    },

    strings: {
      // Content - L82
      content: (userId: string) => `<@${userId}> *Pong! :ping_pong:*`,

      // Main Embed - L54
      successEmbed: {
        // Title - L66
        title: 'Latency',
        // Color - L67
        color: resolveColor('Random'),

        // Footer - L68
        footer: {
          text: (tag: string) => `Command sent by: ${tag}`,
          icon: (avatarURL: string) => avatarURL,
        },

        fields: [
          // Field 01 - L67
          {
            name: ':stopwatch: Gateway Latency',
            value: (gatewayPing: string) => codeBlock(gatewayPing),
          },

          // Field 01 - L75
          {
            name: ':zap: API Latency',
            value: (apiPing: string) => codeBlock(apiPing),
          },
        ],
      },

      // Gateway Ping - L64
      gatewayPing: (ping: number) => `${Math.round(ping)}ms`,

      // Gateway Ping - L72
      apiPing: (createdTimestamp: number) =>
        `${Math.abs(Date.now() - createdTimestamp)}ms`,
    },
  },

  // Portuguese, Brazilian - Português do Brasil
  [Locale.PortugueseBR]: {
    // Slash Command Information
    info: {
      name: 'latência',
      description: 'Retorno com um pong se estiver funcionando!',
      dmPermission: true,
    },

    strings: {
      // Content - L82
      content: (userId: string) => `<@${userId}> *Pong! :ping_pong:*`,

      // Main Embed - L54
      successEmbed: {
        // Title - L66
        title: 'Latência',
        // Color - L67
        color: resolveColor('Random'),

        // Footer - L68
        footer: {
          text: (tag: string) => `Comando enviado por: ${tag}`,
          icon: (avatarURL: string) => avatarURL,
        },

        fields: [
          // Field 01 - L67
          {
            name: ':stopwatch: Latência do Gateway',
            value: (gatewayPing: string) => codeBlock(gatewayPing),
          },

          // Field 01 - L75
          {
            name: ':zap: Latência da API',
            value: (apiPing: string) => codeBlock(apiPing),
          },
        ],
      },

      // Gateway Ping - L64
      gatewayPing: (ping: number) => `${Math.round(ping)}ms`,

      // Gateway Ping - L72
      apiPing: (createdTimestamp: number) =>
        `${Math.abs(Date.now() - createdTimestamp)}ms`,
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
