function mostrarError(errorMsg, mensaje = null) {
	if (mensaje) {
		errorMsg.textContent = mensaje;
	}
	errorMsg.classList.remove("mensaje");
	errorMsg.classList.add("noValido");
}

function mostrarExito(errorMsg, elemento = null) {
	errorMsg.textContent = "";
	errorMsg.classList.remove("noValido");
	if (elemento) {
		elemento.classList.remove("error");
	}
}

function mostrarVuelos(vuelos) {
	// Limpiar la lista antes de mostrar nuevos resultados
	const listaVuelos = document.getElementById("listaVuelos");
	listaVuelos.innerHTML = "";

	// Verificar si hay vuelos para mostrar
	if (vuelos.length === 0) {
		listaVuelos.innerHTML =
			"<li>No se encontraron vuelos con los criterios especificados.</li>";
		return;
	}

	// Crear elementos de la lista para cada vuelo encontrado
	vuelos.forEach((vuelo) => {
		const li = document.createElement("li");
		li.textContent = `Código: ${vuelo.getCodigo()}, Compañía: ${vuelo.getCompania()}, Hora de salida: ${vuelo.getHoraSalida()}, Hora de llegada: ${vuelo.getHoraLlegada()}`;
		listaVuelos.appendChild(li);
	});
}