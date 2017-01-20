import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';

@inject(HttpClient)
export class Github {

	constructor(http) {
		this.http = http;
    this.searchRes = [];
	}

	activate() {
    this.searchMusic();
	}

	searchMusic() {
    if (this.searchStr !== undefined && this.searchStr !== '' ) {
      this.searchUrl = 'https://api.spotify.com/v1/search?query=' + this.searchStr + '&offset=0&limit=20&type=artist&market=US';
      return this.http.get(this.searchUrl).then(res => this.searchRes = res.content.artists.items);
    } else {
      this.searchRes = [];
    }
  }

}
