/***************************************************************************************************
 * Zone JS
 */
import 'zone.js';
import 'zone.js/testing';

/***************************************************************************************************
 * ANGULAR TESTBED SETUP
 */
import { getTestBed } from '@angular/core/testing';
import {
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

getTestBed().initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting()
);

/***************************************************************************************************
 * SPECS
 */
import './app/shared/components/ui/timer/timer.component.spec';
import './app/core/services/game-controller.service.spec';
import './app/features/trivia/trivia-game/trivia-game.component.spec';
