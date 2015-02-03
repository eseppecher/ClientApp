
//initiating db var to make it global
var db;

//filter function to show stars for a numeric rate. SHOULD BE MOUVED TO A FACTORY OR DIRECTIVES
myApp.filter('makeRate', function ($filter) {
             return function (input) {
             if(input === null){ return ''; }
             if(input === 0){ return '<span class="glyphicon glyphicon-thumbs-down"></span>'; }
             if(input === 1){ return '<span class="glyphicon glyphicon-star"></span>'; }
             if(input === 2){ return '<span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span>'; }
             if(input === 3){ return '<span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span>'; }
           
             return "-";
             };
});


// MAIN !! db filled every time app load !!!! ///////////////////////////////////////////////////////////////////////////////
myApp.controller('mainController', function($scope, $location, $webSql) {
                 
    $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
    };
                 
    $scope.notActive = function (viewLocation) {
            return viewLocation === $location.path();
    };
                 
                 
     //WEB SQL filling database
    // reading from html files with json architecture
    var dataSites, dataSectors, dataLines, dataParkings = [];
    $.ajax({ url: 'datas/html/sites.html', type:'get', async:false, success: function(html, $scope) { dataSites = angular.fromJson( String(html)); } });
    $.ajax({ url: 'datas/html/sectors.html', type:'get', async:false, success: function(html, $scope) { dataSectors = angular.fromJson( String(html)); } });
    $.ajax({ url: 'datas/html/lines.html', type:'get', async:false, success: function(html, $scope) { dataLines = angular.fromJson( String(html)); } });
    $.ajax({ url: 'datas/html/parkings.html', type:'get', async:false, success: function(html, $scope) { dataParkings = angular.fromJson( String(html)); } });
    
                 
    db = $webSql.openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024); // opening db
    
    // deleting tables making room for new data and dat architecture
    db.dropTable("sites");
    db.dropTable("sectors");
    db.dropTable("lines");
    db.dropTable("parkings");
               
    // creating tables
    db.createTable('sites', { "id":{"type":"INTEGER"},"name":{ "type": "TEXT"}, "description": { "type": "TEXT"}, "tags": { "type": "TEXT"}, "couverture": { "type": "TEXT" }, "latitude": { "type": "TEXT" }, "longitude": { "type": "TEXT" }, "volume": { "type": "INTEGER" } });
    
    db.createTable('sectors', { "id":{"type":"INTEGER"},"name":{ "type": "TEXT"}, "latitude": { "type": "TEXT" }, "longitude": { "type": "TEXT" }, "approach": { "type": "TEXT" }, "volume": { "type": "INTEGER" }, "site": { "type": "INTEGER" } });
                 
    db.createTable('lines', { "id":{"type":"INTEGER"},"name":{ "type": "TEXT"}, "grade": { "type": "TEXT" }, "rate": { "type": "INTEGER" }, "latitude": { "type": "TEXT" }, "longitude": { "type": "TEXT" }, "description": { "type": "TEXT" }, "image": { "type": "TEXT" }, "site": { "type": "INTEGER" }, "sector": { "type": "INTEGER" } });
    db.createTable('parkings', { "id":{"type":"INTEGER"}, "latitude": { "type": "TEXT" }, "longitude": { "type": "TEXT" }, "site": { "type": "INTEGER" } });
    

    // filling tables with data
                 
    for(var i=0; i< dataSites.length; i++){
        db.insert('sites', {"id": dataSites[i].id, "name": dataSites[i].name, "description": dataSites[i].description, "tags": dataSites[i].tags, "couverture": dataSites[i].couverture, "latitude": dataSites[i].latitude, "longitude": dataSites[i].longitude, "volume": dataSites[i].volume}).then(function(results) { console.log(results.insertId); });
    }
    for(var i=0; i< dataSectors.length; i++){
        db.insert('sectors', {"id": dataSectors[i].id, "name": dataSectors[i].name, "latitude": dataSectors[i].latitude, "longitude": dataSectors[i].longitude, "approach": dataSectors[i].approach, "volume": dataSectors[i].volume, "site": dataSectors[i].site}).then(function(results) { console.log(results.insertId); });
    }
    //WTF ??????
    var draft = "";
    for(var i=0; i< dataLines.length; i++){
        if(dataLines[i].description===""){draft="Pas de description.";}else{draft=dataLines[i].description}
        db.insert('lines', {"id": dataLines[i].id, "name": dataLines[i].name, "grade": dataLines[i].grade, "rate": dataLines[i].rate, "latitude": dataLines[i].latitude, "longitude": dataLines[i].longitude, "description": draft, "image": dataLines[i].image, "site": dataLines[i].site, "sector": dataLines[i].sector}).then(function(results) { console.log(results.insertId); });
    }
    for(var i=0; i< dataParkings.length; i++){
        db.insert('parkings', {"id": dataParkings[i].id, "latitude": dataParkings[i].latitude, "longitude": dataParkings[i].longitude, "site": dataParkings[i].site}).then(function(results) { console.log(results.insertId); });
    }

                 
});



// SITE LIST current home page of the app ///////////////////////////////////////////////////////////////////////////////
myApp.controller('SiteListCtrl', function($scope, $location, $webSql) {

    db.selectAll("sites").then(function(results) {
        $scope.sites = [];
        for(i=0; i < results.rows.length; i++){
                $scope.sites.push(results.rows.item(i));
        }
    });
	
	$scope.detail = function(siteId) {
		$location.path('/site/' + siteId);
	};
});


// DETAIL SITE ////////////////////////////////////////////////////////////////////////////////////////
myApp.controller('SiteDetailCtrl', function($scope, $routeParams, $location, $webSql) {
    
    $scope.map = { center: { latitude: 0, longitude: 0 }, zoom: 16 };
	id = parseInt($routeParams.siteId);
    var sita;
    $scope.site = {};
    db.select("sites", { "id": { "value": id}}).then(function(results) { $scope.site = results.rows.item(0);

	sita = results.rows.item(0);
                 
	/* Get child sector */
    $scope.sectors = [];
    db.select("sectors",{"site":{"value":id}}).then(function(results) {
      for(var i=0; i < results.rows.length; i++){
            $scope.sectors.push(results.rows.item(i));
        }
    
                 
    /* Get child parkings */
    $scope.parkings = [];
    $scope.map = {};
    db.selectAll("parkings").then(function(results) {
                
                for(var i=0; i < results.rows.length; i++){
                        $scope.parkings.push(results.rows.item(i));
                };
    
    makeMap();
    });
    }); // sector
    }); // site
    
                 
                 
    makeMap = function() {
        $scope.map = { center: { latitude: sita.latitude, longitude: sita.longitude }, zoom: 16 };
        $scope.mapState = true;
    };
                 
    $scope.lineList = function(siteId,sectorId) {
            $location.path('/site/' + siteId + '/sector/' + sectorId);
    };
});


// SECTOR both list or map display/////////////////////////////////////////////////////////////////////
myApp.controller('SectorCtrl', function($scope, $routeParams, $location, $filter, $webSql) {
    $scope.map = { center: { latitude: 0, longitude: 0 }, zoom: 16 };
    id = parseInt($routeParams.siteId);
    idd = parseInt($routeParams.sectorId);

    var sita;
    
    $scope.currency = idd;
                 
    $filtering = function(items,x) {
        $result = [];
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if(item.sector === x) { $result.push(item); }
        }
        return $result;
    };
                 
    $scope.site = {};
    $scope.list = [];
    $scope.lines = [];
    $scope.sectors = [];
    db.select("sites", { "id": { "value": id}}).then(function(results) {
        $scope.site = results.rows.item(0);
        sita = results.rows.item(0);
                     
    /* Get child sector */
    db.select("sectors",{"site":{"value":id}}).then(function(results) {
        for(var i=0; i < results.rows.length; i++){
            $scope.sectors.push(results.rows.item(i));
        }
    
    
    /* Get child line */
    db.select("lines",{"site":{"value":id}}).then(function(results) {
        for(var i=0; i < results.rows.length; i++){
            $scope.list.push(results.rows.item(i));
            if(results.rows.item(i).sector == idd){
                $scope.lines.push(results.rows.item(i));
            }
        }
                                                  
    makeMap();
    });
    });
    });
                 
    $scope.select = function(xid) {
        if(xid === 0){
            $scope.current = { "id":0,"name": "Toutes les voies"};
            $scope.lines = $scope.list;
        }
        else{
            $scope.current = {};
            db.select("sectors", { "id": { "value": xid}}).then(function(results) { $scope.current = results.rows.item(0);});
            $scope.lines = $filtering($scope.list,xid);
        }
    };

                
                 
    makeMap = function() {
        $scope.map = { center: { latitude: sita.latitude, longitude: sita.longitude }, zoom: 16 };
        $scope.mapState = true;
    };
                 
    $scope.maping = function(siteId,sectorId) {
        $location.path('/site/' + siteId + '/map/' + sectorId);
    };
    $scope.listing = function(siteId,sectorId) {
        $location.path('/site/' + siteId + '/sector/' + sectorId);
    };
    $scope.detail = function(lineId) {
        $location.path('/line/' + lineId);
    };
    $scope.back = function(siteId) {
        $location.path('/site/' + siteId);
    };
                 
                 
});


// !!!!!!!! DETAIL 2 carousel style !!!!!!!!!!!!!!/////////////////////////////////////////////////////////////////////////////////
myApp.controller('LineDetailCtrl-carousel', function($scope, $routeParams, $location, $webSql, $filter, $swipe, $ngSwipeLeft) {
    
    id = parseInt($routeParams.sectorId);
                 alert(id);
                 
    $scope.lines = [];
    db.select("lines", { "sector": { "value": id}}).then(function(results) {
                for(var i=0; i < results.rows.length; i++){
                    $scope.lines.push(results.rows.item(i));
                }
    });
                 
                 $scope.backSector = function(siteId,sectorId) {
                 $location.path('/site/' + siteId + '/sector/' + sectorId);
                 };
                 
                 $scope.previous = function(lineId) {
                 var x = lineId-1;
                 $location.path('/line/' + x);
                 };
                 
                 
                 $scope.next = function(lineId) {
                 var x = lineId+1;
                 $location.path('/line/' + x);
                 };
                 
});



// LINE DETAIL, wonder on change to carousel for a better swipe experience/////////////////////////////
myApp.controller('LineDetailCtrl', function($scope, $routeParams, $location, $webSql, $filter, $swipe, $ngSwipeLeft) {
	id = parseInt($routeParams.lineId);
    
                 
    $scope.line = {};
    db.select("lines", { "id": { "value": id}}).then(function(results) { $scope.line = results.rows.item(0); });

    $scope.backSector = function(siteId,sectorId) {
            $location.path('/site/' + siteId + '/sector/' + sectorId);
    };
                 
    $scope.previous = function(lineId) {
            var x = lineId-1;
            $location.path('/line/' + x);
    };
                 
                 
    $scope.next = function(lineId) {
            var x = lineId+1;
            $location.path('/line/' + x);
    };
	                     
});
    

// SEARCH ///////////////////////////////////////////////////////////////////////////////////////////////////////////
myApp.controller('searchCtrl', function($scope, $location) {
                 
    $scope.activeType = "all";
    $scope.setSearchType = function (activeType) {
                 $scope.activeType = activeType;
    };
                 
    
    $scope.search = function(input){
        var inputLarge = '%%%%%%%%%%%%%%%%%%' + input + '%%%%%%%%%%%%%%%%%%%%';
        $scope.resultings = [];
                 
        // search char in larger char
        if($scope.activeType !== 'sites' ){
            db.select("lines", { "name": { "operator":'LIKE', "value": inputLarge}}).then(function(results) {
                for(var i=0; i < results.rows.length; i++){
                    $scope.resultings.push(results.rows.item(i));
                }
            });
                                                                                         
            // search approximate char
            for(var i=0; i<input.length; i++){
                var stringy = '%%%%%%%%%%%%%%%%%%' + input.substr(0,i) + "_" + input.substr(i+1,input.length) + '%%%%%%%%%%%%%%%%%%%%';
                                                                                         
                db.select("lines", { "name": { "operator":'LIKE', "value": stringy}}).then(function(results) {
                    for(var i=0; i < results.rows.length; i++){
                        var doublon = false;
                        // avoiding doublon
                        for(var j=0;j<$scope.resultings.length;j++){
                            if($scope.resultings[j].id===results.rows.item(i).id){
                                doublon = true;
                            }
                        }
                        if(doublon===false){$scope.resultings.push(results.rows.item(i));}
                    }
                });
            }
        }
                 
                 
                 
        if($scope.activeType !== 'lines' ){
            db.select("sites", { "name": { "operator":'LIKE', "value": inputLarge}}).then(function(results) {
                for(var i=0; i < results.rows.length; i++){
                    $scope.resultings.push(results.rows.item(i));
                }
            });
                 
            // search approximate char
            for(var i=0; i<input.length; i++){
                var stringy = '%%%%%%%%%%%%%%%%%%' + input.substr(0,i) + "_" + input.substr(i+1,input.length) + '%%%%%%%%%%%%%%%%%%%%';
                 
                db.select("sites", { "name": { "operator":'LIKE', "value": stringy}}).then(function(results) {
                    for(var i=0; i < results.rows.length; i++){
                        var doublon = false;
                        // avoiding doublon
                        for(var j=0;j<$scope.resultings.length;j++){
                            if($scope.resultings[j].id===results.rows.item(i).id){ doublon = true; }
                        }
                        if(doublon===false){$scope.resultings.push(results.rows.item(i));}
                    }
                });
            }
        }

    }
   
                 
    //to reach the item
    $scope.detailSite = function(siteId) { $location.path('/site/' + siteId); };
    $scope.detailLine = function(lineId) { $location.path('/line/' + lineId); };
});


// No controler required. In html content
myApp.controller('aboutCtrl', function($scope, $rootScope) {
	$scope.title	= 'A propos';
	$scope.message	= 'Help page';
	
});