(function() {
    angular
        .module('mainApp')
        .controller('notificationCtrl', notificationCtrl);

    notificationCtrl.$inject = ['$scope', 'sessionService', 'notificationService'];

    function notificationCtrl($scope, sessionService, notificationService){

        $scope.notifications = [];

    	$scope.setNotificationRead = function(index) {
            notificationService.setRead($scope.notifications[index]._id);
        };

        updateAllNotification();
        $scope.$on('socket:newNotification', function(ev, data) {
            updateAllNotification();
        });
        $scope.$on('updateNotification', function(ev, data) {
            updateAllNotification();
        });

    	function updateAllNotification(){
            notificationService.getAllNotifications().then(
                function(response){
                    $scope.notifications = response.notifications;
                }, 
                function(reason) {
                    
                }
            );
       	}
       	
    }
    
})();
