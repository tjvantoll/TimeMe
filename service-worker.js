var version = "1.0::";
var offlineResources = [
	"/",
	"css/kendo.common-material.min.css",
	"css/kendo.material.min.css",
	"font-awesome/css/font-awesome.min.css",
	"font-awesome/fonts/fontawesome-webfont.woff2",
	"css/app.css",
	"js/jquery.min.js",
	"js/kendo.all.min.js",
	"js/app.js"
];
self.addEventListener("install", function(event) {
	event.waitUntil(
		caches
			.open(version + "static")
			.then(function(cache) {
				cache.addAll(offlineResources);
			})
	);
});

self.addEventListener("activate", function(event) {
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
});

self.addEventListener("fetch", function(event) {
	var request = event.request;
	var url = new URL(request.url);
	event.respondWith(
		caches.match(request)
			.then(function(response) {
				return response || fetch(request);
			})
	);
});
