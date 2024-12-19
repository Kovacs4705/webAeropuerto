// David Kovacs y Alejandro Solar

function getVisitas() {
	return parseInt(localStorage.getItem("contador2")) || 0;
}

function setVisitas(visitas) {
	localStorage.setItem("contador2", visitas);
}

function incrementarVisitasLocalStorage() {
	let visitas = getVisitas();
	visitas++;
	setVisitas(visitas);
	document.getElementById("contador2").innerText = `Numero de Visitas (LocalStorage): ${visitas}`;
}

function borrarVisitas() {
	localStorage.removeItem("contador2");
	document.getElementById("contador2").innerText = `Numero de Visitas (LocalStorage): 0`;
}

document.getElementById("borrarLocalStorage").onclick = borrarVisitas;