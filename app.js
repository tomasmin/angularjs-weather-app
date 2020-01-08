const myApp = angular.module("myApp", []);
const apiKey = "194333f5b09188fbda8c4a3bbfea30b2";
const heavyWeatherArray = [
  "heavy thunderstorm",
  "thunderstorm with heavy rain",
  "thunderstorm with heavy drizzle",
  "heavy shower rain and drizzle",
  "heavy intensity drizzle rain",
  "heavy intensity rain",
  "very heavy rain",
  "extreme rain",
  "heavy intensity shower rain",
  "Heavy snow",
  "Heavy shower snow",
  "tornado"
];

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
      $scope.warningStyle = () => {
        return { display: "none" };
      };
      $http
        .get(
          "https://api.openweathermap.org/data/2.5/weather?q=" +
            $scope.cityName +
            "&units=metric&appid=" +
            apiKey
        )
        .then(
          response => {
            $scope.response = response;
            console.log($scope.cityName);
            console.log($scope.response);
          },
          err => {
            console.log("Error! Wrong city name or no reponse from API");
          }
        );

      $http
        .get(
          "https://api.openweathermap.org/data/2.5/forecast?q=" +
            $scope.cityName +
            "&units=metric&appid=" +
            apiKey
        )
        .then(
          response => {
            console.log(response);
            $scope.forecast = response;
            response.data.list.forEach(element => {
              element.weather.forEach(el => {
                if (heavyWeatherArray.includes(el.description)) {
                  $scope.condition = el.description;
                  $scope.warningStyle = () => {
                    return { display: "block" };
                  };
                }
              });
            });
          },
          err => {
            alert("Error! Wrong city name or no reponse from API");
          }
        );
    };
  })
  .filter("filter", function($filter) {
    return function(input) {
      let date = new Date(input);
      return $filter("date")(date, "EEE hh a");
    };
  });
