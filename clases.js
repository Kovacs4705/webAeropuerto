// David Kovacs y Alejandro Solar

class Vuelo {
	// Nombre de la Funcion: "constructor"
	// Argumentos: "codigo - código del vuelo, compannia - compañía del vuelo, hora_llegada - hora de llegada del vuelo, hora_salida - hora de salida del vuelo"
	// Funcionalidad: "Inicializa un objeto Vuelo con los valores proporcionados y valida las horas."
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

	// Nombre de la Funcion: "getCodigo"
	// Argumentos: "Ninguno"
	// Funcionalidad: "Devuelve el código del vuelo."
	getCodigo() {
		return this.codigo;
	}

	// Nombre de la Funcion: "setCodigo"
	// Argumentos: "nuevoCodigo - el nuevo código del vuelo"
	// Funcionalidad: "Establece un nuevo código para el vuelo."
	setCodigo(nuevoCodigo) {
		this.codigo = nuevoCodigo;
	}

	// Nombre de la Funcion: "getCompania"
	// Argumentos: "Ninguno"
	// Funcionalidad: "Devuelve la compañía del vuelo."
	getCompania() {
		return this.compannia;
	}

	// Nombre de la Funcion: "setCompannia"
	// Argumentos: "nuevaCompannia - la nueva compañía del vuelo"
	// Funcionalidad: "Establece una nueva compañía para el vuelo."
	setCompannia(nuevaCompannia) {
		this.compannia = nuevaCompannia;
	}

	// Nombre de la Funcion: "getHoraLlegada"
	// Argumentos: "Ninguno"
	// Funcionalidad: "Devuelve la hora de llegada del vuelo."
	getHoraLlegada() {
		return this.hora_llegada;
	}

	// Nombre de la Funcion: "setHoraLlegada"
	// Argumentos: "nuevaHoraLlegada - la nueva hora de llegada del vuelo"
	// Funcionalidad: "Establece una nueva hora de llegada para el vuelo, validando que sea posterior a la hora de salida."
	setHoraLlegada(nuevaHoraLlegada) {
		if (this.compararHoras(nuevaHoraLlegada, this.hora_salida)) {
			this.hora_llegada = nuevaHoraLlegada;
		} else
			alert(
				"La hora de llegada introducida no es correcta.\nDebe ser posterior a la hora de salida"
			);
	}

	// Nombre de la Funcion: "getHoraSalida"
	// Argumentos: "Ninguno"
	// Funcionalidad: "Devuelve la hora de salida del vuelo."
	getHoraSalida() {
		return this.hora_salida;
	}

	// Nombre de la Funcion: "setHoraSalida"
	// Argumentos: "nuevaHoraSalida - la nueva hora de salida del vuelo"
	// Funcionalidad: "Establece una nueva hora de salida para el vuelo, validando que sea anterior a la hora de llegada."
	setHoraSalida(nuevaHoraSalida) {
		if (!this.compararHoras(nuevaHoraSalida, this.hora_llegada)) {
			this.hora_salida = nuevaHoraSalida;
		} else
			alert(
				"La hora de salida introducida no es correcta.\nDebe ser anterior a la hora de llegada"
			);
	}

	// Nombre de la Funcion: "compararHoras"
	// Argumentos: "hora1 - primera hora a comparar, hora2 - segunda hora a comparar"
	// Funcionalidad: "Compara dos horas en formato HH:MM y devuelve true si la primera es menor o igual que la segunda."
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
	// Nombre de la Funcion: "constructor"
	// Argumentos: "nombre - nombre del aeropuerto, ciudad - ciudad del aeropuerto, numeroVuelosDiarios - número de vuelos diarios del aeropuerto"
	// Funcionalidad: "Inicializa un objeto Aeropuerto con los valores proporcionados."
	constructor(nombre, ciudad, numeroVuelosDiarios) {
		this.nombre = nombre;
		this.ciudad = ciudad;
		this.arrayVuelos = [];
	}

	// Nombre de la Funcion: "guardarVuelo"
	// Argumentos: "vuelo - objeto Vuelo a guardar"
	// Funcionalidad: "Guarda un vuelo en el array de vuelos del aeropuerto."
	guardarVuelo(vuelo) {
		this.arrayVuelos.push(vuelo);
		console.log("vuelo guardado");
	}

	// Nombre de la Funcion: "consultarVuelo"
	// Argumentos: "codigo - código del vuelo a consultar"
	// Funcionalidad: "Busca y devuelve un vuelo por su código, o null si no se encuentra."
	consultarVuelo(codigo) {
		return this.arrayVuelos.find((vuelo) => vuelo.getCodigo() === codigo) || null;
	}

	// Nombre de la Funcion: "modificarVuelo"
	// Argumentos: "codigo - código del vuelo a modificar, compania - nueva compañía del vuelo, hora_llegada - nueva hora de llegada del vuelo, hora_salida - nueva hora de salida del vuelo"
	// Funcionalidad: "Modifica los datos de un vuelo existente en el aeropuerto."
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