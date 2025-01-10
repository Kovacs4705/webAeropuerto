// David Kovacs y Alejandro Solar

// ---------------- Cargar Datos y guardarlos ----------------
// Acceso al formulario
const reservar = document.getElementById("formularioCompra");

// Guarda los datos del formulario en localStorage si los datos son válidos
document.getElementById("botonRecordar").addEventListener("click", () => {
	if (!validarCampos(false)) {
		alert("Datos Incorrectos, no se guardará la información");
	} else {
		const datosFormulario = {
			dni: reservar.querySelector("#dni").value,
			nombre: reservar.querySelector("#nombre").value,
			apellidos: reservar.querySelector("#apellidos").value,
			email: reservar.querySelector("#email").value,
		};

		establecerLocalStorage("datosFormulario", JSON.stringify(datosFormulario)); // Guardar los datos en localStorage
		alert("Datos guardados en localStorage.");
	}
});

// Carga los datos del formulario desde localStorage si existen
document.getElementById("botonCargar").addEventListener("click", () => {
	const datosFormulario = JSON.parse(obtenerLocalStorage("datosFormulario")); // Obtener los datos de localStorage

	if (datosFormulario) {
		reservar.querySelector("#dni").value = datosFormulario.dni;
		reservar.querySelector("#nombre").value = datosFormulario.nombre;
		reservar.querySelector("#apellidos").value = datosFormulario.apellidos;
		reservar.querySelector("#email").value = datosFormulario.email;
		alert("Datos cargados en el formulario.");
		validar = validarCampos(false); // Validar los campos cargados
	} else {
		alert("No hay datos guardados.");
	}
});

// Establece un valor en localStorage con la clave proporcionada
function establecerLocalStorage(clave, valor) {
	localStorage.setItem(clave, valor);
}

// Obtiene un valor de localStorage usando la clave proporcionada
function obtenerLocalStorage(clave) {
	return localStorage.getItem(clave);
}
