document.addEventListener("DOMContentLoaded", () => {
	class Vuelo {
		constructor(codigo, compannia, hora_llegada, hora_salida) {
			this.codigo = codigo;
			this.compannia = compannia;
			// o se coloca la hora de llegada a partir de la salida o viceversa
			// ambas no porque una depende de la otra, osea, una debe estar inicializada
			// para poder comprobar la otra, esto es para que no se puedan crear nuevos vuelos mal
			this.hora_llegada = this.setHoraLlegada(hora_llegada);
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
			if (fechaNuevaMayor(nuevaHoraLlegada, this.hora_salida)) {
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
			if (!fechaNuevaMayor(nuevaHoraSalida, this.hora_llegada)) {
				this.hora_salida = nuevaHoraSalida;
			} else
				alert(
					"La hora de salida introducida no es correcta.\nDebe ser anterior a la hora de llegada"
				);
		}
	}

	function fechaNuevaMayor(horaNueva, horaActual) {
		if (
			parseInt(horaNueva.splice(2, 1)) -
				parseInt(horaActual.splice(2, 1)) >
			0
		) {
			return true;
		}
		return false;
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
	});

	document.getElementById("botonMostrar").addEventListener("click", () => {
		const codigo = parseInt(document.getElementById("codigoMostrar").value);
		const vuelo = Aeropuerto.consultarVuelo(codigo);

		if (vuelo) {
			document.getElementById("codigo").value = vuelo.getCodigo();
			document.getElementById("compania").value = vuelo.getCompania();
			document.getElementById("horaLlegada").value =
				vuelo.getHoraLlegada();
			document.getElementById("horaSalida").value = vuelo.getHoraSalida();
		} else {
			alert("No se encontró un vuelo con el código: " + codigo);
		}
	});
});
