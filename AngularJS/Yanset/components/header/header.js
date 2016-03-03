angular.module('mainApp').controller('headerCtrl',
['$scope', '$rootScope', '$location', 'sessionService', 'userInfoService', 'notificationService',
        function($scope, $rootScope, $location, sessionService, userInfoService, notificationService){
            $scope.$location = $location;
            $scope.user = sessionService.getConnectedUser();
            $scope.showUserMenu = sessionService.isUserConnected();
            $scope.userName = userInfoService.getUserName();
            $scope.notifications = [];
            
            $scope.$on('handleUserConnect', function() {

                if ($scope.user == undefined) {
                    console.log("No user online");
                    $scope.user = sessionService.getConnectedUser();
                }
                $scope.userName = userInfoService.getUserName($scope.user);
                $scope.showUserMenu = true;
            });
            
            updateNotification();

            $scope.logout = function() {
                $scope.user = undefined;
                $scope.userName = undefined;
                $scope.showUserMenu = false;
                sessionService.disconnectUser();
                userInfoService.clearUser();
                $location.path('/');
            };

            $scope.setNotificationRead = function(index) {
                notificationService.setRead($scope.notifications[index]._id);
                delete $scope.notifications[index];
            };

            $scope.$on('handleUserConnect', function(ev, data) {
                updateNotification();
            });
            $scope.$on('updateNotification', function(ev, data) {
                updateNotification();
            });
            $scope.$on('socket:newNotification', function(ev, data) {
                updateNotification();
            });

            function updateNotification() {
                notificationService.getNotifications().then(
                    function(response){
                        $scope.notifications = response.notifications;
                    }, 
                    function(reason) {
                        
                    }
                );
            }
            
        }
]);
