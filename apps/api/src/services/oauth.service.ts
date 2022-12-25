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

import { shortcutRepository } from '@gbot/database';
import { Injectable } from '@nestjs/common';

import { Response } from 'express';

@Injectable()
export class OauthService {
  async GetOAuth(res: Response, id: string) {
    const shortcut = id ?? true;

    if (shortcut) {
      res.status(400);
      res.type('json');

      return JSON.stringify({
        status: 400,
        statusText: 'Bad Request',
        message: 'Need code param',
      });
    }

    const data = await shortcutRepository.findOneBy({
      id: shortcut,
    });

    const url = new URL('/oauth2/authorize', 'https://id.twitch.tv');

    const serverUrl = <string>process.env['SERVER_URL'];
    const twRedirUrl = <string>process.env['TWITCH_REDIRECT_URL'];

    const redirUrl = `${serverUrl}/${twRedirUrl}`;
    const clientId = <string>process.env['TWITCH_CLIENT_ID'];
    const userId = String(data?.userId);
    const scope = 'user:read:email user:edit';
    const responseType = 'code';
    const forceVerify = String(true);

    url.searchParams.append('client_id', clientId);
    url.searchParams.append('redirect_uri', redirUrl);
    url.searchParams.append('state', userId);
    url.searchParams.append('scope', scope);
    url.searchParams.append('response_type', responseType);
    url.searchParams.append('force_verify', forceVerify);

    return res.redirect(302, url.href);
  }
}
