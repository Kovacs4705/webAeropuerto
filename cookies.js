// funcion para obtener la cookie por su nombre (W3schools)
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

// Crea una cookie recibiendo su nombre, valor y dias de expiracion
function setCookie(nombre, valor, dias) {
	let date = new Date();
	date.setTime(date.getTime() + dias * 24 * 60 * 60 * 1000);
	document.cookie = `${nombre}=${valor};expires=${date.toUTCString()};path=/`;
}

// Elimina la cookie del contador quitandole un año en tiempo de expiracion
function deleteCookie() {
	setCookie("contador1", "", -1);
	document.getElementById("contador1").innerText = `Numero de Visitas (Cookie): 0`;
}

// Incrementa la cookie creada y si no existiera la crea y modifica
function incrementarVisitas() {
	let visitas = getCookie("contador1");
	if (visitas) {
		visitas = parseInt(visitas) + 1;
	} else {
		visitas = 1;
	}

	setCookie("contador1", visitas, 365);
	document.getElementById("contador1").innerText = `Numero de Visitas (Cookie): ${visitas}`;
}

// Al pulsar el boton elimina la cookie
document.getElementById("borrarCookie").onclick = deleteCookie;
