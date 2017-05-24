import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {SettingsPage} from "../settings/settings";
import {DetailPage} from "../detail/detail";
import {MapPage} from "../map/map";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }
  navigateToSettings(){
    console.log("Seeting nav");
    this.navCtrl.push(SettingsPage);
  }
  navigateToDetails(){
    this.navCtrl.push(DetailPage);
  }
  navigateToMap(){
    this.navCtrl.push(MapPage);
  }

}
