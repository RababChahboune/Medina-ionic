import { Injectable } from '@angular/core';
import {Http, RequestOptions,Headers} from "@angular/http";
import { LocalStorageService } from 'angular-2-local-storage';
import {Observable} from 'rxjs/Rx';
import 'rxjs/Rx';
import {DomSanitizer} from "@angular/platform-browser";

@Injectable()
export class HttpService {
  hostUrl = 'http://192.168.42.183:4040/';
  apiPath = 'api/v1/';
  public User;
  headers = new Headers({ 'content-Type' : 'application/json' });
  options = new RequestOptions({ headers: this.headers });
  constructor(private ds: DomSanitizer,private http: Http,private localStorageService : LocalStorageService) {
    this.options = new RequestOptions({headers: this.headers});
    try{
      this.User = JSON.parse(this.localStorageService.get('User').toString());
    }catch (e){
      this.newUser().subscribe(
        data => {
          this.saveUser(data.json());
        },error => {
          console.log(error)
        }
      )
      console.log("Cannot fetch the admin from storage");
    }
    this.addHeader();
  }
  saveUser(data){
    this.localStorageService.clearAll();
    this.localStorageService.set('User',JSON.stringify(data));
    console.log(JSON.parse(this.localStorageService.get('User').toString()));
    this.addHeader();
    this.User = data;
  }
  getUser(){
    return this.User
  }

  addHeader(){
    try {
      this.headers.delete('Authorization');
      this.headers.append('Authorization', 'Bearer ' + this.User["api_token"]);
    }catch (error){
      console.log("error getting the admin from storage");
    }
  }
  getHost(query){
    this.ds.bypassSecurityTrustResourceUrl(this.hostUrl+this.apiPath+query);
    return this.hostUrl+this.apiPath+query;
  }

  getRubriques(){
    this.addHeader();
    return this.http.get(this.getHost('Rubriques'),this.options)
  }
  getAnonces(){
    this.addHeader();
    return this.http.get(this.getHost('Anonces?include=Etablissement'),this.options)
  }
  sendObservation(Observation){
    return new Promise((resolve, reject) => {
      let xhr:XMLHttpRequest = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(<any>JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      };
      xhr.open('POST', this.getHost("Observations"), true);
      let formData = new FormData();
      formData.append('Image', Observation.Image,"ObservationImage");
      formData.append('coordonneeX', Observation.coordonneeX);
      formData.append('coordonneeY', Observation.coordonneeY);
      formData.append('Utilisateur_id', Observation.Utilisateur_id);
      formData.append('Rubrique_id', Observation.Rubrique_id);
      formData.append('Commentaire', Observation.Commentaire);
      xhr.send(formData);
    });
  }
  getObservations(){
    return this.http.get(this.getHost('Observations?Utilisateur_id='+this.getUser().id),this.options)
  }
  catchError(error:any){
    return Observable.throw(error.json())
  }
  newUser(){
    this.addHeader();
    return this.http.post(this.getHost('Utilisateurs'),{},this.options)
  }

}
