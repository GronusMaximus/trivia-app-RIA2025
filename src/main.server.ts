import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent as App } from './app/app.component';
import { config } from './app/app.config.server';

const bootstrap = () => bootstrapApplication(App, config);

export default bootstrap;
