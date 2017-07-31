angular.module('starter')
.service('CarroService', function($http){

	var url = 'https://aluracar.herokuapp.com/';

	return{
		obterCarros : function(){
			return $http.get(url).then(function(response){
				return response.data;
			});
		}, 
		
		salvarPedido : function(pedido){
			return $http.get(url + "salvarpedido" , pedido).then(function(response){
				return "Deu certo.";
			});
		},
		
		realizarLogin : function (dadosDoLogin) {
			return new Promise((resolve, reject) => {
			    if (dadosDoLogin.params.email == 'joao@alura.com.br') {
				dados = {
					usuario : {
					    id:	1,
					    nome:	"Luciano José Bravo de Moura",
					    dataNascimento:	"30/01/1972",
					    telefone:	"1199887788",
					    email:	"joao@alura.com.br"
					}
				};
				resolve(dados);
			    } else {
				dados = {
					data : {
					    mensagem : "usuário não cadastrado!"
					}
				};
				
				reject(dados);
			    }
			})
//		    return $http.get(url + 'login', dadosDoLogin)
//		    .then(function(response) {
//			return response.data;
//		    })
//		    .catch(function(reason) {
//			console.debug('realizarLogin errorCallback: ' + reason.status + '=' + reason.statusText + ' (' + reason.data.mensagem + ')' );	
//			return reason;
//		    })
//		    , function(value) {
//			console.debug('realizarLogin notifyCallback: ' + value.status + '=' + value.statusText + ' (' + value.data.mensagem + ')' );
//		    }
		    
		}
	}

});