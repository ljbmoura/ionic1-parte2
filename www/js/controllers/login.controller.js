angular.module('starter')

.controller('LoginController', function($scope, $ionicPopup, $state, CarroService, $rootScope) {

    $scope.login = {
	    email : 'joao@alura.com.br',
	    senha : 'alura123'
	
    };
    
    $scope.realizarLogin = function () {
	
	var dadosDoLogin = {
		params : {
		    email : $scope.login.email,
		    senha : $scope.login.senha
		}
	}
//	console.debug('login iniciado');
	
	CarroService.realizarLogin(dadosDoLogin).then(function(dados){
	    console.debug(dados);
	    $rootScope.usuario = dados.usuario;
	    $state.go('app.listagem')
	    
	}, function(erro){
	    console.debug(erro);
	    $ionicPopup.alert({
	      title : 'Opa!',
	      template : 'E-mail ou senha incorretos: '  + erro.data.mensagem
	    })
	})
	  
//	console.debug('login finalizado');
    }
    
});

