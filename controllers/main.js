/**
 * Created by M045 on 07-09-2016.
 */

routerApp.controller("mapController", function ($http, $scope, NgMap, $stateParams, $state) {
    $scope.dataList = [];
    $scope.onButtonClick = function (event) {
        $state.go('map', {location: $scope.location, item: $scope.item});
    };

    var location = $stateParams.location == '' ? 'sydney' : $stateParams.location,
        item = $stateParams.item == '' ? 'food' : $stateParams.item,
        completeUrl = '/search' + '?location=' + location + '&term=' + item + '';

    $http({method: 'GET', url: completeUrl}).then(function successCallback(response) {
        var requestData = response.data.businesses;
        for (var i = 0; i < requestData.length; i++) {
            $scope.dataList.push(
                {
                    name: requestData[i].name,
                    address: requestData[i].location.display_address,
                    rating: requestData[i].rating,
                    image: requestData[i].image_url == undefined ? 'images/notAvailable.jpg' : requestData[i].image_url,
                    latitude: requestData[i].location.coordinate.latitude,
                    longitude: requestData[i].location.coordinate.longitude,
                    url: requestData[i].mobile_url,
                    phone: requestData[i].phone == undefined ? 'N/A' : requestData[i].phone
                }
            )
        }
    });

    NgMap.getMap().then(function (map) {
        $scope.map = map;
    });

    $scope.showDetail = function (event, city) {
        $scope.infoData = city;
        $scope.map.showInfoWindow('myInfoWindow', this);
    };
});