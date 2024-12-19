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