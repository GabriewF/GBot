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

import { Get, Router } from '@discordx/koa';
import { shortcutRepository } from '@gbot/database';
import type { RouterContext } from '@koa/router';

import { URL } from 'node:url';

@Router()
export abstract class OAuth {
  @Get('/oauth')
  async Handler(ctx: RouterContext) {
    const shortcutId = ctx.URL.searchParams.get('id');
    const shortcut = shortcutId ?? true;

    if (shortcut == true) {
      const resBody = JSON.stringify({
        status: 400,
        statusText: 'Bad Request',
        message: 'Need code param',
      });

      ctx.status = 400;
      ctx.body = resBody;

      return;
    }

    const data = await shortcutRepository.findOneBy({
      id: shortcut,
    });

    const url = new URL('/oauth2/authorize', 'https://id.twitch.tv/');

    url.searchParams.append(
      'client_id',
      String(process.env['TWITCH_CLIENT_ID']),
    );
    url.searchParams.append(
      'redirect_uri',
      `${process.env['SERVER_URL']}/${process.env['TWITCH_REDIRECT_URL']}`,
    );
    url.searchParams.append('state', String(data?.userId));
    url.searchParams.append('scope', 'user:read:email user:edit');
    url.searchParams.append('response_type', 'code');
    url.searchParams.append('force_verify', 'true');

    ctx.redirect(url.href);
  }
}
