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
				route: "artist/:id",
				href: "artist",
				moduleId: "./pages/artist",
				nav: true,
				title: "Artist"
			}
		]);

		config.mapUnknownRoutes('not-found');
		config.fallbackRoute('spotify');
	}
}
