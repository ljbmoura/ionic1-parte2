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


angular.module('starter')
.controller('MenuController', function($scope, $rootScope) {
    $scope.usuarioLogado = $rootScope.usuario;
});


angular.module('starter')
.controller('PerfilController', function($rootScope, $scope, $cordovaCamera) {
    
    $scope.estaEditando = false;
    
    $scope.rotuloBotao = 'Editar';
    
    $scope.usuarioPerfil = $rootScope.usuario;
    
    $scope.acaoAtual = function() {
	if (!$scope.estaEditando) {
	    $scope.estaEditando = true;
	    $scope.rotuloBotao = 'Salvar';
	} else {
	    $scope.estaEditando = false;
	    $scope.rotuloBotao = 'Editar';
	}
    }
    
    $scope.tirarFoto = function () {

	let opcoes = {
		quality: 70,
//		destinationType: Camera.DestinationType.DATA_URL,
//		sourceType: Camera.PictureSourceType.CAMERA,
//		allowEdit: true,
		encodingType: Camera.EncodingType.JPEG,
//		targetWidth: 100,
//		targetHeight: 100,
		saveToPhotoAlbum: false,
		correctOrientation: true
	};
	
	$cordovaCamera.getPicture(opcoes).then(function(imageData) {
//	      var image = document.getElementById('myImage');
	      $scope.caminhoFoto = imageData;
	}, function(err) {
	   // error
	    console.debug(err);
	});
	
    }
    
})

angular.module('starter')
.controller('ListagemController', function($scope, CarroService){

	CarroService.obterCarros().then(function(dados){

		$scope.listaDeCarros = dados;

	});

});

angular.module('starter')
.controller('CarroEscolhidoController', function($stateParams, $scope){

	$scope.carroEscolhido = angular.fromJson($stateParams.carro);

	$scope.listaDeAcessorios = [{"nome" : "Freio ABS", "preco": 800},
								{"nome" : "Ar Condicionado", "preco": 1000},
								{"nome" : "MP3 Player" , "preco" : 500}];

	$scope.mudou = function(acessorio, isMarcado){

		if (isMarcado) {
			$scope.carroEscolhido.preco = 
						$scope.carroEscolhido.preco + acessorio.preco;
		} else {
			$scope.carroEscolhido.preco = 
						$scope.carroEscolhido.preco - acessorio.preco;
		}

	};


});

angular.module('starter')
.controller('FinalizarPedidoController', function($stateParams, $scope
	, $ionicPopup, $state, CarroService, $ionicHistory){

	$scope.carroFinalizado = angular.fromJson($stateParams.carro);

	$scope.pedido = {};

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



































