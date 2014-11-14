Tools timer
===========

This is a simple HTML page with some jQuery that allows to control the time that the tools in a competition are hired. 

## Origins

The app was originally intended to be used in BEST engineering competitions. An engineering competition usually has a Team Design test, it is a challenge where several groups must build a device with certain features from a set of specific resources and in a limited timeframe.

More info about competitions:
* [BEST EBEC] 
* [EBEC Valladolid]

## Usage

## Modifying the parameters

The app allows to change the time limits for hiring the tools and also the list of available tools. All is in the file js/scriptHerr.js

* Time limits: The constants in the file are defined here:

```js
var UN_MINUTO = 60000;
var TEN_MINUTES_LEFT = 300000; // The X_minutes_left values are computed by the time that already passed
var FIVE_MINUTES_LEFT = 600000; // So if the limit is 15min, for 10 min left we consider that 5 min passed (=300000ms)
var TWO_MINUTES_LEFT = 780000;
var FIN_TIEMPO = 900000;
```js


In the following part of the script the timeouts must be updated to show the proper warnings as well.

```js
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
```js


* Tools list: There is a var called *HERRAMIENTAS_OPTION* which has the full html for the selects. 

## Future improvements

* Reduce code, the list of tools could be set as an array and loaded in the selects with a js iteration.
* Settings page to modify the parameters before using the app.


[BEST EBEC]: http://ebec.best.eu.org/index.php
[EBEC Valladolid]: http://ebecvalladolid.org/
