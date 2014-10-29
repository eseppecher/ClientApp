///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////   MANAGING SPECIAL CHARCTERS / GRADE / RATE        //////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    function myEncode(str){return encodeURIComponent(str).replace(/\'/g, "%2B");}
    function myDecode(str){ return decodeURIComponent(str.replace("%2B", "'"));}
    
    var frenchGrade = [["3a",1],["3b",3],["3c",5],["4a",7],["4b",9],["4c",11],["5a",13],["5a+",14],["5b",15],["5b+",16],["5c",17],["5c+",18],["6a",19],["6a+",20],["6b",21],["6b+",22],
    	["6c",23],["6c+",24],["7a",25],["7a+",26],["7b",27],["7b+",28],["7c",29],["7c+",30],["8a",31],["8a+",32],["8b",33],["8b+",34],["8c",35],["8c+",36],["9a",37],["9a+",38],["9b",39],["9b+",40],["projet",0]];
    
    function fgradeCode(str){for(var i=0;i< frenchGrade.length;i++){if(str==frenchGrade[i][0]){return frenchGrade[i][1];}}}
    function fgradeDecode(nb){for(var i=0;i< frenchGrade.length;i++){if(nb==frenchGrade[i][1]){return frenchGrade[i][0];}}}
    
    var rateList = [["",-1],["<span class='glyphicon glyphicon-thumbs-down'></span>",0],["<span class='glyphicon glyphicon-star'></span>",1],
    	["<span class='glyphicon glyphicon-star'></span><span class='glyphicon glyphicon-star'></span>",2],
    	["<span class='glyphicon glyphicon-star'></span><span class='glyphicon glyphicon-star'></span><span class='glyphicon glyphicon-star'></span>",3]];
    	
    function rateDecode(nb){ for(var i=0;i< rateList.length;i++){if(nb==rateList[i][1]){return rateList[i][0];}}}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////     (RE)CREATING THE TABLES        ///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

   function createSites(tx) {
         tx.executeSql('DROP TABLE IF EXISTS sites');        
         tx.executeSql('CREATE TABLE IF NOT EXISTS sites (name varchar(255), slug varchar(255), abstract varchar(255), latitude float, longitude float, altitude float, linenb int, histo varchar(255))');
    }
    
    function createParkings(tx) {
         tx.executeSql('DROP TABLE IF EXISTS parkings');        
         tx.executeSql('CREATE TABLE IF NOT EXISTS parkings (id int(3), latitude float, longitude float, altitude float, accuracy float, siteslug varchar(255))');
    }
    
    // No use for now....
    function createPaths(tx) {
         tx.executeSql('DROP TABLE IF EXISTS paths');        
         tx.executeSql('CREATE TABLE IF NOT EXISTS paths (name varchar(255))');
    }
    
    function creatSecteurs(tx) {
         tx.executeSql('DROP TABLE IF EXISTS secteurs');        
         tx.executeSql('CREATE TABLE IF NOT EXISTS secteurs (name varchar(255), slug varchar(255), latitude float, longitude float, linenb int, histo varchar(255), siteslug varchar(255))');
    }

    function createLines(tx) {
         tx.executeSql('DROP TABLE IF EXISTS lines');
         tx.executeSql('CREATE TABLE IF NOT EXISTS lines (name varchar(255), abstract varchar(255), grade int, rate int, secteurslug varchar(255), siteslug varchar(255), latitude float, longitude float, altitude float, accuracy float)');
    }
    

    // Transaction error callback
    function onError(tx, err) { alert("Error processing SQL: "+err); }

    // Transaction success callback
    function onSuccess(x) { alert("succes!"); }

// reset the chosen table by calling the right create function
    function reset(x) {         
          var db = window.openDatabase("bonowayDB", "1.0", "Bonoway Local Database", 1000000);
          db.transaction(x, onError, onSuccess);  
    }      

// resetALL the tables in favoris : use for initializing or deleting all favoris
    function resetAll() {         
          var db = window.openDatabase("bonowayDB", "1.0", "Bonoway Local Database", 1000000);
          db.transaction(createSites, onError, onSuccess);
          db.transaction(createParkings, onError, onSuccess);
          db.transaction(createPaths, onError, onSuccess);
          db.transaction(creatSecteurs, onError, onSuccess);  
          db.transaction(createLines, onError, onSuccess);  
    }  


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////     DELETE FROM FAVORIS        ///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Delete one site and its related objects
    function deleteSite(x){
    	var db = window.openDatabase("bonowayDB", "1.0", "Bonoway Local Database", 1000000);
    	var query = "DELETE FROM lines WHERE siteslug LIKE '" + x + "'" ;
        db.transaction(function (t){ t.executeSql(query, [], deleteSite2(x), onError )});
       }
   function deleteSite2(x){
   	var db = window.openDatabase("bonowayDB", "1.0", "Bonoway Local Database", 1000000);
        var query2 = "DELETE FROM secteurs WHERE siteslug LIKE '" + x + "'" ;
        db.transaction(function (t){ t.executeSql(query2, [], deleteSite3(x), onError )});
       }
       
   function deleteSite3(x){
   	var db = window.openDatabase("bonowayDB", "1.0", "Bonoway Local Database", 1000000);
        var query3 = "DELETE FROM parkings WHERE siteslug LIKE '" + x + "'" ;
        db.transaction(function (t){ t.executeSql(query3, [], deleteSite4(x), onError )});
       }
       
   function deleteSite4(x){
   	var db = window.openDatabase("bonowayDB", "1.0", "Bonoway Local Database", 1000000);
        var query4 = "DELETE FROM sites WHERE slug LIKE '" + x + "'" ;
        db.transaction(function (t){ t.executeSql(query4, [], finish, onError )});
    }

// delete a secteur and its related objects (lines) !!!USELESS
    function deleteSecteur(x){
    	var db = window.openDatabase("bonowayDB", "1.0", "Bonoway Local Database", 1000000);
    	var query = "DELETE FROM lines WHERE secteurslug LIKE '" + x + "'" ;
        db.transaction(function (t){ t.executeSql(query, [], onSuccess, onError )});
        var query2 = "DELETE FROM secteurs WHERE slug LIKE '" + x + "'" ;
        db.transaction(function (t){ t.executeSql(query2, [], onSuccess, onError )});
    }
    
// delete a line  !!!USELESS

function deleteLine(x){
    	var db = window.openDatabase("bonowayDB", "1.0", "Bonoway Local Database", 1000000);
    	var query = "DELETE FROM lines WHERE secteurslug LIKE '" + x + "'" ;
        db.transaction(function (t){ t.executeSql(query, [], onSuccess, onError )});
    }





///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////     FAVORIS DB -> JSON        ////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//start with filter function (selecting a site in favoris to display it)
var filterType = "";

    function filter(x,y) {
    	filterType= y;
     	slugish = x; 
     	var db = window.openDatabase("bonowayDB", "1.0", "Bonoway Local Database", 1000000);
     	var query = "SELECT * FROM sites WHERE slug LIKE '" + slugish + "'" ;
     	db.transaction(function (tz){ tz.executeSql(query, [], buildSite, onError )});    
    }
    
    
    function getVoies(tt, results){
         buildVoie(results, 0);
    }
    
    function buildVoie(voies, k){
         if(k<voies.rows.length){
         	   var chain1 = "";
         	   var chain2 = "";
         	   chain1 = voies.rows.item(k).secteurslug;
         	   chain2 = secteurs.rows.item(i).slug;
         	   if(chain1 == chain2){
         	   	 var obj = { "name": voies.rows.item(k).name, "abstract": voies.rows.item(k).abstract,
         	   	  "grade": voies.rows.item(k).grade, "rate": voies.rows.item(k).rate,
         	   	  "latitude": voies.rows.item(k).latitude, "longitude": voies.rows.item(k).longitude, "altitude": voies.rows.item(k).altitude, "accuracy": voies.rows.item(k).accuracy};
     		     json.Secteur[i].Voie.push(obj);
         	   }
     		   buildVoie(voies, k+1);
         }
         else{
            i=i+1;
            buildSecteur(i);
         }
    }
    
    
    function getParkings(tt, results){
         totalParkings = results.rows.length;
         parkings = results;
         p=0;
         buildParking();
    }
    
    
   function buildParking(){
	  if(p<parkings.rows.length){
   		var obj = {"id": parkings.rows.item(p).id, "latitude": parkings.rows.item(p).latitude, "longitude": parkings.rows.item(p).longitude, "altitude": parkings.rows.item(p).altitude, "accuracy": parkings.rows.item(p).accuracy, "siteslug": parkings.rows.item(p).siteSlug};
        json.Parking.push(obj);
        p=p+1;
        buildParking();
      }
      else{
      	 var db = window.openDatabase("bonowayDB", "1.0", "Bonoway Local Database", 1000000);
         var querys = "SELECT * FROM secteurs WHERE siteslug LIKE '" + slugish + "'" ;
         db.transaction(function (tt){ tt.executeSql(querys, [], getSecteurs, onError )});  
      }
   }
    
    
    function getSecteurs(tt, results){
         totalSecteurs = results.rows.length;
         secteurs = results;
         i=0;
         buildSecteur();
    }
    
    
   function buildSecteur(){
	  if(i<secteurs.rows.length){
   		var obj = { "name": secteurs.rows.item(i).name, "slug": secteurs.rows.item(i).slug, "latitude": secteurs.rows.item(i).latitude, "longitude": secteurs.rows.item(i).longitude,  "linenb": secteurs.rows.item(i).linenb, "histo": secteurs.rows.item(i).histo, "Voie" : []};
        json.Secteur.push(obj);
        var db = window.openDatabase("bonowayDB", "1.0", "Bonoway Local Database", 1000000);
        var querys = "SELECT * FROM lines WHERE siteslug LIKE '" + slugish + "'" ;
        db.transaction(function(ttz){ ttz.executeSql(querys, [], getVoies, onError )});
      }
      else{
       	 goon();
       }
   }
   
   function buildSite(tz, resultings){
         var len = resultings.rows.length;
         json.SiteName = resultings.rows.item(0).name;
         json.SiteSlug = resultings.rows.item(0).slug;
         json.SiteAbstract = resultings.rows.item(0).abstract;
         json.SiteGPS.Latitude = resultings.rows.item(0).latitude;
         json.SiteGPS.Longitude = resultings.rows.item(0).longitude;
         json.SiteGPS.Altitude = resultings.rows.item(0).altitude;
         json.SiteGPS.Accuracy = resultings.rows.item(0).accuracy;
         json.linenb = resultings.rows.item(0).linenb;
         json.histo = resultings.rows.item(0).histo;
         
         var db = window.openDatabase("bonowayDB", "1.0", "Bonoway Local Database", 1000000);
         var querys = "SELECT * FROM parkings WHERE siteslug LIKE '" + slugish + "'" ;
         db.transaction(function (tt){ tt.executeSql(querys, [], getParkings, onError )});  
    }
    

 // finish with goon leading to the diplay.html page with json in URL
    function goon(){
      var jsite = JSON.stringify(json);
      var requete= "json='" + jsite + "'; " ;  
     requete = escape(requete);
     if(filterType == "display"){ window.location.href = "display.html?" + requete; }
     if(filterType == "edit"){ window.location.href = "add.html?" + requete;}
     if(filterType == "send" ) {alert("send fonction is not developped yet."); }
    }