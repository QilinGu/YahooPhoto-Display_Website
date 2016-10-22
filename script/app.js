/**
 * Created by ryan on 10/18/2016.
 */
var app = angular.module("miniFlickr",['akoenig.deckgrid','me-lazyload']);

app.controller("PhotoCtrl", ["$http","$scope", "$filter",function($http, $scope, $filter){
    $http.get("/api/v1/photos")
        .then(function(response){
            $scope.photos = response.data;
            $scope.filteredPhotos =$scope.photos;
            $scope.likeFilter ="all";

            $scope.searchTags = function () {
                if ($scope.tagsFilter === '') {
                    if ($scope.likeFilter === 'all') {
                        $scope.filteredPhotos = $scope.photos;
                    } else if ($scope.likeFilter === 'like'){
                        $scope.filteredPhotos = $filter('filter')($scope.photos, {like: true});
                    }
                } else {
                    if ($scope.likeFilter === 'all') {
                        $scope.filteredPhotos = $filter('filter')($scope.photos, {tags: $scope.tagsFilter});
                    } else if ($scope.likeFilter === 'like') {
                        $scope.filteredPhotos = $filter('filter')($scope.photos, {like: true, tags: $scope.tagsFilter});
                    }
                }
            };

            $scope.likeit = function(index){
                var currentLike = $scope.photos[index].like;
                if(currentLike == null){
                    $scope.photos[index].like = true;
                }else{
                    $scope.photos[index].like = !currentLike;
                }
            };
            $scope.toggleLike = function (likeFilter) {
                $scope.likeFilter = likeFilter; //to toggle button style class
                if (likeFilter === 'all') {
                    if ($scope.tagsFilter === '') {
                        $scope.filteredPhotos = $scope.photos;
                    } else {
                        $scope.filteredPhotos = $filter('filter')($scope.photos, {tags: $scope.tagsFilter});
                    }
                } else if (likeFilter === 'like') {
                    if ($scope.tagsFilter === '') {
                        $scope.filteredPhotos = $filter('filter')($scope.photos, {like: true});
                    } else {
                        $scope.filteredPhotos = $filter('filter')($scope.photos, {like: true, tags: $scope.tagsFilter});
                    }
                }
            };
        });
}]);







