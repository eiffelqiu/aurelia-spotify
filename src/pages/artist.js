import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';

@inject(HttpClient)
export class Artist {
	constructor(http) {
		this.http = http;
	}

	activate() {
    	
	}
}