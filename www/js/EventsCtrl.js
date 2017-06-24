
angular.module('Sukosan')
    .controller('EventsCtrl', function ($scope, $rootScope, $http, $ionicPopup, $cordovaSQLite, $ionicPlatform, $state, $stateParams) {

        console.log("loada se eventsCtrl");
        $scope.events;
        $scope.events = [];
        $scope.myPopup;
        $scope.title;
        $scope.id;
        $scope.text;
        $scope.date;
        $scope.favorit = 3; 

      





        $ionicPlatform.ready(function () {

                var query = "SELECT * FROM favorites";
                db = window.sqlitePlugin.openDatabase({ name: 'demo.db', location: 'default' });
                $cordovaSQLite.execute(db, query, []).then(function (res) {

                    var request = $http({
            method: "GET",
            url: 'http://www.sukosan.hr/rest/events.php',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        request.success(function (data) {
             for (var v = 1; v < data.length; v++) {
                  console.log( "PRVA PETLJA SERVER "+data[v]["id"]) ; 
                   if (res.rows.length > 0) {
                        var favorit=false;
                        console.log("SELECTED -> " + res.rows.item(0).id + " " + res.rows.item(0).id);

                        for (var i = 0; i < res.rows.length; i++) {   
                            console.log("ID IZ BAZE;"+res.rows.item(i).id +"id sa servera: "+data[v]["id"]) ; 
                            if ( res.rows.item(i).id  == data[v]["id"]) {
                                alert("RADIIIIIIIIIII");
                                favorit=true;
                                console.log("ID: "+data[v]["id"]);
                                $scope.events.push({
                                    id: data[v]["id"],   
                                    title: data[v]["title"],
                                    date: data[v]["date"],
                                    text: data[v]["text"],
                                    favorit: 2, 
                                });
                                break;
                            } 
                            console.log("ajdeee" + $scope.events.length);
                        }
                        if(favorit==false){
                                            $scope.events.push({
                                    id: data[v]["id"],
                                    title: data[v]["title"],
                                    date: data[v]["date"],
                                    text: data[v]["text"],
                                    favorit: 1,
                                    
                                });
                        }
                    } else {
                        $scope.events = data;
                    }
             }
            
        });


                });
     


            $scope.addFavorits = function (id) {

                var request = $http({
                    method: "GET",
                    url: 'http://www.sukosan.hr/rest/events.php',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                });

                request.success(function (data) {

                    for (var v = 0; v < data.length; v++) {
                        if (data[v]["id"] == id) {
                            $scope.title = data[v]["title"];
                            $scope.date = data[v]["date"];
                            $scope.text = data[v]["text"];
                            alert("title:" + $scope.title + " date: " + $scope.date);
                            var query = "INSERT INTO favorites (id, title,date,description) VALUES (?,?,?,?)";
                            alert(id);
                            $cordovaSQLite.execute(db, query, [id, $scope.title, $scope.date, $scope.text]).then(function (res) {
                                console.log("insertId: " + res.insertId);
                            }, function (err) {
                                console.error(err[0]);
                            });

                        }
                    }


                });



            }
            db = window.sqlitePlugin.openDatabase({ name: 'demo.db', location: 'default' });

            var db = window.sqlitePlugin.openDatabase({ name: 'demo.db', location: 'default' });
            $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS favorites (id integer primary key, title text, date Date, description text,notification integer)").then(function (res) {
                console.log("favoriti uspjeli: " + res.insertId);
            }, function (err) {
                console.error("DASD?" + err[0]);
            });









        });





        $scope.addFavorit = function (id, favorit) {
            alert();
            $scope.id = id;
            $scope.favorit = favorit;

            $scope.myPopup = $ionicPopup.show({
                templateUrl: 'templates/popup.html',
                scope: $scope,
            })

        }
        $scope.remove = function () {

            var query = "DELETE from favorites where id = ?";
            $cordovaSQLite.execute(db, query, [$scope.id]).then(function (res) {
                console.log("insertId: " + res.insertId);
            }, function (err) {
                console.error(err[0]);
            });

            $scope.myPopup.close();
            $state.go($state.current, {}, { reload: true });


        }

        $scope.add = function () {
            var db = window.sqlitePlugin.openDatabase({ name: 'demo.db', location: 'default' });
            var request = $http({
                method: "GET",
                url: 'http://www.sukosan.hr/rest/events.php',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
            request.success(function (data) {
                for (var v = 0; v < data.length; v++) {
                    if (data[v]["id"] == $scope.id) {
                        $scope.title = data[v]["title"];
                        $scope.date = data[v]["date"];
                        $scope.text = data[v]["text"];
                        var query = "INSERT INTO favorites (id, title,date,description) VALUES (?,?,?,?)";
                        $cordovaSQLite.execute(db, query, [$scope.id, $scope.title, $scope.date, $scope.text]).then(function (res) {
                            console.log("insertId: " + res.insertId);
                        }, function (err) {
                            console.error(err[0]);
                        });

                    }
                }


            });

            $scope.myPopup.close();
            $state.go($state.current, {}, { reload: true });


        }
        /**
                    var get = true;
                    db = window.sqlitePlugin.openDatabase({ name: 'demo.db', location: 'default' });
                    
                    var db = window.sqlitePlugin.openDatabase({ name: 'demo.db', location: 'default' });
                    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS favorites (id integer primary key, title text, date Date, description text,notification integer)").then(function (res) {
                        console.log("favoriti uspjeli: " + res.insertId);
                    }, function (err) {
                        console.error("DASD?" + err[0]);
                    });
        
        
                    var query = "SELECT * FROM events";
                    db = window.sqlitePlugin.openDatabase({ name: 'demo.db', location: 'default' });
                    $cordovaSQLite.execute(db, query, []).then(function (res) {
                        if (res.rows.length > 0) {
        
        
                            var query = "SELECT * FROM favorites";
                            $cordovaSQLite.execute(db, query, []).then(function (res1) {
                              
                                if (res.rows.length > 0) {
                                    console.log("SELECTEDaaaaaa -> " + res.rows.item(0).id + " " + res.rows.item(0).s_id);
                                    for (var i = 0; i < res.rows.length; i++) {
                                        var istina = false;
                                        if (res1.rows.length == 0) {
                                            $scope.events.push({
                                                id: res.rows.item(i).id,
                                                title: res.rows.item(i).title,
                                                date: res.rows.item(i).date,
                                                text: res.rows.item(i).description,
                                                favorit: 2,
                                            });
                                        } else {
                                            var haveFavorit = false;
                                            for (var j = 0; j < res1.rows.length; j++) {
                                                if (res1.rows.item(j).id == res.rows.item(i).id) {
                                                    $scope.events.push({
                                                        id: res.rows.item(i).id,
                                                        title: res.rows.item(i).title,
                                                        date: res.rows.item(i).date,
                                                        text: res.rows.item(i).description,
                                                        favorit: 1,
        
                                                    });
                                                    haveFavorit = true;
                                                }
                                            }
                                            if (haveFavorit == false) {
                                                $scope.events.push({
                                                    id: res.rows.item(i).id,
                                                    title: res.rows.item(i).title,
                                                    date: res.rows.item(i).date,
                                                    text: res.rows.item(i).description,
                                                    favorit: 2,
                                                });
        
                                            }
                                        }
                                    }
                                } else {
                                    console.log("No results found");
                                }
                                console.log("udri:" + $scope.events.length);
                            }, function (err) {
                                console.error("error=>" + err);
                            });
        
        
                            console.log("SELECTEDaaaaaa -> " + res.rows.item(0).id + " " + res.rows.item(0).s_id);
        
                        } else {
                            console.log("No results found");
                        }
                        console.log("udri:" + $scope.events.length);
                    }, function (err) {
                        console.error("error=>" + err);
                    });
        
         */


        $scope.cancel = function () {
            $scope.myPopup.close();

        }



        $scope.go = function (id) {
            $state.go('app.detail', { eventId: id })
        }

    });