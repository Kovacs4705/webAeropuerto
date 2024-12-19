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

	let camposValidados = validarCampos();
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

function comprobarDni(dni, mensajeError) {
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

	// Comprobar que el DNI tiene exactamente 9 caracteres
	if (dni.length !== 9) {
		mensajeError.textContent = "El DNI debe tener exactamente 9 caracteres.";
		return false;
	}

	let numeros = dni.substring(0, 8);
	let letra = dni.charAt(8);

	// Comprobar que los primeros 8 caracteres son números
	if (!/^[0-9]{8}$/.test(numeros)) {
		mensajeError.textContent = "Los primeros 8 caracteres deben ser números.";
		return false;
	}

	// Comprobar que el noveno carácter es una letra
	if (!/^[A-Za-z]$/.test(letra)) {
		mensajeError.textContent = "El noveno carácter debe ser una letra.";
		return false;
	}

	// Convertir la letra a mayúscula para comparación
	letra = letra.toUpperCase();

	// Comprobar que la letra coincide con el cálculo del módulo 23
	if (letra !== letras[parseInt(numeros, 10) % 23]) {
		mensajeError.textContent =
			"La letra del DNI no coincide con el número proporcionado.";
		return false;
	}

	// Si todas las validaciones pasan
	return true;
}

function comprobarCorreo(correo, mensajeError) {
	let emailRegExp = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

	if (!emailRegExp.test(correo)) {
		mensajeError.textContent = "Formato Incorrecto para el correo";
		return false;
	}

	return true;
}

function comprobarCadena(nombre, mensajeError) {
	// Eliminar espacios al inicio y al final del nombre
	nombre = nombre.trim();

	// Comprobar si el nombre contiene solo números (incluso con espacios)
	if (/^[0-9\s]+$/.test(nombre)) {
		mensajeError.textContent = "El campo no puede contener solo números.";
		return false;
	}

	// Comprobar si el nombre contiene solo letras, números y espacios
	if (/^[A-Za-z0-9\s]+$/.test(nombre)) {
		return true;
	} else {
		mensajeError.textContent = "El campo contiene caracteres no permitidos.";
		return false;
	}
}

function comprobarCodigo(codigo, mensajeError) {
	if (aeropuerto.consultarVuelo(codigo) === null) {
		mensajeError.textContent = "No existe vuelo con el codigo introducido";
		return false;
	}
	return true;
}

function comprobarMetodoPago() {
	esValido = true;
	console.log("Aqui llego");

	// Validar el campo Método de Pago (al menos uno debe estar seleccionado)
	const metodoPago = document.querySelector('input[name="metodoPago"]:checked');
	const errorMetodoPago = document.getElementById("errorMetodoPago");
	if (!metodoPago) {
		console.log("Aqui llego");
		
		mostrarError(errorMetodoPago, "Debe seleccionar un método de pago.");
		esValido = false;
	} else {
		mostrarExito(errorMetodoPago);
	}
	return esValido;
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

function validarCampos() {
	let camposValidos = true;

	// Lista de campos a validar
	const camposFormulario = [
		{ id: "dni", funcionValidacion: comprobarDni },
		{ id: "nombre", funcionValidacion: comprobarCadena },
		{ id: "apellidos", funcionValidacion: comprobarCadena },
		{ id: "email", funcionValidacion: comprobarCorreo },
		{ id: "idVuelo", funcionValidacion: comprobarCodigo },
	];

	// Recorrer los campos y validar
	camposFormulario.forEach((campo) => {
		const elemento = document.getElementById(campo.id);
		const errorMsg = document.getElementById(
			"error" + campo.id.charAt(0).toUpperCase() + campo.id.slice(1)
		);

		// Verificar si el campo está vacío
		if (elemento.value.trim() === "") {
			mostrarError(errorMsg, "Este campo no puede estar vacío.");
			camposValidos = false;
		} else {
			// Validar el campo con su función específica
			if (!campo.funcionValidacion(elemento.value, errorMsg)) {
				mostrarError(errorMsg);
				camposValidos = false;
			} else {
				mostrarExito(errorMsg, elemento);
			}
		}
	});

	return camposValidos;
}

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

window.onload = function () {
	document.getElementById("dni").addEventListener("blur", () => {
		if (
			!comprobarDni(
				document.getElementById("dni").value,
				document.getElementById("errorDni")
			)
		) {
			mostrarError(document.getElementById("errorDni"));
		}
		else mostrarExito(document.getElementById("errorDni"));
	});

	document.getElementById("nombre").addEventListener("blur", () => {
		if (
			!comprobarCadena(
				document.getElementById("nombre").value,
				document.getElementById("errorNombre")
			)
		) {
			mostrarError(document.getElementById("errorNombre"));
		} else mostrarExito(document.getElementById("errorNombre"));
	});

	document.getElementById("apellidos").addEventListener("blur", () => {
		if (
			!comprobarCadena(
				document.getElementById("apellidos").value,
				document.getElementById("errorApellidos")
			)
		) {
			mostrarError(document.getElementById("errorApellidos"));
		} else mostrarExito(document.getElementById("errorApellidos"));
	});

	document.getElementById("email").addEventListener("blur", () => {
		if (
			!comprobarCorreo(
				document.getElementById("email").value,
				document.getElementById("errorEmail")
			)
		) {
			mostrarError(document.getElementById("errorEmail"));
		} else mostrarExito(document.getElementById("errorEmail"));
	});

	document.getElementById("idVuelo").addEventListener("blur", () => {
		if (
			!comprobarCodigo(
				document.getElementById("idVuelo").value,
				document.getElementById("errorIdVuelo")
			)
		) {
			mostrarError(document.getElementById("errorIdVuelo"));
		} else mostrarExito(document.getElementById("errorIdVuelo"));
	});
};

// ---------------- Formulario iniciar Sesion ---------------
const inicio = document.getElementById("contenedor3");
const boton = document.getElementById("iniciarSesion");
const boton2 = document.getElementById("invitado");
const spinner = document.getElementById("loader");
const formulario = document.getElementById("contenedorFormularios");

boton2.addEventListener("click", () => {
	inicio.style.display = "none";
	boton.style.display = "none"; // Ocultar el botón
	spinner.style.display = "flex"; // Mostrar el spinner

	const guardar = document.getElementById("contenedor1");
	guardar.style.filter = "blur(5px)";
	const campos = guardar.elements;

	for (let i = 0; i < campos.length; i++) {
		campos[i].disabled = true;
	}
	campos["botonGuardar"].style.transition = "none";
	campos["botonBuscar"].style.transition = "none";
	campos["botonGuardar"].style.transform = "none";
	campos["botonBuscar"].style.transform = "none";
	campos["botonGuardar"].style.boxShadow = "none";
	campos["botonBuscar"].style.boxShadow = "none";

	setTimeout(() => {
		spinner.style.display = "none"; // Ocultar el spinner
		formulario.style.display = "flex"; // Mostrar el formulario
	}, 3000); // Esperar 2 segundos
});

boton.addEventListener("click", () => {
	let logeado = false;

	// Array de usuarios y contraseñas
	let usuarios = [
		{ usuario: "david", contrasenia: "david" },
		{ usuario: "alejandro", contrasenia: "alejandro" },
	];

	// Convertir el array a JSON (opcional si quieres demostrar JSON.stringify/parse)
	let textoJSON = JSON.stringify(usuarios);
	let arrayReconstruido = JSON.parse(textoJSON);

	// Verificar credenciales

	const usuario = document.getElementById("usuario").value;
	const contrasenia = document.getElementById("contrasenia").value;

	const validarUsuario = arrayReconstruido.find(
		(user) => user.usuario === usuario && user.contrasenia === contrasenia
	);

	if (validarUsuario) {
		logeado = true;
		alert("Login exitoso. Puedes añadir vuelos.");
		inicio.style.display = "none";
		boton.style.display = "none"; // Ocultar el botón
		spinner.style.display = "flex"; // Mostrar el spinner
		setTimeout(() => {
			spinner.style.display = "none"; // Ocultar el spinner
			formulario.style.display = "flex"; // Mostrar el formulario
		}, 3000); // Esperar 2 segundos
	} else {
		logeado = false;
		alert("Credenciales incorrectas. Intenta de nuevo.");
	}
});

// ---------------- Confirmar Usuario ----------------
