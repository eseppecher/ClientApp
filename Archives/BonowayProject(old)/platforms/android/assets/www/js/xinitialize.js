///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////        Initialize the APP           //////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 

document.addEventListener("deviceready", onDeviceReady, false);
    
    function onDeviceReady() {
    	  var db = window.openDatabase("bonowayDB", "1.0", "Bonoway Local Database", 1000000);
          db.transaction(buildtables, onError, onSuccess);
}

    function buildtables(tx) {
  		tx.executeSql('CREATE TABLE IF NOT EXISTS sites (name varchar(255), slug varchar(255), abstract varchar(255), latitude float, longitude float, altitude float, linenb int)');   
        tx.executeSql('CREATE TABLE IF NOT EXISTS parkings (id int, latitude float, longitude float, altitude float, accuracy float, siteslug varchar(255))');        
        tx.executeSql('CREATE TABLE IF NOT EXISTS paths (name varchar(255))');     
        tx.executeSql('CREATE TABLE IF NOT EXISTS secteurs (name varchar(255), slug varchar(255), latitude float, longitude float, linenb int, siteslug varchar(255))');
        tx.executeSql('CREATE TABLE IF NOT EXISTS lines (name varchar(255), abstract varchar(255), grade int, rate int, secteurslug varchar(255), siteslug varchar(255), latitude float, longitude float, altitude float, accuracy float)');
    }

   
function onSuccess() { }
	

function onError() {alert("error");}



