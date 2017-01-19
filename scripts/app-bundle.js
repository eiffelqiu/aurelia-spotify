define('app',["exports"], function (exports) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var App = exports.App = function () {
		function App() {
			_classCallCheck(this, App);
		}

		App.prototype.configureRouter = function configureRouter(config, router) {
			this.router = router;

			config.map([{
				route: ["", "spotify"],
				moduleId: "./pages/spotify",
				nav: true,
				title: "Aurelia Spotify"
			}, {
				route: "about",
				moduleId: "./pages/about",
				nav: true,
				title: "About"
			}, {
				route: "artist",
				name: "artist",
				moduleId: "./pages/artist",
				nav: true,
				title: "Artist"
			}, {
				route: "album",
				name: "album",
				moduleId: "./pages/album",
				nav: true,
				title: "Album"
			}]);

			config.fallbackRoute('spotify');
		};

		return App;
	}();
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  Promise.config({
    longStackTraces: _environment2.default.debug,
    warnings: {
      wForgottenReturn: false
    }
  });

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('pages/about',["exports"], function (exports) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var About = exports.About = function About() {
		_classCallCheck(this, About);
	};
});
define('pages/album',['exports', 'aurelia-framework', 'aurelia-http-client'], function (exports, _aureliaFramework, _aureliaHttpClient) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Album = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Album = exports.Album = (_dec = (0, _aureliaFramework.inject)(_aureliaHttpClient.HttpClient), _dec(_class = function () {
    function Album(http) {
      _classCallCheck(this, Album);

      this.album = {};

      this.http = http;
    }

    Album.prototype.activate = function activate(params, config) {
      this.getAlbum(params.id);
    };

    Album.prototype.getAlbum = function getAlbum(id) {
      var _this = this;

      if (id !== '') {
        this.albumUrl = 'https://api.spotify.com/v1/albums/' + id;
        return this.http.get(this.albumUrl).then(function (res) {
          _this.album = res.content;console.log(res.content);
        });
      } else {
        this.album = {};
      }
    };

    return Album;
  }()) || _class);
});
define('pages/artist',['exports', 'aurelia-framework', 'aurelia-http-client'], function (exports, _aureliaFramework, _aureliaHttpClient) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Artist = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Artist = exports.Artist = (_dec = (0, _aureliaFramework.inject)(_aureliaHttpClient.HttpClient), _dec(_class = function () {
    function Artist(http) {
      _classCallCheck(this, Artist);

      this.artist = {};
      this.albums = [];

      this.http = http;
    }

    Artist.prototype.activate = function activate(params, config) {
      this.getArtist(params.id);
      this.getAlbums(params.id);
    };

    Artist.prototype.getArtist = function getArtist(id) {
      var _this = this;

      if (id !== '') {
        this.artistUrl = 'https://api.spotify.com/v1/artists/' + id;
        return this.http.get(this.artistUrl).then(function (res) {
          return _this.artist = res.content;
        });
      } else {
        this.artist = {};
      }
    };

    Artist.prototype.getAlbums = function getAlbums(id) {
      var _this2 = this;

      if (id !== '') {
        this.albumsUrl = 'https://api.spotify.com/v1/artists/' + id + '/albums';
        return this.http.get(this.albumsUrl).then(function (res) {
          return _this2.albums = res.content.items;
        });
      } else {
        this.albums = [];
      }
    };

    return Artist;
  }()) || _class);
});
define('pages/menu',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Menu = undefined;

	function _initDefineProp(target, property, descriptor, context) {
		if (!descriptor) return;
		Object.defineProperty(target, property, {
			enumerable: descriptor.enumerable,
			configurable: descriptor.configurable,
			writable: descriptor.writable,
			value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
		});
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
		var desc = {};
		Object['ke' + 'ys'](descriptor).forEach(function (key) {
			desc[key] = descriptor[key];
		});
		desc.enumerable = !!desc.enumerable;
		desc.configurable = !!desc.configurable;

		if ('value' in desc || desc.initializer) {
			desc.writable = true;
		}

		desc = decorators.slice().reverse().reduce(function (desc, decorator) {
			return decorator(target, property, desc) || desc;
		}, desc);

		if (context && desc.initializer !== void 0) {
			desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
			desc.initializer = undefined;
		}

		if (desc.initializer === void 0) {
			Object['define' + 'Property'](target, property, desc);
			desc = null;
		}

		return desc;
	}

	function _initializerWarningHelper(descriptor, context) {
		throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
	}

	var _desc, _value, _class, _descriptor;

	var Menu = exports.Menu = (_class = function Menu() {
		_classCallCheck(this, Menu);

		_initDefineProp(this, 'router', _descriptor, this);
	}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'router', [_aureliaFramework.bindable], {
		enumerable: true,
		initializer: function initializer() {
			return null;
		}
	})), _class);
});
define('pages/spotify',['exports', 'aurelia-framework', 'aurelia-http-client'], function (exports, _aureliaFramework, _aureliaHttpClient) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Github = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Github = exports.Github = (_dec = (0, _aureliaFramework.inject)(_aureliaHttpClient.HttpClient), _dec(_class = function () {
    function Github(http) {
      _classCallCheck(this, Github);

      this.searchRes = [];

      this.http = http;
    }

    Github.prototype.activate = function activate() {
      this.searchMusic();
    };

    Github.prototype.searchMusic = function searchMusic() {
      var _this = this;

      if (this.searchStr !== undefined && this.searchStr !== '') {
        this.searchUrl = 'https://api.spotify.com/v1/search?query=' + this.searchStr + '&offset=0&limit=20&type=artist&market=US';
        return this.http.get(this.searchUrl).then(function (res) {
          return _this.searchRes = res.content.artists.items;
        });
      } else {
        this.searchRes = [];
      }
    };

    return Github;
  }()) || _class);
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n\t<require from=\"app.css\"></require>\n\t<require from=\"./pages/menu\"></require>\n\t<menu router.bind=\"router\" containerless></menu>\n  \t<div class=\"container\">\n    \t<router-view></router-view>\n\t</div>\n</template>\n"; });
define('text!app.css', ['module'], function(module) { module.exports = "body {\n  border-bottom: #333 ipx solid;\n  padding: 0px;\n}\n\n.artist-header {\n  border-bottom: 20px;\n  margin-bottom: 20px;\n  border-bottom: solid 1px #333\n}\n\n.artist-thumb {\n\twidth: 80px;\n\theight: auto;\n\tfloat: left;\n\tmargin-right:10px;\n}\n\n.artist-albums .well {\n  margin-bottom: 20px;\n  overflow: auto;\n  min-height: 400px;\n}\n\n.album {\n  text-align: left;\n  background: #333;\n  padding: 10px 20px;\n  border: #666 1px solid;\n}\n\n.album-thumb {\n  width: 100%;\n}\n"; });
define('text!pages/about.html', ['module'], function(module) { module.exports = "<template>\n\t<h4>This page was built with Aurelia for demo purpose.</h4>\n  \t<a class=\"btn btn-danger\" href=\"http://github.com/eiffelqiu\">Eiffel' Github</a>\n</template>\n"; });
define('text!pages/album.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"album\" if.bind=\"album\">\n      <header class=\"album-header\">\n        <div class=\"row\">\n          <div class=\"col-md-4\">\n            <img class=\"album-thumb\" src=\"${album.images[0].url}\">\n          </div>\n          <div class=\"col-md-8\">\n            <h4 if.bind=\"album.artist.length > 0\">\n              <span repeat.for=\"artist of album.artists\">\n                ${artist.name}\n              </span>\n            </h4>\n            <h2>${album.name}</h2>\n            <h5>Release Date: ${album.release_date}</h5>\n            <a href=\"${album.external_urls.spotify}\" class=\"btn btn-primary\" target=\"_blank\">View in Spotify</a>\n          </div>\n        </div>\n      </header>\n      <div class=\"album-tracks\">\n        <h2>Album Tracks</h2>\n        <div repeat.for=\"track of album.tracks.items\">\n          <div class=\"well\">\n            <h5>${track.track_number} -  ${track.name}</h5>\n            <a href=\"${track.preview_url}\" target=\"_blank\">Preview Track</a>\n          </div>\n        </div>\n      </div>\n  </div>\n</template>\n"; });
define('text!pages/artist.html', ['module'], function(module) { module.exports = "<template>\n  <header class=\"artist-header\">\n    <div if.bind=\"artist.images.length > 0\">\n      <img class=\"artist-thumb img-circle\" src=\"${artist.images[0].url}\"/>\n    </div>\n    <h1>${artist.name}</h1>\n    <div if.bind=\"artist.genres.length > 0\">\n      Genres: <span repeat.for=\"genre of artist.genres\">${genre}</span>\n    </div>\n  </header>\n\n  <div class=\"artist-albums\">\n    <div class=\"row\">\n      <div repeat.for=\"album of albums\">\n        <div class=\"col-md-3\">\n          <div class=\"album well\">\n            <img src=\"${album.images[0].url}\" alt=\"${album.name}\" class=\"album-thumb img-thumbnail\">\n            <h4>${album.name}</h4>\n            <a route-href=\"route:album;params.bind:{ id: album.id }\" class=\"btn btn-default btn-block\">Album Details</a>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</template>\n"; });
define('text!pages/menu.html', ['module'], function(module) { module.exports = "<template>\n    <nav class=\"navbar navbar-inverse\">\n      <div class=\"container\">\n        <div class=\"navbar-header\">\n          <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navbar\" aria-expanded=\"false\" aria-controls=\"navbar\">\n            <span class=\"sr-only\">Toggle navigation</span>\n            <span class=\"icon-bar\"></span>\n            <span class=\"icon-bar\"></span>\n            <span class=\"icon-bar\"></span>\n          </button>\n        </div>\n        <div id=\"navbar\" class=\"collapse navbar-collapse\">\n          <ul class=\"nav navbar-nav\">\n            <li><a href=\"#/\">Aurelia Spotify</a></li>\n            <li><a href=\"#/about\">About</a></li>\n          </ul>\n        </div>\n      </div>\n    </nav>\n</template>\n"; });
define('text!pages/spotify.html', ['module'], function(module) { module.exports = "<template>\n\n  <h1>Need Music?</h1>\n  <p class=\"lead\">Use the Aurelia-Spotify app to browse new releases and find your favorite songs.</p>\n\n  <form>\n      <div class=\"row\">\n        <div class=\"col-md-12 \">\n          <input type=\"text\" class=\"form-control col-md-3\" placeholder=\"Search Artists...\"\n                 name=\"searchStr\" value.bind=\"searchStr\" keyup.trigger=\"searchMusic()\">\n        </div>\n      </div>\n  </form> \n\n  <hr/>\n  <div repeat.for=\"artist of searchRes\">\n    <div class=\"row well\">\n      <div class=\"col-md-12\">\n        <h4><a route-href=\"route:artist;params.bind:{ id: artist.id }\">${artist.name}</a></h4>\n        <div>\n          <strong>Genres: </strong>\n          <span repeat.for=\"genre of artist.genres\"> ${genre}</span>\n        </div>\n      </div>\n    </div>\n  </div>\n\n</template>"; });
//# sourceMappingURL=app-bundle.js.map