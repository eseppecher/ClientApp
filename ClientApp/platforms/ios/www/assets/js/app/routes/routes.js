//Routing
myApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
	$locationProvider.html5Mode(false);
	
	$routeProvider
		.when('/', {
			templateUrl: 'partials/default.html',
			controller	: 'mainController'
		})
		.when('/sites', {
			templateUrl: 'partials/site/list.html',
			controller  : 'SiteListCtrl'
		})
		.when('/site/:siteId', {
			templateUrl: 'partials/site/detail.html',
			controller: 'SiteDetailCtrl'
		})
        .when('/site/:siteId/sector/:sectorId', {
            templateUrl: 'partials/site/sector.html',
            controller: 'SectorCtrl'
        })
        .when('/site/:siteId/map/:sectorId', {
            templateUrl: 'partials/site/map.html',
            controller: 'SectorCtrl'
            })
		.when('/lines', {
			templateUrl: 'partials/line/list.html',
			controller  : 'LineListCtrl'
		})
		.when('/line/:lineId', {
			templateUrl : 'partials/line/detail.html',
			controller  : 'LineDetailCtrl'
		})
        .when('/photo', {
            templateUrl: 'partials/photo.html',
            controller  : 'photoCtrl'
        })
        .when('/search', {
                    templateUrl: 'partials/search.html',
                    controller  : 'searchCtrl'
        })
		.when('/about', {
			templateUrl: 'partials/about.html',
			controller  : 'aboutCtrl'
		})
		.otherwise({
			redirectTo: '/',
			controller	: 'mainController'
		});
}]);
