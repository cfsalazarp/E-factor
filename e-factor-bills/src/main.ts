import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

fetch('/assets/config.json')
  .then((response) => response.json())
  .then((config) => {
    const modifiedAppConfig = {
      ...appConfig,
      providers: [
      ...appConfig.providers,
      { provide: 'CONFIG', useValue: config }
      ]
    };

    bootstrapApplication(AppComponent, modifiedAppConfig)
      .catch((err) => console.error(err));
  })
  .catch((error) => {
    console.error("Error loading config.json", error);
  });
