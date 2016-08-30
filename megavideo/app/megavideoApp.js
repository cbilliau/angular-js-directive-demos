angular.module('megaVideoDemo', []).

// Steps
	// Register a directive called megaVideo
	directive('megaVideo', function($sce) {
		return {
			// set directive to element
			restrict: 'E',
			// set template to the url
			templateUrl: 'mega-video.html',
			// Ceate what's called a new scope so each instance of the directive in a given controller (or in rootScope) will get its own copy of the parent scope, which it can manipulate without effecting the others.
			scope: true,

			// Link function
			// Set the scope variables required by the directive template with link
			link: function(scope, element, attrs) {
				// initialize an empty array of sources
				scope.sources = [];

				// whitelist of video formats accepted
				// Looks for white-listed video source types in the directive element's attributes and adds them to scope.sources
				function processSources() {
					var sourceTypes = {
						webm: { type: 'video/webm'},
						mp4: { type: 'video/mp4'},
						ogg: { type: 'video/ogg'}
						// etc...
					}
					for (source in sourceTypes) {
						if (attrs.hasOwnProperty(source)) {
							scope.sources.push(
								{ type: sourceTypes[source].type,
								  src:
									// you are making a cross origin resource request, and as a security default, Angular disables ng-src values that are cross origin. (Recall that you're setting ng-src=source.src in index.html) The way to get around this is by adding the source.src url to the list of trusted cross origin URLs.
									$sce.trustAsResourceUrl(attrs[source])
								}
							);
						}
					}
				}
				processSources();
			}

		}
	});
