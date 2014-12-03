
/* Routing : APP Origin is set in the file config.xml */

myApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
	$locationProvider.html5Mode(false);
	
	$routeProvider
		.when('/', { // MAIN ctrl at the app root
			templateUrl: 'partials/default.html',
			controller	: 'mainController'
		})
              
		.when('/sites', { //SITES LIST
			templateUrl: 'partials/site/list.html',
			controller  : 'SiteListCtrl'
		})
              
		.when('/site/:siteId', { //SITE DETAIL with id transfer through URL
			templateUrl: 'partials/site/detail.html',
			controller: 'SiteDetailCtrl'
		})
              
        .when('/site/:siteId/sector/:sectorId', { //SECTOR-list DETAIL with id transfer through URL
            templateUrl: 'partials/sector/list.html',
            controller: 'SectorCtrl'
        })
              
        .when('/site/:siteId/map/:sectorId', { //SECTOR-map DETAIL with id transfer through URL
            templateUrl: 'partials/sector/map.html',
            controller: 'SectorCtrl'
        })

		.when('/line/:lineId', { // LINE DETAIL with id transfer through URL
			templateUrl : 'partials/line/detail.html',
			controller  : 'LineDetailCtrl'
		})

        .when('/search', { // SEARCH
                    templateUrl: 'partials/search.html',
                    controller  : 'searchCtrl'
        })
              
		.when('/about', { //ABOUT
			templateUrl: 'partials/about.html',
			controller  : 'aboutCtrl'
		})
              
              
              
              
		.otherwise({ // if no url match in the route file go to
			redirectTo: '/',
			controller	: 'mainController'
		});
}]);
