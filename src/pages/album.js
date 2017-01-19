import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';

@inject(HttpClient)
export class Album {
  albums = {};

  constructor(http) {
    this.http = http;
  }

  activate(params, config) {
    this.getAlbum(params.id);
  }

  getAlbum(id) {
    if (id !== '' ) {
      this.albumUrl = 'https://api.spotify.com/v1/artists/' + id + '/albums';
      return this.http.get(this.albumUrl).then(res => this.albums = res.content.items );
    } else {
      this.album = {};
    }
  }
}
