import {Component, ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SettingsPage} from "../settings/settings";
import { Geolocation } from '@ionic-native/geolocation';
import {Camera} from "@ionic-native/camera";
import {HttpService} from "../../app/http.service";
import {FormControl, FormGroup} from "@angular/forms";
import {ArchivePage} from "../archive/archive";


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
    console.log("Send Image");
    /*let block = this.ObservationImage.split(";");
    let contentType = block[0].split(":")[1];
    let realData = block[1].split(",")[1];
    let blob = this.b64toBlob(realData, contentType, 512);
    let Observation = {
      Commentaire  : this.cameraForm.getRawValue().Commentaire,
      coordonneeX  : 33.6,
      coordonneeY  : 6.6,
      Rubrique_id  : this.cameraForm.getRawValue().Rubrique_id,
      Utilisateur_id  : this.httpService.getUser().id,
      Image : blob,
    };
    this.httpService.sendObservation(Observation).then(
      response => {
        console.log(response);
        this.navCtrl.push(ArchivePage);
      }).catch(e => {
      console.log(e);
      this.navCtrl.push(ArchivePage);
    });*/

    this.geolocation.getCurrentPosition().then((resp) => {
        this.lat = resp.coords.latitude;
        this.lng = resp.coords.longitude;
        console.log("Coords : " + this.lat+","+this.lng);
        let block = this.ObservationImage.split(";");
        let contentType = block[0].split(":")[1];
        let realData = block[1].split(",")[1];
        let blob = this.b64toBlob(realData, contentType, 512);
        let Observation = {
          Commentaire  : this.cameraForm.getRawValue().Commentaire,
          coordonneeX  : this.lat,
          coordonneeY  : this.lng,
          Rubrique_id  : this.cameraForm.getRawValue().Rubrique_id,
          Utilisateur_id  : this.httpService.getUser().id,
          Image : blob,
        };
        this.httpService.sendObservation(Observation).then(
        response => {
          console.log(response);
          this.navCtrl.push(ArchivePage);
        }).catch(e => {
          console.log(e);
          this.navCtrl.push(ArchivePage);
        });
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
  b64toBlob(b64Data, contentType, sliceSize) {
  contentType = contentType || '';
  sliceSize = sliceSize || 512;

  let byteCharacters = atob(b64Data);
  let byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    let slice = byteCharacters.slice(offset, offset + sliceSize);

    let byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    let byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  let blob = new Blob(byteArrays, {type: contentType});
  return blob;
}

}
