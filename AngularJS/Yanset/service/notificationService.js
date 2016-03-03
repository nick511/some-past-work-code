(function() {
	angular
	    .module('mainApp')
	    .service('notificationService', notificationService);

	notificationService.$inject = ['$rootScope', '$http', '$q', 'envConfig', 'userInfoService'];

	function notificationService($rootScope, $http, $q, envConfig, userInfoService) {

		var notificationUnreadUrl = envConfig.serverAddress + 'notification/unread/';
		var notificationAllUrl = envConfig.serverAddress + 'notification/all/';
		var notificationReadUrl = envConfig.serverAddress + 'notification/read/';

		this.getNotifications = function(){
			var user = userInfoService.getUser();
			if (!user) return $q.reject();

			var defered = $q.defer();
			$http.get(notificationUnreadUrl + user._id)
				.success(function(data){
		            defered.resolve(data);
		        })
		        .error(function(data, status){
		            defered.reject(data.err);
		        });

			return defered.promise;
		};

		this.getAllNotifications = function(){
			var user = userInfoService.getUser();
			if (!user) return $q.reject();

			//todo: paginations
			var params = {
	            limit: 20,
	        };

			var defered = $q.defer();
			$http.get(notificationAllUrl + user._id)
				.success(function(data){
		            defered.resolve(data);
		        })
		        .error(function(data, status){
		            defered.reject(data.err);
		        });

			return defered.promise;
		};

		this.setRead = function(id){
			var user = userInfoService.getUser();
			if (!user) return $q.reject();

			var defered = $q.defer();
			$http.put(notificationReadUrl + user._id + "/" + id)
				.success(function(data){
		            defered.resolve(data.result);
		            $rootScope.$broadcast('updateNotification');
		        })
		        .error(function(data, status){
		            defered.reject(data.err);
		        });

			return defered.promise;
		};

		this.setReadAll = function(){
			var user = userInfoService.getUser();
			if (!user) return $q.reject();

			var defered = $q.defer();
			$http.put(notificationReadUrl + user._id)
				.success(function(data){
		            defered.resolve(data.result);
		            $rootScope.$broadcast('updateNotification');
		        })
		        .error(function(data, status){
		            defered.reject(data.err);
		        });

			return defered.promise;
		};
	}
	
})();