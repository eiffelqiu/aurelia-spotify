import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';

@inject(HttpClient)
export class Artist {

	constructor(http) {
		this.http = http;
    this.artist = {};
    this.albums = [];
	}

	activate(params, config) {
    this.getArtist(params.id);
    this.getAlbums(params.id);
	}

	getArtist(id) {
    if (id !== '' ) {
      this.artistUrl = 'https://api.spotify.com/v1/artists/' + id;
      return this.http.get(this.artistUrl).then(res => this.artist = res.content );
    } else {
      this.artist = {};
    }
  }

  getAlbums(id) {
    if (id !== '' ) {
      this.albumsUrl = 'https://api.spotify.com/v1/artists/' + id + '/albums';
      return this.http.get(this.albumsUrl).then(res => this.albums = res.content.items );
    } else {
      this.albums = [];
    }
  }
}
