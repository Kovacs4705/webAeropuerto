document.getElementById("botonGuardar").addEventListener("click", () => {
	const codigo = document.getElementById("codigo").value;
	const compania = document.getElementById("compania").value;
	const hora_llegada = document.getElementById("horaLlegada").value;
	const hora_salida = document.getElementById("horaSalida").value;

	// si existe el vuelo con ese codigo lo modifica
	if (aeropuerto.consultarVuelo(codigo) != null) {
		aeropuerto.modificarVuelo(codigo, compania, hora_llegada, hora_salida);
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

document.getElementById("botonConfirmar").addEventListener("click", () => {
	let idVuelo = document.getElementById("idVuelo").value;
	let dni = document.getElementById("dni").value;
	let nombre = document.getElementById("nombre").value;

	let camposValidados = validarCampos(false);
	let pagoComprobado = comprobarMetodoPago();

	if (camposValidados && pagoComprobado) {
		let resultado = confirm(
			"Se reservara un pasaje para el vuelo con codigo: " +
				idVuelo +
				"\npara el cliente: " +
				nombre +
				"\nCon dni: " +
				dni
		);
		if (resultado) {
			alert("Reserva realizada con exito");
		} else alert("Se ha cancelado la reserva");
	}
	else alert("Datos introdcidos incorrectos");
});