angular.module('starter')
.config(function($stateProvider, $urlRouterProvider){

$urlRouterProvider.otherwise('login');

$stateProvider

.state('login', {
    url: '/login',
    templateUrl : 'templates/login.html',
    controller: 'LoginController'
})

.state('listagem',{
	url : '/listagem',
	templateUrl : 'templates/listagem.html',
	controller: 'ListagemController'
})

.state('carroescolhido',{
	url : '/carroescolhido/:carro',
	templateUrl: 'templates/carroescolhido.html',
	controller: 'CarroEscolhidoController'
})

.state('finalizarpedido',{
	url : '/finalizarpedido/:carro',
	templateUrl : 'templates/finalizarpedido.html',
	controller : 'FinalizarPedidoController'
})

})