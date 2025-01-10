// David Kovacs y Alejandro Solar

// Obtiene el número de visitas almacenadas en localStorage
function getVisitas() {
	return parseInt(localStorage.getItem("contador2")) || 0;
}

// Establece el número de visitas en localStorage
function setVisitas(visitas) {
	localStorage.setItem("contador2", visitas);
}

// Incrementa el contador de visitas almacenado en localStorage y actualiza el elemento HTML correspondiente
function incrementarVisitasLocalStorage() {
	let visitas = getVisitas(); // Obtener el número actual de visitas
	visitas++; // Incrementar el contador
	setVisitas(visitas); // Guardar el nuevo valor en localStorage
	document.getElementById("contador2").innerText = `Numero de Visitas (LocalStorage): ${visitas}`; // Actualizar el texto en la página
}

// Elimina el contador de visitas de localStorage y actualiza el elemento HTML correspondiente
function borrarVisitas() {
	localStorage.removeItem("contador2"); // Eliminar el contador de localStorage
	document.getElementById("contador2").innerText = `Numero de Visitas (LocalStorage): 0`; // Actualizar el texto en la página
}

// Asignar la función borrarVisitas al evento onclick del botón
document.getElementById("borrarLocalStorage").onclick = borrarVisitas;