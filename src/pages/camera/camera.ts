import {Component, ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SettingsPage} from "../settings/settings";
import { Geolocation } from '@ionic-native/geolocation';
import {Camera} from "@ionic-native/camera";


/**
 * Generated class for the CameraPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html',
})
export class CameraPage {
  public base64Image: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,public element:ElementRef,
              private geolocation: Geolocation,private camera : Camera) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CameraPage');
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
  navigateToSettings(){
    console.log("Seeting nav");
    this.navCtrl.push(SettingsPage);
  }
  takePicture(){
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000
    }).then((imageData) => {
      this.base64Image = "data:image/jpeg;base64," + imageData;
    }, (err) => {
      console.log(err);
    });
  }

}
