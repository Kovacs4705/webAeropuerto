// Nombre de la Funcion: "mostrarError"
// Argumentos: "errorMsg - elemento HTML para mostrar el mensaje de error, mensaje - mensaje de error opcional"
// Funcionalidad: "Muestra un mensaje de error en el elemento HTML especificado."
function mostrarError(errorMsg, mensaje = null) {
	if (mensaje) {
		errorMsg.textContent = mensaje;
	}
	errorMsg.classList.remove("mensaje");
	errorMsg.classList.add("noValido");
}

// Nombre de la Funcion: "mostrarExito"
// Argumentos: "errorMsg - elemento HTML para mostrar el mensaje de éxito, elemento - elemento HTML opcional para eliminar la clase de error"
// Funcionalidad: "Muestra un mensaje de éxito en el elemento HTML especificado."
function mostrarExito(errorMsg, elemento = null) {
	errorMsg.textContent = "";
	errorMsg.classList.remove("noValido");
	if (elemento) {
		elemento.classList.remove("error");
	}
}

// Nombre de la Funcion: "mostrarVuelos"
// Argumentos: "vuelos - array de objetos Vuelo a mostrar"
// Funcionalidad: "Muestra una lista de vuelos en una tabla HTML."
function mostrarVuelos(vuelos) {
	// Obtener el contenedor de la tabla
	const listaVuelos = document.getElementById("listaVuelos");
	listaVuelos.innerHTML = ""; // Limpiar antes de mostrar nuevos resultados

	// Verificar si hay vuelos para mostrar
	if (vuelos.length === 0) {
		listaVuelos.innerHTML =
			"<p>No se encontraron vuelos con los criterios especificados.</p>";
		return;
	}

	// Crear la tabla y cabecera
	const tabla = document.createElement("table");
	const cabecera = document.createElement("thead");
	cabecera.innerHTML = `
		<tr>
			<th>Código</th>
			<th>Compañía</th>
			<th>Hora de salida</th>
			<th>Hora de llegada</th>
		</tr>`;
	tabla.appendChild(cabecera);

	// Crear el cuerpo de la tabla
	const cuerpo = document.createElement("tbody");
	vuelos.forEach((vuelo) => {
		const fila = document.createElement("tr");
		fila.innerHTML = `
			<td>${vuelo.getCodigo()}</td>
			<td>${vuelo.getCompania()}</td>
			<td>${vuelo.getHoraSalida()}</td>
			<td>${vuelo.getHoraLlegada()}</td>`;
		cuerpo.appendChild(fila);
	});
	tabla.appendChild(cuerpo);

	// Agregar la tabla al contenedor
	listaVuelos.appendChild(tabla);
}
