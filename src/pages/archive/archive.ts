import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import {SettingsPage} from "../settings/settings";
import {CameraPage} from "../camera/camera";
import {HttpService} from "../../app/http.service";

/**
 * Generated class for the ArchivePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-archive',
  templateUrl: 'archive.html',
})
export class ArchivePage {
  Observations = [];

  constructor(private httpService : HttpService,public navCtrl: NavController) {
    this.getObservations();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArchivePage');
  }
  navigateToSettings(){
    this.navCtrl.push(SettingsPage);
  }
  navigateToCamera(){
    this.navCtrl.push(CameraPage);
  }
  getObservations(){
    this.httpService.getObservations().subscribe(
      data => {
        this.Observations = data.json();
      },
      error => {
        console.log(error.json());
      }
    )
  }
}
