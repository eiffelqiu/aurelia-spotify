import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';

@inject(HttpClient)
export class Artist {
	artist = {};
  albums = [];

	constructor(http) {
		this.http = http;
	}

	activate(params, config) {
    this.getArtist(params.id);
    this.getAlbum(params.id);
	}

	getArtist(id) {
    if (id !== '' ) {
      this.artistUrl = 'https://api.spotify.com/v1/artists/' + id;
      return this.http.get(this.artistUrl).then(res => this.artist = res.content );
    } else {
      this.artist = {};
    }
  }

  getAlbum(id) {
    if (id !== '' ) {
      this.albumUrl = 'https://api.spotify.com/v1/artists/' + id + '/albums';
      return this.http.get(this.albumUrl).then(res => this.albums = res.content.items );
    } else {
      this.album = [];
    }
  }
}
