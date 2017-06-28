import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {SettingsPage} from "../settings/settings";
import {DetailPage} from "../detail/detail";
import {MapPage} from "../map/map";
import {HttpService} from "../../app/http.service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  Anonces = [];

  constructor(private httpService : HttpService,public navCtrl: NavController) {
    this.getAnonces();
  }
  navigateToSettings(){
    this.navCtrl.push(SettingsPage);
  }
  navigateToDetails(anonce){
    this.navCtrl.push(DetailPage, {
      Anonce : anonce,
    });
  }
  navigateToMap(){
    this.navCtrl.push(MapPage);
  }
  getAnonces(){
    this.httpService.getAnonces().subscribe(
      data => {
        this.Anonces = data.json();
      },
      error => {
        console.log(error.json());
      }
    )
  }
  refresh(refresher){
    this.getAnonces();
    refresher.complete();
  }

}
