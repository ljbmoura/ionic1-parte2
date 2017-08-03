angular.module('starter')
.controller('PerfilController', function($rootScope, $scope, $cordovaCamera, ionicDatePicker) {
    
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
    
    let dpConfig = {
	    callback : function (data) {
		console.log(data);
		$scope.usuarioPerfil.dataNascimento = new Date(data);
	    }
    } 
    
    $scope.abrirPopupCalendario = function() {
	ionicDatePicker.openDatePicker(dpConfig);
    }
})

