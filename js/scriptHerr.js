$(document).ready(function(){

	//Constantes para fijar los tiempos
	var UN_MINUTO = 60000;
	var TEN_MINUTES_LEFT = 300000;
	var FIVE_MINUTES_LEFT = 600000;
	var TWO_MINUTES_LEFT = 780000;
	var FIN_TIEMPO = 900000;

	//Options de las herramientas, lo que se ponga aquí será el listado de herramientas
	//En los valores que van en el atributo value es conveniente mantener el orden correlativo
	//para que funcione bien
	var HERRAMIENTAS_OPTION = 	"<option value='0'>--</option>" +
								"<option value='1'>Destornillador de estrella</option>" +
								"<option value='2'>Destornillador de estrella</option>" +
								"<option value='3'>Destornillador de estrella</option>" +
								"<option value='4'>Destornillador plano</option>" +
								"<option value='5'>Destornillador plano</option>" +
								"<option value='6'>Grapadora pared</option>" +
								"<option value='7'>Grapadora pared</option>" +
								"<option value='8'>Metro</option>" +
								"<option value='9'>Metro</option>" +
								"<option value='10'>Punz&oacute;n peque&ntilde;o</option>" +
								"<option value='11'>Punz&oacute;n peque&ntilde;o</option>" +
								"<option value='12'>Punz&oacute;n grande</option>" +
								"<option value='13'>Punz&oacute;n grande</option>" +
								"<option value='14'>Martillo</option>" +
								"<option value='15'>Martillo</option>" +
								"<option value='16'>Serrucho</option>" +
								"<option value='17'>Serrucho</option>" +
								"<option value='18'>Pistola cola</option>" +
								"<option value='19'>C&uacute;ter</option>" +
								"<option value='20'>C&uacute;ter</option>" +
								"<option value='21'>Tijeras</option>" +
								"<option value='22'>Tijeras</option>" +
								"<option value='23'>Regla</option>" +
								"<option value='24'>Alicates</option>" +
								"<option value='25'>Soldador de esta&ntilde;o</option>" +
								"<option value='26'>Escofina</option>" +
								"<option value='27'>Escofina</option>";
				
	//Evitar recargar la página sin confirmación
	window.onbeforeunload = function() {
        return "¿Seguro que desea recargar? Cualquier temporizador en funcionamiento será borrado!!!";
    }
							
	//Agregar las option a los select de la página
	$("select").append(HERRAMIENTAS_OPTION);

	//No permitir escribir en la ventana de tiempo restante
	$("input[type='text']").attr('readonly', 'readonly');

	//Al inicio, poner las ventanas en blanco y con el texto indicado
	$("input[type='text']").val("Espacio disponible"); 
	$("input[type='text']").css("background-color", "#ffffff");

	//Función que salta al hacer click en el botón y que mira si el espacio
	//correspondiente está libre u ocupado y crea
	//o borra los temporizadores según lo necesario.
	$("input[type='button']").click(function(){
		var buttonName = $(this).attr('name').substring($(this).attr('name').indexOf("_")+1);
		
		if ($(this).val() == "Alquilar")
		{
			bloquear(buttonName);
			$("#time_"+buttonName).val("15 min restantes");
			$("#time_"+buttonName).css('background-color', '#66FF33');
			$(this).val("Devolver");
			
			var timesRun = 15;
			window["temporizador"+buttonName] = setInterval(function(){
			    timesRun -= 1;
			    if(timesRun === 0){
					alertar(buttonName, "0");
			        clearInterval(window["temporizador"+buttonName]);
			    }
				$("#time_"+buttonName).val(timesRun.toString()+" min restantes");
			}, UN_MINUTO); 
			
			window["diezmin"+buttonName] = setTimeout(function(){
				alertar(buttonName, "10");
				}, TEN_MINUTES_LEFT);
			window["cincomin"+buttonName] = setTimeout(function(){
				alertar(buttonName, "5");
				}, FIVE_MINUTES_LEFT);
			window["dosmin"+buttonName] = setTimeout(function(){
				alertar(buttonName, "2");
				}, TWO_MINUTES_LEFT);
			window["unmin"+buttonName] = setTimeout(function(){
				alertar(buttonName, "0");
				}, FIN_TIEMPO);
		}
		else
		{
			desbloquear(buttonName);
			$(this).val("Alquilar");
		}

	});

	//Hija de la anterior, envía las alertas y cambia los colores de las ventanas correspondientes
	function alertar(equipo, tiempo)
	{
		var team = equipo.substring(0, 1);
		var herramienta = $("select[id='menu_"+equipo+"'] option:selected").text();
		
		if (tiempo.toString() != "0")
		{
			alert("Al equipo "+team+" le quedan "+tiempo.toString()+" minutos de uso de "+herramienta+"!!");	
		}
		else
		{
			alert("El equipo "+team+" agotó el tiempo de uso de "+herramienta+"!!");	
		}

		switch(tiempo.toString())
		{
			case "10":
				$("#time_"+equipo).css("background-color", "#FFFF00");
				break;
			case "5":
				$("#time_"+equipo).css("background-color", "#FF8000");
				break;
			case "2":
				$("#time_"+equipo).css("background-color", "#FF4500");
				break;
			case "0":
				$("#time_"+equipo).css("background-color", "#FF0000");
				$("input[name='Submit_"+equipo+"']").val("Alquilar");
				desbloquear(equipo);
				break;
		}
	}

	//Cuando una herramienta se alquila, evita que la misma se pueda alquilar por otro equipo
	//Además bloquea el select para que no se pueda cambiar mientras está alquilada
	function bloquear(select)
	{
		var herramientaAlquilada = $("select[id = 'menu_"+select+"'] option:selected").val();
		$("option[value='"+herramientaAlquilada+"']").attr('disabled', 'disabled');
		$("select[id='menu_"+select+"']").attr('disabled', 'disabled');
	}

	//Función para desbloquear una herramienta
	function desbloquear(select)
	{
		var herramientaAlquilada = $("select[id = 'menu_"+select+"'] option:selected").val();
		limpiaTemporizadores(select);
		$("option[value='"+herramientaAlquilada+"']").removeAttr('disabled');
		$("select[id='menu_"+select+"']").removeAttr('disabled');
		$("#time_"+select).css('background-color', '#ffffff');
		$("#time_"+select).val("Espacio disponible.");
		$("select[id='menu_"+select+"']").val(0);
	}

	//Función que resetea los temporizadores
	function limpiaTemporizadores(nombreBoton)
	{
		clearTimeout(window["diezmin"+nombreBoton]);
		clearTimeout(window["cincomin"+nombreBoton]);
		clearTimeout(window["dosmin"+nombreBoton]);
		clearTimeout(window["unmin"+nombreBoton]);
		clearInterval(window["temporizador"+nombreBoton]);
	}
});
		
