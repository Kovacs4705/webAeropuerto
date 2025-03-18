// David Kovacs y Alejandro Solar

// Nombre de la Funcion: "getCookie"
// Argumentos: "cname - el nombre de la cookie a obtener"
// Funcionalidad: "Obtiene el valor de una cookie por su nombre"
function getCookie(cname) {
	let name = cname + "=";
	let cookies = document.cookie.split(";");
	for (let i = 0; i < cookies.length; i++) {
		let cookie = cookies[i];
		while (cookie.charAt(0) == " ") {
			cookie = cookie.substring(1);
		}
		if (cookie.indexOf(name) == 0) {
			return cookie.substring(name.length, cookie.length);
		}
	}
	return "";
}

// Nombre de la Funcion: "setCookie"
// Argumentos: "nombre - el nombre de la cookie, valor - el valor de la cookie, dias - los días de expiración de la cookie"
// Funcionalidad: "Establece una cookie con el nombre, valor y días de expiración proporcionados"
function setCookie(nombre, valor, dias) {
	let date = new Date();
	date.setTime(date.getTime() + dias * 24 * 60 * 60 * 1000); // Calcular la fecha de expiración
	document.cookie = `${nombre}=${valor};expires=${date.toUTCString()};path=/`; // Establecer la cookie
}

// Nombre de la Funcion: "deleteCookie"
// Argumentos: "Ninguno"
// Funcionalidad: "Elimina la cookie del contador de visitas"
function deleteCookie() {
	setCookie("contador1", "", -1); // Establecer la cookie con una fecha de expiración pasada
	document.getElementById("contador1").innerText = `Numero de Visitas (Cookie): 0`; // Actualizar el texto en la página
}

// Nombre de la Funcion: "incrementarVisitas"
// Argumentos: "Ninguno"
// Funcionalidad: "Incrementa el contador de visitas almacenado en una cookie y actualiza el elemento HTML correspondiente"
function incrementarVisitas() {
	let visitas = getCookie("contador1"); // Obtener el valor actual de la cookie
	if (visitas) {
		visitas = parseInt(visitas) + 1; // Incrementar el contador
	} else {
		visitas = 1; // Si no existe la cookie, establecer el contador en 1
	}

	setCookie("contador1", visitas, 365); // Guardar el nuevo valor en la cookie
	document.getElementById("contador1").innerText = `Numero de Visitas (Cookie): ${visitas}`; // Actualizar el texto en la página
}

// Asignar la función deleteCookie al evento onclick del botón
document.getElementById("borrarCookie").onclick = deleteCookie;

//Pd: si no funcionan recargar las cookies, prueba a abrirlo desde live server