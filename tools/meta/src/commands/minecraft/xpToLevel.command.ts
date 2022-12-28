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
  codeBlock,
  ColorResolvable,
  Locale,
} from 'discord.js';
import {
  ApplicationCommandOptions,
  VerifyName,
  NotEmpty,
  SlashOptionNumberOptions,
  VName,
} from 'discordx';

interface XTLInterface {
  // Slash - L37
  info: Omit<
    ApplicationCommandOptions<VerifyName<string>, NotEmpty<string>>,
    'nameLocalizations' | 'descriptionLocalizations'
  >;

  // Content - L128
  content: (userId: string) => string;

  options: {
    // XP Levels - L57
    xpLevels: Omit<
      SlashOptionNumberOptions<VName<string>, string>,
      'nameLocalizations' | 'descriptionLocalizations'
    >;
  };

  embeds: {
    // Success Embed - L90
    successEmbed: {
      title: string;
      color: ColorResolvable;

      footer: {
        text: (tag: string) => string;
        icon: (avatar: string) => string;
      };

      fields: {
        xpPoints: {
          text: string;
          value: (xp: bigint) => string;
        };

        xpLevels: {
          text: string;
          value: (levels: number) => string;
        };
      };
    };
  };
}

type XTLRecord = Record<Locale, XTLInterface>;

const XTLCommand: Partial<XTLRecord> = {
  // English, US - English, US
  [Locale.EnglishUS]: {
    // Slash - L37
    info: {
      name: 'xp_to_level',
      description: 'I give you the leveis of this XP points!',
      dmPermission: true,
    },

    // Content - L128
    content: (userId: string) => `<@${userId}>`,

    options: {
      // XP Levels - L57
      xpLevels: {
        name: 'xp_points',
        description: 'Your xp points',
        type: ApplicationCommandOptionType.Integer,
        required: true,

        maxValue: 1000000,
        minValue: 0,
      },
    },

    embeds: {
      // Success Embed - L90
      successEmbed: {
        title: 'XP Points',
        color: 'Random',

        footer: {
          text: (tag: string) => `Command sent by: ${tag}`,
          icon: (avatar: string) => avatar,
        },

        fields: {
          xpPoints: {
            text: ':crossed_swords: XP Points',
            value: (xp: bigint) => codeBlock(String(xp)),
          },

          xpLevels: {
            text: ':shield: XP Levels',
            value: (levels: number) => codeBlock(String(levels)),
          },
        },
      },
    },
  },

  // Portuguese, Brazilian - Português do Brasil
  [Locale.PortugueseBR]: {
    // Slash - L37
    info: {
      name: 'xp_para_level',
      description: 'Eu te dou os níveis desses pontos de XP!',
      dmPermission: true,
    },

    // Content - L128
    content: (userId: string) => `<@${userId}>`,

    options: {
      // XP Levels - L57
      xpLevels: {
        name: 'pontos_de_xp',
        description: 'Seus pontos de XP',
        type: ApplicationCommandOptionType.Integer,
        required: true,

        maxValue: 1000000,
        minValue: 0,
      },
    },

    embeds: {
      // Success Embed - L90
      successEmbed: {
        title: 'Pontos de XP',
        color: 'Random',

        footer: {
          text: (tag: string) => `Comando enviado por: ${tag}`,
          icon: (avatar: string) => avatar,
        },

        fields: {
          xpPoints: {
            text: ':crossed_swords: Pontos de XP',
            value: (xp: bigint) => codeBlock(String(xp)),
          },

          xpLevels: {
            text: ':shield: Leveis de XP',
            value: (levels: number) => codeBlock(String(levels)),
          },
        },
      },
    },
  },
};

export const XTLLang = (loc?: Locale) => {
  const locale = (loc ?? Locale.EnglishUS) as Locale;
  switch (Object.hasOwn(XTLCommand, locale)) {
    case true:
      return XTLCommand[locale] as XTLInterface;
    default:
      return XTLCommand[Locale.EnglishUS] as XTLInterface;
  }
};
