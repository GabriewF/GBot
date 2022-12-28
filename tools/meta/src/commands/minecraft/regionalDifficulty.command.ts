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
  ColorResolvable,
  Locale,
  codeBlock,
} from 'discord.js';
import {
  ApplicationCommandOptions,
  VerifyName,
  NotEmpty,
  VName,
  SlashOptionNumberOptions,
} from 'discordx';

interface RDifficultyInterface {
  // Slash - L36
  info: Omit<
    ApplicationCommandOptions<VerifyName<string>, NotEmpty<string>>,
    'nameLocalizations' | 'descriptionLocalizations'
  >;

  // Content - L108
  content: (tag: string) => string;

  options: {
    // Regional Difficulty - L54
    regionalDifficulty: Omit<
      SlashOptionNumberOptions<VName<string>, string>,
      'nameLocalizations' | 'descriptionLocalizations'
    >;
  };

  embeds: {
    // Success Embed - L82
    successEmbed: {
      title: string;
      color: ColorResolvable;

      footer: {
        text: (tag: string) => string;
        icon: (avatar: string) => string;
      };

      fields: {
        regionalDifficulty: {
          text: string;
          value: (regionalDifficulty: string) => string;
        };

        clampedRegionalDifficulty: {
          text: string;
          value: (clampedRegionalDifficulty: string) => string;
        };
      };
    };
  };
}

type RDifficultyRecord = Record<Locale, RDifficultyInterface>;

const RDifficultyCommand: Partial<RDifficultyRecord> = {
  // English, US - English, US
  [Locale.EnglishUS]: {
    // Slash - L36
    info: {
      name: 'regional_difficulty',
      description: 'I give you the clamped regional difficulty!',
      dmPermission: true,
    },

    // Content - L107
    content: (tag: string) => `<@${tag}>`,

    options: {
      // Regional Difficulty - L54
      regionalDifficulty: {
        name: 'regional_difficulty',
        description: 'Your regional difficulty',
        type: ApplicationCommandOptionType.Number,
        required: true,

        // Limiter
        maxValue: 6.75,
        minValue: 0.0,
      },
    },

    embeds: {
      // Success Embed - L82
      successEmbed: {
        title: 'Regional Difficulty',
        color: 'Random',

        footer: {
          text: (tag: string) => `Command sent by: ${tag}`,
          icon: (avatar: string) => avatar,
        },

        fields: {
          regionalDifficulty: {
            text: ':crossed_swords: Regional Difficulty',
            value: (rd: string) => codeBlock(rd),
          },

          clampedRegionalDifficulty: {
            text: ':crossed_swords: Clamped Regional Difficulty',
            value: (crd: string) => codeBlock(crd),
          },
        },
      },
    },
  },

  // Portuguese, Brazilian - Português do Brasil
  [Locale.PortugueseBR]: {
    // Slash - L36
    info: {
      name: 'dificuldade_regional',
      description: 'Eu lhe dou a dificuldade regional apertada!',
      dmPermission: true,
    },

    // Content - L107
    content: (tag: string) => `<@${tag}>`,

    options: {
      // Regional Difficulty - L54
      regionalDifficulty: {
        name: 'dificuldade_regional',
        description: 'Sua dificuldade regional',
        type: ApplicationCommandOptionType.Number,
        required: true,

        // Limiter
        maxValue: 6.75,
        minValue: 0.0,
      },
    },

    embeds: {
      // Success Embed - L82
      successEmbed: {
        title: 'Dificuldade Regional',
        color: 'Random',

        footer: {
          text: (tag: string) => `Comando enviado por: ${tag}`,
          icon: (avatar: string) => avatar,
        },

        fields: {
          regionalDifficulty: {
            text: ':crossed_swords: Dificuldade Regional',
            value: (rd: string) => codeBlock(rd),
          },

          clampedRegionalDifficulty: {
            text: ':crossed_swords: Dificuldade regional apertada',
            value: (crd: string) => codeBlock(crd),
          },
        },
      },
    },
  },
};

export const RDifficultyLang = (loc?: Locale) => {
  const locale = (loc ?? Locale.EnglishUS) as Locale;
  switch (Object.hasOwn(RDifficultyCommand, locale)) {
    case true:
      return RDifficultyCommand[locale] as RDifficultyInterface;
    default:
      return RDifficultyCommand[Locale.EnglishUS] as RDifficultyInterface;
  }
};
