document.addEventListener("DOMContentLoaded", () => {
	class Vuelo {
		constructor(codigo, compannia, hora_llegada, hora_salida) {
			this.codigo = codigo;
			this.compannia = compannia;
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
		constructor(nombre, numeroAulas, numeroAlumnos) {
			this.nombre = nombre;
			this.numeroAulas = numeroAulas;
			this.arrayAlumnos = [];
			for (let dni = 0; dni < numeroAlumnos; dni++) {
				this.arrayAlumnos[dni] = new Alumno(dni, "Alumno" + dni, 5, 5);
			}
		}

		consultarAlumno(dni) {
			return this.arrayAlumnos[dni];
		}

		modificarAlumno(dni, nombre, notaExamen, notaPracticas) {
			this.arrayAlumnos[dni].setNombre(nombre);
			this.arrayAlumnos[dni].setNotaExamen(notaExamen);
			this.arrayAlumnos[dni].setNotaPracticas(notaPracticas);
		}
	}

	const colegio = new Colegio("Mi Colegio", 5, 10);

	document.getElementById("botonGuardar").addEventListener("click", () => {
		const id = parseInt(document.getElementById("idEntrada").value);
		const nombre = document.getElementById("nombreEntrada").value;
		const notaPracticas = parseFloat(
			document.getElementById("notaPracticasEntrada").value
		);
		const notaExamen = parseFloat(
			document.getElementById("notaExamenEntrada").value
		);

		colegio.modificarAlumno(id, nombre, notaExamen, notaPracticas);
		alert("Datos guardados para el alumno con ID: " + id);
	});

	document.getElementById("botonMostrar").addEventListener("click", () => {
		const id = parseInt(document.getElementById("idSalida").value);
		const alumno = colegio.consultarAlumno(id);

		if (alumno) {
			document.getElementById("nombreSalida").value = alumno.getNombre();
			document.getElementById("notaPracticasSalida").value =
				alumno.getNotaPracticas();
			document.getElementById("notaExamenSalida").value =
				alumno.getNotaExamen();
			document.getElementById("notaMediaSalida").value =
				alumno.calcularNotaMedia();
		} else {
			alert("No se encontró un alumno con ID: " + id);
		}
	});
});
