// @Alejandro Solar y David Kovacs
class Vuelo {
	constructor(codigo, compannia, hora_llegada, hora_salida) {
		this.codigo = codigo;
		this.compannia = compannia;
		// o se coloca la hora de llegada a partir de la salida o viceversa
		// ambas no porque una depende de la otra, osea, una debe estar inicializada
		// para poder comprobar la otra, esto es para que no se puedan crear nuevos vuelos mal
		this.hora_salida = hora_salida;
		if (this.compararHoras(hora_salida, hora_llegada)) {
			this.hora_llegada = hora_llegada;
		} else {
			alert("La hora de llegada no puede ser anterior a la de salida.");
			this.hora_llegada = null; // O un valor por defecto
		}
	}

	getCodigo() {
		return this.codigo;
	}

	setCodigo(nuevoCodigo) {
		this.codigo = nuevoCodigo;
	}

	getCompania() {
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
		if (this.compararHoras(nuevaHoraLlegada, this.hora_salida)) {
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
		if (!this.compararHoras(nuevaHoraSalida, this.hora_llegada)) {
			this.hora_salida = nuevaHoraSalida;
		} else
			alert(
				"La hora de salida introducida no es correcta.\nDebe ser anterior a la hora de llegada"
			);
	}

	compararHoras(hora1, hora2) {
		if (!hora1 || !hora2) return false; // Validación por si alguna hora es nula
		const [horas1, minutos1] = hora1.split(":").map(Number);
		const [horas2, minutos2] = hora2.split(":").map(Number);

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
		console.log("vuelo guardado");
	}

	consultarVuelo(codigo) {
		return this.arrayVuelos.find((vuelo) => vuelo.getCodigo() === codigo) || null;
	}

	modificarVuelo(codigo, compania, hora_llegada, hora_salida) {
		const vuelo = this.consultarVuelo(codigo);
		if (!vuelo) {
			return;
		}

		// se llenan solo los campos que se han modificado
		if (compania != "") {
			vuelo.setCompannia(compania);
		}
		if (hora_llegada != "") {
			vuelo.setHoraLlegada(hora_llegada);
		}
		if (hora_salida != "") {
			vuelo.setHoraSalida(hora_salida);
		}
	}
}

const aeropuerto = new Aeropuerto("Nombre1", "Ciudad1", 10);

document.getElementById("botonGuardar").addEventListener("click", () => {
	const codigo = document.getElementById("codigo").value;
	const compania = document.getElementById("compania").value;
	const hora_llegada = document.getElementById("horaLlegada").value;
	const hora_salida = document.getElementById("horaSalida").value;

	// si existe el vuelo con ese codigo lo modifica
	if (aeropuerto.consultarVuelo(codigo) != null) {
		Aeropuerto.modificarVuelo(codigo, compania, hora_llegada, hora_salida);
		alert("Datos guardados para el vuelo con codigo: " + codigo);
	}

	// si no existe lo guarda
	else {
		if (
			codigo === "" ||
			compania === "" ||
			hora_salida === "" ||
			hora_llegada === null
		) {
			alert("Por favor introduzca valores en todos los campos");
		} else {
			const vuelo = new Vuelo(codigo, compania, hora_llegada, hora_salida);
			if (vuelo.getHoraLlegada() !== null) {
				aeropuerto.guardarVuelo(vuelo);
				alert("Datos guardados para el vuelo con codigo: " + codigo);
			}
		}
	}

	document.getElementById("codigo").value = "";
	document.getElementById("compania").value = "";
	document.getElementById("horaSalida").value = "";
	document.getElementById("horaLlegada").value = "";
});

document.getElementById("botonBuscar").addEventListener("click", () => {
	// Obtener los valores ingresados por el usuario
	const codigo = document.getElementById("codigo").value;
	const companiaBuscada = document.getElementById("compania").value;
	const horaSalidaBuscada = document.getElementById("horaSalida").value;
	const horaLlegadaBuscada = document.getElementById("horaLlegada").value;

	// Buscar por los criterios
	const vuelosFiltrados = aeropuerto.arrayVuelos.filter((vuelo) => {
		const coincideCodigo = codigo ? vuelo.getCodigo() === codigo : true;
		const coincideCompania = companiaBuscada
			? vuelo.getCompania().toLowerCase() === companiaBuscada.toLowerCase()
			: true;
		const coincideHoraSalida = horaSalidaBuscada
			? vuelo.getHoraSalida() === horaSalidaBuscada
			: true;
		const coincideHoraLlegada = horaLlegadaBuscada
			? vuelo.getHoraLlegada() === horaLlegadaBuscada
			: true;

		return (
			coincideCodigo &&
			coincideCompania &&
			coincideHoraSalida &&
			coincideHoraLlegada
		);
	});

	mostrarVuelos(vuelosFiltrados);
});

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

function comprobarDni(dni) {
	let letras = [
		"T",
		"R",
		"W",
		"A",
		"G",
		"M",
		"Y",
		"F",
		"P",
		"D",
		"X",
		"B",
		"N",
		"J",
		"Z",
		"S",
		"Q",
		"V",
		"H",
		"L",
		"C",
		"K",
		"E",
		"T",
	];

	let dniRegExp = new RegExp(/^[0-9]{8}[A-Za-z]$/);

	if (dniRegExp.test(dni)) {
		let letra = dni.charAt(8);

		if (letra === letras[numeros % 23]) {
			return true;
		}
	}
	return false;
}

function comprobarCorreo(correo) {
	let emailRegExp = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
	return emailRegExp.test(correo);
}

function comprobarCodigo(codigo) {
	if (aeropuerto.consultarVuelo(codigo) === null) {
		return false;
	}
	return true;
}

// ---------- FUNCIONALIDAD DEL CONTADOR DE CARACTERES TEXTAREA -----------
const textArea = document.getElementById("comentario");
const charRemaining = document.getElementById("charRemaining");

// Límite máximo de caracteres
const maxChars = 120;

// Función para actualizar el contador
textArea.addEventListener("input", () => {
	// Calcula los caracteres restantes
	const remaining = maxChars - textArea.value.length;

	// Si el usuario se acerca al límite, cambia el estilo
	if (remaining <= 20) {
		charRemaining.classList.add("warning");
	} else {
		charRemaining.classList.remove("warning");
	}

	if (remaining <= 0) {
		textArea.value = textArea.value.slice(0, maxChars);
	}

	// Actualiza el contador en pantalla
	charRemaining.textContent = Math.max(remaining, 0);
});

window.onload = function () {
	// Comprobar DNI al perder el foco
	dni.addEventListener("blur", () => {
		console.log("Evento blur activado");
		if (!comprobarDni(dni.value)) {
			dni.classList.add("error");
			dni.value = "Introduce correctamente el valor del campo";
		} else {
			dni.classList.remove("error");
		}
	});

	// Comprobar correo al perder el foco
	const email = document.getElementById("email");
	email.addEventListener("blur", () => {
		if (!comprobarCorreo(email.value)) {
			email.classList.add("error");
			email.value = "Introduce correctamente el valor del campo";
		} else {
			email.classList.remove("error");
		}
	});

	// Comprobar código de vuelo al perder el foco
	const idVuelo = document.getElementById("idVuelo");
	idVuelo.addEventListener("blur", () => {
		if (!comprobarCodigo(idVuelo.value)) {
			idVuelo.classList.add("error");
			idVuelo.value = "Introduce correctamente el valor del campo";
		} else {
			idVuelo.classList.remove("error");
		}
	});
};
