(function() {
	angular
	    .module('mainApp')
	    .factory('socket', socket);

	socket.$inject = ['socketFactory', 'envConfig'];

	function socket(socketFactory, envConfig) {
		var mySocket = socketFactory({
	        ioSocket: io.connect(envConfig.notificationServer)
	    });
		mySocket.forward('connected'); //forward the event to $scope.$on('socket:connected')
		mySocket.forward('newNotification');
	    return mySocket;
	}


	angular
	    .module('mainApp')
	    .service('socketService', socketService);

	socketService.$inject = ['socket'];

	function socketService(socket) {

		this.init = function(sessionService){
			if (sessionService.isUserConnected()) {
				this.addUser(sessionService.getConnectedUser()._id);
			}
		};

		this.addUser = function(userId){
			socket.emit('addUser', userId);
		};

		this.removeUser = function () {
			socket.emit('removeUser');
		};
	}
	
})();