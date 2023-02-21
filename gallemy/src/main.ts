import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import 'dotenv/config';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
