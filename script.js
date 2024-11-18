class Vuelo {
	constructor(codigo, compannia, hora_llegada, hora_salida) {
		this.codigo = codigo;
		this.compannia = compannia;
		// o se coloca la hora de llegada a partir de la salida o viceversa
		// ambas no porque una depende de la otra, osea, una debe estar inicializada
		// para poder comprobar la otra, esto es para que no se puedan crear nuevos vuelos mal
		this.hora_llegada = hora_llegada;
		this.hora_salida = hora_salida;
	}

	getCodigo() {
		return this.codigo;
	}

	setCodigo(nuevoCodigo) {
		this.codigo = nuevoCodigo;
	}

	getCompannia() {
		return this.compannia;
	}

	setCompannia(nuevaCompannia) {
		this.compannia = nuevaCompannia;
	}

	getHoraLlegada() {
		return this.hora_llegada;
	}

	// falta comprobar que la hora nueva de llegada no sea inferior a la de salida
	setHoraLlegada(nuevaHoraLlegada) {
		if (compararHoras(nuevaHoraLlegada, this.hora_salida)) {
			this.hora_llegada = nuevaHoraLlegada;
		} else
			alert(
				"La hora de llegada introducida no es correcta.\nDebe ser posterior a la hora de salida"
			);
	}

	getHoraSalida() {
		return this.hora_salida;
	}

	// falta comprobar que la nueva hora de salida no supere a la hora de llegada
	setHoraSalida(nuevaHoraSalida) {
		if (!compararHoras(nuevaHoraSalida, this.hora_llegada)) {
			this.hora_salida = nuevaHoraSalida;
		} else
			alert(
				"La hora de salida introducida no es correcta.\nDebe ser anterior a la hora de llegada"
			);
	}
	compararHoras(hora1, hora2) {
		const [horas1, minutos1] = hora1.split(':').map(Number);
		const [horas2, minutos2] = hora2.split(':').map(Number);

		const minutosTotales1 = horas1 * 60 + minutos1;
		const minutosTotales2 = horas2 * 60 + minutos2;

		return minutosTotales1 <= minutosTotales2;
	}
}



class Aeropuerto {
	
	constructor(nombre, ciudad, numeroVuelosDiarios) {
		this.nombre = nombre;
		this.ciudad = ciudad;
		this.arrayVuelos = [];
	}

	guardarVuelo(vuelo) {
		this.arrayVuelos.push(vuelo);
	}

	consultarVuelo(codigo) {
		this.arrayVuelos.forEach((vuelo) => {
			if (vuelo.getCodigo() === codigo) {
				return vuelo;
			}
		});
		return null;
	}

	modificarVuelo(codigo, compania, hora_llegada, hora_salida) {
		// si el vuelo existe por ese codigo no hay porque modificalo
		// this.arrayVuelos[codigo].setCodigo(codigo);

		// se llenan solo los campos que se han modificado
		if (compania != "") {
			this.arrayVuelos[codigo].setCompannia(compania);
		}
		if (hora_llegada != "") {
			this.arrayVuelos[codigo].setHoraLlegada(hora_llegada);
		}
		if (hora_salida != "") {
			this.arrayVuelos[codigo].setHoraSalida(hora_salida);
		}
	}
}

const aeropuerto = new Aeropuerto("Nombre1", "Ciudad1", 10);
console.log(aeropuerto);


document.getElementById("botonGuardar").addEventListener("click", () => {
	const codigo = parseInt(document.getElementById("codigo").value);
	const compania = document.getElementById("compania").value;
	const hora_llegada = document.getElementById("horaLlegada").value;
	const hora_salida = document.getElementById("horaSalida").value;

	// si existe el vuelo con ese codigo lo modifica
	if (aeropuerto.consultarVuelo(codigo)) {
		Aeropuerto.modificarVuelo(
			codigo,
			compania,
			hora_llegada,
			hora_salida
		);
	}

	// si no existe lo guarda
	else {
		const vuelo = new Vuelo(
			codigo,
			compania,
			hora_llegada,
			hora_salida
		);
		aeropuerto.guardarVuelo(vuelo);
	}
	alert("Datos guardados para el vuelo con codigo: " + codigo);
	console.log(arrayVuelos);

	document.getElementById("codigo").value = "";
	document.getElementById("compania").value = "";
	document.getElementById("horaSalida").value = "";
	document.getElementById("horaLlegada").value = "";
});

document.getElementById("botonBuscar").addEventListener("click", () => {
	const codigo = parseInt(document.getElementById("codigo").value);
	const vuelo = aeropuerto.consultarVuelo(codigo);

	if (vuelo) {
		document.getElementById("compania").value = vuelo.getCompania();
		document.getElementById("horaSalida").value = vuelo.getHoraSalida();
		document.getElementById("horaLlegada").value = vuelo.getHoraLlegada();
	} else {
		alert("No se encontró un vuelo con codigo: " + codigo);
	}
});
document.getElementById("botonMostrarVuelos").addEventListener("click", () => {
	const companiaBuscada = document.getElementById("compania").value;
	const horaSalidaBuscada = document.getElementById("horaSalida").value;
	const horaLlegadaBuscada = document.getElementById("horaLlegada").value;

	// Llamar al método que muestra los vuelos según los filtros
	mostrarVuelos(companiaBuscada, horaSalidaBuscada, horaLlegadaBuscada);
});

function mostrarVuelos(compania, horaSalida, horaLlegada) {
	// Limpiar cualquier contenido anterior en la lista
	const listaVuelos = document.getElementById("listaVuelos");
	listaVuelos.innerHTML = "";

	// Filtrar los vuelos según las condiciones
	const vuelosFiltrados = aeropuerto.arrayVuelos.filter(vuelo => {
		// Si no se ha ingresado ningún valor para Compañía, se incluye ese vuelo
		const coincideCompania = compania ? vuelo.getCompania().toLowerCase() === compania.toLowerCase() : true;

		// Si no se ha ingresado ningún valor para la Hora de salida, se incluye ese vuelo
		const coincideHoraSalida = horaSalida ? vuelo.getHoraSalida() === horaSalida : true;

		// Si no se ha ingresado ningún valor para la Hora de llegada, se incluye ese vuelo
		const coincideHoraLlegada = horaLlegada ? vuelo.getHoraLlegada() === horaLlegada : true;

		return coincideCompania && coincideHoraSalida && coincideHoraLlegada;
	});

	// Si no hay vuelos que coincidan con los criterios, mostrar un mensaje
	if (vuelosFiltrados.length === 0) {
		listaVuelos.innerHTML = "<li>No se encontraron vuelos con los criterios especificados.</li>";
		return;
	}

	// Mostrar los vuelos filtrados en la lista
	vuelosFiltrados.forEach(vuelo => {
		const li = document.createElement("li");
		li.textContent = `Código: ${vuelo.getCodigo()}, Compañía: ${vuelo.getCompania()}, Hora de salida: ${vuelo.getHoraSalida()}, Hora de llegada: ${vuelo.getHoraLlegada()}`;
		listaVuelos.appendChild(li);
	});

}

