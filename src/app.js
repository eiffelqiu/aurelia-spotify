export class App {
	configureRouter(config, router) {
		this.router = router;

		config.map([
			{
				route: ["","spotify"],
				moduleId: "./pages/spotify",
				nav: true,
				title: "Aurelia Spotify"
			},
			{
				route: "about",
				moduleId: "./pages/about",
				nav: true,
				title: "About"
			},
			{
				route: "artist",
				name: "artist",
				moduleId: "./pages/artist",
				nav: true,
				title: "Artist"
			},
      {
        route: "album",
        name: "album",
        moduleId: "./pages/album",
        nav: true,
        title: "Album"
      }
		]);

		config.fallbackRoute('spotify');
	}
}
