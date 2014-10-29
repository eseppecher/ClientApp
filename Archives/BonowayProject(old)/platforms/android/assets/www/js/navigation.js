
    var element = document.getElementById("navigation");
 element.innerHTML = ' <nav class="navbar navbar-default" role="navigation">'+
  '<div class="container-fluid">' +
    '<div class="navbar-header">' +
      '<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">' +
        '<span class="sr-only">Toggle navigation</span>' +
        '<span class="icon-bar"></span>' +
        '<span class="icon-bar"></span>' +
        '<span class="icon-bar"></span>' +
      '</button>' +
      '<a class="navbar-brand" href="index.html">Bonoway</a>' +
    '</div>' +

    '<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">' +
      '<ul class="nav navbar-nav">' +
        '<li><a href="favoris.html"> <span class="glyphicon glyphicon-star"></span> Favoris </a></li>' +
        '<li><a href="add.html"> <span class="glyphicon glyphicon-plus-sign"></span> Ajouter un site  </a></li>' +
        '<li><a href="receiveSites.html"> <span class="glyphicon glyphicon-list"></span> Listes des sites  </a></li>' +           
        '<li><a href="settings.html"> <span class="glyphicon glyphicon-wrench"></span> Parametres  </a></li>' +    
        '<li><a href="dev/testarea.html"> - Developpement- </a></li>' +
      '</ul>' +
    '</div><!-- /.navbar-collapse -->' +
  '</div><!-- /.container-fluid -->' +
'</nav>';
