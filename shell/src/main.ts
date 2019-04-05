import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// Stencil https://stenciljs.com/docs/angular
import { defineCustomElements } from '../../client-c/dist/loader';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

// Stencil https://stenciljs.com/docs/angular
defineCustomElements(window);
