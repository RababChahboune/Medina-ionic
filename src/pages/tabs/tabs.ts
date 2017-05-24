import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import {CameraPage} from "../camera/camera";
import {ArchivePage} from "../archive/archive";
import {InfoPage} from "../info/info";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  homeRoot = HomePage;
  cameraRoot = CameraPage;
  archiveRoot = ArchivePage;
  infoRoot = InfoPage;
  stillRoot = InfoPage;

  constructor() {

  }
}
