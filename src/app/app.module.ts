import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {ArchivePage} from "../pages/archive/archive";
import {DetailPage} from "../pages/detail/detail";
import {InfoPage} from "../pages/info/info";
import {MapPage} from "../pages/map/map";
import {CameraPage} from "../pages/camera/camera";
import {SettingsPage} from "../pages/settings/settings";
import {SignInPage} from "../pages/sign-in/sign-in";
import {SignUpPage} from "../pages/sign-up/sign-up";
import { Geolocation } from '@ionic-native/geolocation';
import {Camera} from "@ionic-native/camera";


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    HomePage,
    TabsPage,
    ArchivePage,
    DetailPage,
    MapPage,
    CameraPage,
    SettingsPage,
    InfoPage,
    SignInPage,
    SignUpPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    HomePage,
    TabsPage,
    ArchivePage,
    DetailPage,
    MapPage,
    CameraPage,
    SettingsPage,
    InfoPage,
    SignInPage,
    SignUpPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
