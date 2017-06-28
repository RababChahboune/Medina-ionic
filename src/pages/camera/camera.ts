import {Component, ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SettingsPage} from "../settings/settings";
import { Geolocation } from '@ionic-native/geolocation';
import {Camera} from "@ionic-native/camera";
import {HttpService} from "../../app/http.service";
import {FormControl, FormGroup} from "@angular/forms";


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
  public ObservationImage: string = null;
  public lat : any;
  public lng : any;
  Rubriques = [];
  cameraForm : FormGroup;

  constructor(private httpService : HttpService,public navCtrl: NavController, public navParams: NavParams,public element:ElementRef, private geolocation: Geolocation,private camera : Camera) {
    this.getRubriques();
    this.cameraForm = new FormGroup({
      'Commentaire' : new FormControl(),
      'Rubrique_id' : new FormControl(),
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CameraPage');

  }
  navigateToSettings(){
    console.log("Seeting nav");
    this.navCtrl.push(SettingsPage);
  }
  takePicture(){
    console.log("Take Picture");
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000
    }).then((imageData) => {
      this.ObservationImage = "data:image/jpeg;base64," + imageData;
    }, (err) => {
      console.log(err);
    });
  }
  sendImage(){
      this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
      let Observation = {
         Commentaire  : this.cameraForm.getRawValue().Commentaire,
         coordonneeX  : this.lat,
         coordonneeY  : this.lng,
         Rubrique_id  : this.cameraForm.getRawValue().Rubrique_id,
         Utilisateur_id  : this.httpService.getUser().id,
         Image : this.ObservationImage,
      }
      this.httpService.sendObservation(Observation).subscribe(
        data => {
          console.log(data);
        },error=>{
          console.log(error);
        }
      );
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
  getRubriques(){
    this.httpService.getRubriques().subscribe(
      data => {
        console.log(data.json());
        this.Rubriques = data.json();
      },
      error => {
        console.log(error.json());
      }
    )
  }

}
