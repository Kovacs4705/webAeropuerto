// David Kovacs y Alejandro Solar

// Nombre de la Funcion: "comprobarCampoVacio"
// Argumentos: "campo - el valor del campo a comprobar, mensaje - el mensaje de error a mostrar"
// Funcionalidad: "Comprueba si un campo está vacío y muestra un mensaje de error si es así."
function comprobarCampoVacio(campo, mensaje) {
	if (campo.trim() === "") {
		console.log("Estoy Aqui");
		
		mostrarError(mensaje, "Este campo no puede estar vacío.");
		return false;
	}
	return true;
}

// Nombre de la Funcion: "comprobarDni"
// Argumentos: "dni - el valor del DNI a comprobar, mensajeError - el mensaje de error a mostrar"
// Funcionalidad: "Comprueba si un DNI es válido según las reglas españolas."
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

	if (comprobarCampoVacio(dni, mensajeError)) {
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
}

// Nombre de la Funcion: "comprobarCorreo"
// Argumentos: "correo - el valor del correo a comprobar, mensajeError - el mensaje de error a mostrar"
// Funcionalidad: "Comprueba si un correo electrónico tiene un formato válido."
function comprobarCorreo(correo, mensajeError) {
	let emailRegExp = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

	if (comprobarCampoVacio(correo, mensajeError)) {
		if (!emailRegExp.test(correo)) {
			mensajeError.textContent = "Formato Incorrecto para el correo";
			return false;
		}
	}

	return true;
}

// Nombre de la Funcion: "comprobarCadena"
// Argumentos: "nombre - el valor del nombre a comprobar, mensajeError - el mensaje de error a mostrar"
// Funcionalidad: "Comprueba si una cadena no contiene caracteres no permitidos."
function comprobarCadena(nombre, mensajeError) {
	// Eliminar espacios al inicio y al final del nombre
	nombre = nombre.trim();

	if (comprobarCampoVacio(nombre, mensajeError)) {
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
}

// Nombre de la Funcion: "comprobarCodigo"
// Argumentos: "codigo - el valor del código a comprobar, mensajeError - el mensaje de error a mostrar"
// Funcionalidad: "Comprueba si un código de vuelo existe en el aeropuerto."
function comprobarCodigo(codigo, mensajeError) {
	if (comprobarCampoVacio(codigo, mensajeError)) {
		if (aeropuerto.consultarVuelo(codigo) === null) {
			mensajeError.textContent = "No existe vuelo con el codigo introducido";
			return false;
		}
		return true;
	}
}

// Nombre de la Funcion: "comprobarMetodoPago"
// Argumentos: "Ninguno"
// Funcionalidad: "Comprueba si se ha seleccionado un método de pago."
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

// Nombre de la Funcion: "comprobarTextaera"
// Argumentos: "params - parámetros adicionales (no utilizados)"
// Funcionalidad: "Comprueba y actualiza el contador de caracteres restantes en un textarea."
const textArea = document.getElementById("comentario");
const charRemaining = document.getElementById("charRemaining");

// Límite máximo de caracteres
const maxChars = 120;

function comprobarTextaera(params) {
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
}

// Nombre de la Funcion: "validarCampos"
// Argumentos: "blur - booleano que indica si se debe validar al perder el foco"
// Funcionalidad: "Valida todos los campos del formulario según sus reglas específicas."
function validarCampos(blur) {
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

		if (blur) {
			elemento.addEventListener("blur", () => {
				if (!campo.funcionValidacion(elemento.value, errorMsg)) {
					mostrarError(errorMsg);
					camposValidos = false;
				} else {
					mostrarExito(errorMsg, elemento);
				}
			});
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

window.onload = function () {
	validacion = validarCampos(true);
	incrementarVisitas();  // Función para el contador de cookies
    incrementarVisitasLocalStorage();  // Función para el contador de localStorage
};
