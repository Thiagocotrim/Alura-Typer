var campo = $(".campo-digitacao");
var tempoInicial = $("#tempo-digitacao").text();

$(function(){
	atualizaTamanhoFrase();
	inicializaContadores();
	inicializaCronometro();
	inicializaMarcadores();
	$("#botao-reiniciar").click(reiniciaJogo);
	atualizaPlacar();

	$("#usuarios").selectize({
		create: true,
		sortField: 'text'
	});

	$(".tooltip").tooltipster({
    	trigger: "custom"
	});

});

function atualizaTamanhoFrase(){
	var frase = $(".frase").text();
	var numPalavras = frase.split(" ").length;
	var tamanhoFrase = $("#tamanho-frase");
	tamanhoFrase.text(numPalavras);
}

function inicializaContadores(){
	campo.on("input", function(){

		var conteudo = campo.val();
		var qtdPalavras = conteudo.split(/\S+/).length - 1;
		$("#contador-palavras").text(qtdPalavras);

		var conteudoSemEspaco = conteudo.replace(/\s+/g,'');
		var qtdCaracteres = conteudoSemEspaco.length;
		$("#contador-caracteres").text(qtdCaracteres);
	});
}

function atualizaTempoInicial(tempo){
	tempoInicial = tempo;
	$("#tempo-digitacao").text(tempo);
}

function inicializaCronometro(){
	
	campo.one("focus", function(){
		var tempoRestante = $("#tempo-digitacao").text();
		$("#botao-reiniciar").attr("disabled", true);

		var cronometroID = setInterval(function(){
			tempoRestante --;
			$("#tempo-digitacao").text(tempoRestante);
			if(tempoRestante < 1){
				clearInterval(cronometroID);
				finalizaJogo();
			}
			$("#botao-reiniciar").attr("disabled", true);
		}, 1000);
	});
}

function finalizaJogo(){
	campo.attr("disabled",true);
	campo.addClass("campo-desativado");
	inserePlacar();
}


function inicializaMarcadores(){
	campo.on("input", function(){
		var frase = $(".frase").text();
		var digitado = campo.val();
		var comparavel = frase.substr(0, digitado.length);

		if (digitado == comparavel) {
			campo.addClass("borda-verde");
			campo.removeClass("borda-vermelha");
		}else{
			campo.addClass("borda-vermelha");
			campo.removeClass("borda-verde");
		}
	});
}


$("#botao-reiniciar").click(reiniciaJogo);

function reiniciaJogo(){
	campo.attr("disabled",false);

	campo.val("");
	$("#contador-caracteres").text("0");
	$("#contador-palavras").text("0");

	$("#tempo-digitacao").text(tempoInicial);
	inicializaCronometro();
	campo.removeClass("campo-desativado");

	campo.removeClass("borda-verde");
	campo.removeClass("borda-vermelha");
}