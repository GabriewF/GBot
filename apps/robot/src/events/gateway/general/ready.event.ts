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

import { pino } from '@gbot/logging';
import { OAuth2Scopes } from 'discord.js';
import { ArgsOf, Client, Discord, Once } from 'discordx';

@Discord()
export abstract class Ready {
  @Once({ event: 'ready' })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async Handle([_]: ArgsOf<'ready'>, client: Client) {
    // Generate invite
    const invite = client.generateInvite({
      // Scopes of the Invite
      scopes: [OAuth2Scopes.Bot, OAuth2Scopes.ApplicationsCommands],

      // Permissions of the Invite
      permissions: [
        'Administrator',
        'ManageChannels',
        'ManageGuild',
        'ManageMessages',
        'SendMessages',
      ],
    });

    // Make sure all guilds are cached
    pino.warn('Synchronizing guilds...');

    const syncGuildSuccess = 'Synchronized guilds...';
    const syncGuildFailed = 'Error when synchronizing guilds...';

    await client.guilds
      .fetch()
      .then(() => pino.info(syncGuildSuccess))
      .catch(() => pino.error(syncGuildFailed));

    // Synchronize applications commands with Discord
    pino.warn('Synchronizing global commands...');

    const syncCommandsSuccess = 'Synchronized global commands...';
    const syncCommandsFailed = 'Error when synchronizing global commands...';

    await client
      .initApplicationCommands()
      .then(() => pino.info(syncCommandsSuccess))
      .catch(() => pino.error(syncCommandsFailed));

    // To clear all guild commands, uncomment this line,
    // This is useful when moving from guild commands to global commands
    // It must only be executed once

    //  await bot.clearApplicationCommands(
    //    ...bot.guilds.cache.map((g) => g.id)
    //  ),

    // When connected
    pino.info(`Connected to the gateway as ${client.user?.tag}`);
    pino.info(`Gateway user bot invite: ${invite}`);
  }
}
