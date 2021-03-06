

angular.module('Sukosan')
  .controller('SettingsCtrl', function ($scope, $stateParams, $http, ionicDatePicker, $filter) {
    $scope.from;
    $scope.to;

    if (window.localStorage.getItem("to") == null) {
      $scope.to = "Pick date";
    } else {
      $scope.to = window.localStorage.getItem("to")
    }
    if (window.localStorage.getItem("from") == null) {
      $scope.from = "Pick date";
    } else {
      $scope.from = window.localStorage.getItem("from")
    }

    var ipObj = {
      callback: function (val) {  //Mandatory 

        console.log('Return value from the datepicker popup is : ' + val, new Date(val));
        alert($filter('date')(new Date(val), 'dd/MM/yyyy'));
        window.localStorage.setItem("to", new Date(val).toDateString());
        window.localStorage.setItem("toString",$filter('date')(new Date(val), 'yyyy-MM-dd') );
          alert("ovo:  " +$filter('date')(new Date(val), 'yyyy-MM-dd') )
        $scope.sendPost();
      },
      disabledDates: [            //Optional
        new Date(2016, 2, 16),
        new Date(2015, 3, 16),
        new Date(2015, 4, 16),
        new Date(2015, 5, 16),
        new Date('Wednesday, August 12, 2015'),
        new Date("08-16-2016"),
        new Date(1439676000000)
      ],
      from: new Date(2017, 1, 1), //Optional
      to: new Date(2100, 10, 30), //Optional
      inputDate: new Date(),      //Optional
      mondayFirst: true,          //Optional
      disableWeekdays: [0],       //Optional
      closeOnSelect: false,       //Optional
      templateType: 'popup'       //Optional
    };

    $scope.openDatePicker2 = function () {
      ionicDatePicker.openDatePicker(ipObj);
    };

    if (window.localStorage.getItem("notifications") == null) {
      $scope.click = 'red';
      window.localStorage.setItem("notifications", "red");
    } else {



      $scope.click = window.localStorage.getItem("notifications");

    }
    var ipObj1 = {
      callback: function (val) {  //Mandatory
        console.log('Return value from the datepicker popup is : ' + val, new Date(val)); 
        window.localStorage.setItem("from", new Date(val).toDateString());
        window.localStorage.setItem("fromString", $filter('date')(new Date(val), 'yyyy-MM-dd') );
        alert("ovo:  " +$filter('date')(new Date(val), 'yyyy-MM-dd') )
        $scope.from = new Date(val).toDateString();
        $scope.sendPost();
      },
      disabledDates: [            //Optional
        new Date(2016, 2, 16),
        new Date(2015, 3, 16),
        new Date(2015, 4, 16),
        new Date(2015, 5, 16),
        new Date('Wednesday, August 12, 2015'),
        new Date("08-16-2016"),
        new Date(1439676000000)
      ],
      from: new Date(2017, 1, 1), //Optional
      to: new Date(2100, 10, 30), //Optional
      inputDate: new Date(),      //Optional
      mondayFirst: true,          //Optional
      disableWeekdays: [0],       //Optional
      closeOnSelect: false,       //Optional
      templateType: 'popup'       //Optional
    };

    $scope.openDatePicker = function () {
      ionicDatePicker.openDatePicker(ipObj1);
    };
    $scope.clickNotifications = function () {
      if (window.localStorage.getItem("notifications") == "red") {
        window.localStorage.setItem("notifications", "green");
        window.localStorage.setItem("notificationsValue", "0");
        $scope.click = "green";
        alert();
        $scope.sendPost();
      } else {
        window.localStorage.setItem("notifications", "red");
        window.localStorage.setItem("notificationsValue", "1");
        $scope.click = "red";
        $scope.sendPost();
      }
    }



    $scope.sendPost = function () {

      var request = $http({
        method: "POST",
        url: 'http://www.sukosan.hr/rest/updateUser.php',
        data: { push: window.localStorage.getItem("notificationsValue"), token: window.localStorage.getItem("token"), os: "android", pocetni: window.localStorage.getItem("fromString"), zavrsni: window.localStorage.getItem("toString") },

        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }

      });
      request.success(function (data) { 
      console.log("DOBAR DATUM"+data);
      });
      request.error(function (err) {

        console.log("ERRORiiii: " + err);
      });

    }

  });
