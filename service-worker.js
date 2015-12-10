var version = "2.0::";
var offlineResources = [
	"/css/kendo.common-material.min.css",
	"/css/kendo.material.min.css",
	"/font-awesome/css/font-awesome.min.css",
	"/font-awesome/fonts/fontawesome-webfont.woff2",
	"/css/app.css",
	"/js/jquery.min.js",
	"/js/kendo.custom.min.js",
	"/js/app.js"
];
self.addEventListener("install", function(event) {
	event.waitUntil(
		caches
			.open(version + "static")
			.then(function(cache) {
				console.log("1");
				cache.addAll(offlineResources);
				console.log("2");
			})
	);
});

self.addEventListener("activate", function(event) {
	console.log("3");
	event.waitUntil(
		caches.keys().then(function(keys) {
			return Promise.all(keys
				.filter(function (key) {
					return key.indexOf(version) !== 0;
				})
				.map(function (key) {
					return caches.delete(key);
				})
			);
		})
	);
	console.log("4");
});
