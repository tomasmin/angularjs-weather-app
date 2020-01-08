var myApp = angular.module("myApp", []);

myApp
  .controller("weatherController", ($scope, $http) => {
    $http.get("https://geolocation-db.com/json/geoip.php").then(
      response => {
        $scope.cityName = response.data.city;
        $scope.getRequest();
        console.log(response);
      },
      err => {
        console.log("City not found!");
      }
    );

    $scope.getRequest = () => {
      $http
        .get(
          "https://api.openweathermap.org/data/2.5/weather?q=" +
            $scope.cityName +
            "&units=metric&appid=194333f5b09188fbda8c4a3bbfea30b2"
        )
        .then(
          response => {
            $scope.response = response;
            console.log($scope.cityName);
            console.log($scope.response);
          },
          response => {
            console.log("City not found!");
          }
        );

      $http
        .get(
          "https://api.openweathermap.org/data/2.5/forecast?q=" +
            $scope.cityName +
            "&units=metric&appid=194333f5b09188fbda8c4a3bbfea30b2"
        )
        .then(
          response => {
            $scope.forecast = response;
            console.log($scope.cityName);
            console.log($scope.forecast);
          },
          response => {
            alert("City not found!");
          }
        );
    };
  })
  .filter("filter", function($filter) {
    return function(input) {
      var date = new Date(input);
      return $filter("date")(date, "EEE hh a");
    };
  });
