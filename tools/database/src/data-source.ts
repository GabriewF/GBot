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

import { DataSource } from 'typeorm';
import { Discord, Shortcut, Twitch, User } from './entities';
import { PinoLogger } from './loggers/pino';

export const AppDataSource = new DataSource({
  type: 'cockroachdb',
  ssl: { rejectUnauthorized: false },

  url: String(process.env['DB_URL']),

  // Host
  database: String(process.env['DB_NAME']),
  host: String(process.env['DB_HOST']),
  port: Number(process.env['DB_PORT']),

  // Credentials
  username: String(process.env['DB_USER']),
  password: String(process.env['DB_PASS']),

  // Options
  synchronize: true,
  logging: true,
  logger: new PinoLogger(),
  entities: [Discord, Shortcut, Twitch, User],
  subscribers: [],
  migrations: [],
});

export const init = async () => await AppDataSource.initialize();
init();
