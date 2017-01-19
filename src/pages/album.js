import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';

@inject(HttpClient)
export class Album {
  album = {};

  constructor(http) {
    this.http = http;
  }

  activate(params, config) {
    this.getAlbum(params.id);
  }

  getAlbum(id) {
    if (id !== '' ) {
      this.albumUrl = 'https://api.spotify.com/v1/albums/' + id ;
      return this.http.get(this.albumUrl).then(res => {this.album = res.content; console.log(res.content);}  );
    } else {
      this.album = {};
    }
  }
}
