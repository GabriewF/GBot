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

// Typings
import { ActivityType } from 'discord.js';

// Packages
import { pino } from '@gbot/logging';
import { IntentsBitField, Partials } from 'discord.js';
import { Client } from 'discordx';
// import { importx } from '@discordx/importer';
// import { dirname } from 'node:path';
import { loadGlobal } from '@gbot/environment';

export class Main {
  private static client: Client;

  static get Client(): Client {
    return this.client;
  }

  static async start(): Promise<void> {
    loadGlobal();

    this.client = new Client({
      // To use only guild command
      // botGuilds: [(client) => client.guilds.cache.map((guild) => guild.id)],

      // Discord intents
      intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.DirectMessages,
        IntentsBitField.Flags.MessageContent,
      ],

      // Discord partials
      partials: [
        Partials.User,
        Partials.Channel,
        Partials.Message,
        Partials.GuildMember,
        Partials.ThreadMember,
      ],

      // Set bot presence
      presence: {
        activities: [
          {
            name: 'Utilize FOI?!',
            type: ActivityType.Listening,
          },
        ],
        afk: false,
        status: 'idle',
      },

      // Other
      closeTimeout: 10,
      failIfNotExists: true,
      silent: false,
    });

    await import('./commands');
    await import('./events');
    await import('./ticket');

    // Let's start the bot
    if (!process.env['DISCORD_TOKEN']) {
      throw Error('Could not find DISCORD_TOKEN in your environment');
    }

    // Log in with your bot token
    pino.warn('Connecting to the gateway...');
    await this.client.login(String(process.env['DISCORD_TOKEN']));
  }
}

Main.start();
