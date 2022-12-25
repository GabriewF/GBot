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

import { pino } from '@gabriewf/logging';
pino.info('Foi?');

import { NestFactory } from '@nestjs/core';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import { loadGlobal } from '@gabriewf/environment';

import { AppModule } from './modules';
import { PinoLogger } from './loggers';

export class Main {
  private static app: NestExpressApplication;

  static get App(): NestExpressApplication {
    return this.app;
  }

  static async start() {
    loadGlobal();

    const app = await NestFactory.create<NestExpressApplication>(
      // App Module
      AppModule,

      // Adapter
      new ExpressAdapter(),

      // Options
      { logger: new PinoLogger() },
    );

    await app.listen(80);
  }
}

// Load Server
Main.start();

export * from './controllers';
export * from './modules';
export * from './services';
export * from './loggers';
