angular.module('starter')
.controller('FinalizarPedidoController', function($stateParams, $scope
	, $ionicPopup, $state, CarroService, $ionicHistory, ionicDatePicker){

	$scope.carroFinalizado = angular.fromJson($stateParams.carro);

	$scope.pedido = {};
	$scope.dataSelecionada = new Date();
	
	let dpConfig = {
		callback : function (data) {
		    console.log(data);
		    $scope.dataSelecionada = new Date(data);
		}
	} 
	
	$scope.abrirPopupCalendario = () => {
	    ionicDatePicker.openDatePicker(dpConfig);
	}

	$scope.finalizarPedido = function(){

		var pedidoFinalizado = {
			params : {
				carro : $scope.carroFinalizado.nome,
				preco : $scope.carroFinalizado.preco,
				nome :  $scope.pedido.nome,
				endereco : $scope.pedido.endereco,
				email : $scope.pedido.email
			}
		}

		CarroService.salvarPedido(pedidoFinalizado).then(function(dados){


       		      $ionicHistory.nextViewOptions({
       		        disableBack : true
     		      });
		      
			$ionicPopup.alert({
				title: 'Parabens',
				template: 'Você acaba de comprar um carro.'
			}).then(function(){
				$state.go('app.listagem');
			});

		}, function(erro){
			$ionicPopup.alert({
				title: 'Deu erro',
				template: 'Campos obrigatórios'
			});
		});

	}

});
