/**
 * 
 */
angular.module('starter')
.value ('DatabaseValues', {
    bancoDaDados : null,
    setup : function () {
	this.bancoDaDados = window.openDatabase('aluracar', '1.0', 'BD da AluraCar2', 3000);
	this.bancoDaDados.transaction(function(transacao){
	  transacao.executeSql(
	  'CREATE TABLE IF NOT EXISTS agendamentos (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,nome VARCHAR(300), endereco VARCHAR(300), email VARCHAR(300), dataAgendamento VARCHAR(40), modelo VARCHAR(100), preco VARCHAR(50), confirmado BOOLEAN);', [])
	});
    }
})