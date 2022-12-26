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

import { ButtonStyle, ColorResolvable, Locale } from 'discord.js';
import { ApplicationCommandOptions, VerifyName, NotEmpty } from 'discordx';

interface QuizInterface {
  // Slash - L39
  info: Omit<
    ApplicationCommandOptions<VerifyName<string>, NotEmpty<string>>,
    'nameLocalizations' | 'descriptionLocalizations'
  >;

  // Query's
  query: {
    // Query 01 - L52
    query01: {
      embeds: {
        // Question Embed - L58
        questionEmbed: {
          // Info - L59
          title: string;
          description: string;
          color: ColorResolvable;

          // Footer - L62
          footer: {
            text: (tag: string) => string;
            icon: (avatarURL: string) => string;
          };
        };
      };

      buttons: {
        // Yes Button - L68
        yesButton: {
          label: string;
          customId: string;
          style: ButtonStyle;
        };

        // No Button - L73
        noButton: {
          label: string;
          customId: string;
          style: ButtonStyle;
        };
      };
    };

    // Query 02 - L93 | L130
    query02: {
      embeds: {
        // Question Embed - L96 | L133
        questionEmbed: {
          // Info - L97 | L134
          title: string;
          description: string;
          color: ColorResolvable;

          // Footer - L100 | L137
          footer: {
            text: (tag: string) => string;
            icon: (avatarURL: string) => string;
          };
        };
      };

      buttons: {
        // Yes Button - L106 | L143
        yesButton: {
          label: string;
          customId: string;
          style: ButtonStyle;
        };

        // Yes Button - L111 | L148
        noButton: {
          label: string;
          customId: string;
          style: ButtonStyle;
        };
      };
    };

    // Finalize - L184
    finalize: {
      embeds: {
        // Final Embed - L185
        finalEmbed: {
          title: string;
          description: string;
          color: ColorResolvable;

          // Footer - L189
          footer: {
            text: (tag: string) => string;
            icon: (avatarURL: string) => string;
          };
        };
      };
    };
  };
}

type QuizRecord = Record<Locale, QuizInterface>;

const QuizCommand: Partial<QuizRecord> = {
  // English, US - English, US
  [Locale.EnglishUS]: {
    // Slash - L39
    info: {
      name: 'quiz',
      description: 'Make an Quiz!',
      dmPermission: true,
    },

    // Query's
    query: {
      // Query 01 - L52
      query01: {
        embeds: {
          // Question Embed - L58
          questionEmbed: {
            // Info - L59
            title: 'Question 01',
            description: 'Do you like bread with cheese?',
            color: 'Random',

            // Footer - L62
            footer: {
              text: (tag: string) => `Command sent by: ${tag}`,
              icon: (avatarURL: string) => avatarURL,
            },
          },
        },

        buttons: {
          // Yes Button - L68
          yesButton: {
            label: 'Yes!',
            customId: 'Query01_Response01',
            style: ButtonStyle.Success,
          },

          // No Button - L73
          noButton: {
            label: 'No!',
            customId: 'Query01_Response02',
            style: ButtonStyle.Danger,
          },
        },
      },

      // Query 02 - L93 | L130
      query02: {
        embeds: {
          // Question Embed - L96 | L133
          questionEmbed: {
            title: 'Question 02',
            description: 'Do you like bread with egg?',
            color: 'Random',

            // Footer - L100 | L137
            footer: {
              text: (tag: string) => `Command sent by: ${tag}`,
              icon: (avatarURL: string) => avatarURL,
            },
          },
        },

        buttons: {
          // Yes Button - L106 | L143
          yesButton: {
            label: 'Yes!',
            customId: 'Query02_Response01',
            style: ButtonStyle.Success,
          },

          // Yes Button - L111 | L148
          noButton: {
            label: 'No!',
            customId: 'Query02_Response02',
            style: ButtonStyle.Danger,
          },
        },
      },

      // Finalize - L184
      finalize: {
        embeds: {
          // Final Embed - L185
          finalEmbed: {
            title: 'Finalized',
            description: 'Thanks for participating!',
            color: 'Random',

            // Footer - L189
            footer: {
              text: (tag: string) => `Command sent by: ${tag}`,
              icon: (avatarURL: string) => avatarURL,
            },
          },
        },
      },
    },
  },

  // Portuguese, Brazilian - Português do Brasil
  [Locale.PortugueseBR]: {
    // Slash - L39
    info: {
      name: 'questionário',
      description: 'Faça um questionário!',
      dmPermission: true,
    },

    // Query's
    query: {
      // Query 01 - L52
      query01: {
        embeds: {
          // Question Embed - L58
          questionEmbed: {
            // Info - L59
            title: 'Pergunta 01',
            description: 'Você gosta de pão com queijo?',
            color: 'Random',

            // Footer - L62
            footer: {
              text: (tag: string) => `Comando enviado por: ${tag}`,
              icon: (avatarURL: string) => avatarURL,
            },
          },
        },

        buttons: {
          // Yes Button - L68
          yesButton: {
            label: 'Sim!',
            customId: 'Query01_Response01',
            style: ButtonStyle.Success,
          },

          // No Button - L73
          noButton: {
            label: 'Não!',
            customId: 'Query01_Response02',
            style: ButtonStyle.Danger,
          },
        },
      },

      // Query 02 - L93 | L130
      query02: {
        embeds: {
          // Question Embed - L96 | L133
          questionEmbed: {
            title: 'Pergunta 02',
            description: 'Você gosta de pão com ovo?',
            color: 'Random',

            // Footer - L100 | L137
            footer: {
              text: (tag: string) => `Comando enviado por: ${tag}`,
              icon: (avatarURL: string) => avatarURL,
            },
          },
        },

        buttons: {
          // Yes Button - L106 | L143
          yesButton: {
            label: 'Sim!',
            customId: 'Query02_Response01',
            style: ButtonStyle.Success,
          },

          // Yes Button - L111 | L148
          noButton: {
            label: 'Não!',
            customId: 'Query02_Response02',
            style: ButtonStyle.Danger,
          },
        },
      },

      // Finalize - L184
      finalize: {
        embeds: {
          // Final Embed - L185
          finalEmbed: {
            title: 'Finalizado',
            description: 'Obrigado por participar!',
            color: 'Random',

            // Footer - L189
            footer: {
              text: (tag: string) => `Comando enviador por: ${tag}`,
              icon: (avatarURL: string) => avatarURL,
            },
          },
        },
      },
    },
  },
};

export const QuizLang = (loc?: Locale) => {
  const locale = (loc ?? Locale.EnglishUS) as Locale;
  switch (Object.hasOwn(QuizCommand, locale)) {
    case true:
      return QuizCommand[locale] as QuizInterface;
    default:
      return QuizCommand[Locale.EnglishUS] as QuizInterface;
  }
};
