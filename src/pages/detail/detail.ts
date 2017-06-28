import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MapPage} from "../map/map";

/**
 * Generated class for the DetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  Anonce : any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.Anonce = navParams.get('Anonce');
    console.log(this.Anonce.Etablissement);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }
  navigateToMap(){
    this.navCtrl.push(MapPage,{
      Anonce : this.Anonce
    });
  }

}
