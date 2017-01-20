import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';

@inject(HttpClient)
export class Album {

  constructor(http) {
    this.http = http;
    this.album = {};
  }

  activate(params, config) {
    this.getAlbum(params.id);
  }

  getAlbum(id) {
    this.albumUrl = 'https://api.spotify.com/v1/albums/' + id ;
    return this.http.get(this.albumUrl).then(res => this.album = res.content);
  }
}
