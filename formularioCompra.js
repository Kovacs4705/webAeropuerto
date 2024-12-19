// David Kovacs y Alejandro Solar

// ---------------- Cargar Datos y guardarlos ----------------
// Acceso al formulario
const reservar = document.getElementById("formularioCompra");

// Botón "Recordar" - Guardar datos en localStorage
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

		establecerLocalStorage("datosFormulario", JSON.stringify(datosFormulario));
		alert("Datos guardados en localStorage.");
	}
});

// Botón "Cargar" - Recuperar datos de localStorage
document.getElementById("botonCargar").addEventListener("click", () => {
	const datosFormulario = JSON.parse(obtenerLocalStorage("datosFormulario"));

	if (datosFormulario) {
		reservar.querySelector("#dni").value = datosFormulario.dni;
		reservar.querySelector("#nombre").value = datosFormulario.nombre;
		reservar.querySelector("#apellidos").value = datosFormulario.apellidos;
		reservar.querySelector("#email").value = datosFormulario.email;
		alert("Datos cargados en el formulario.");
		validar = validarCampos(false);
	} else {
		alert("No hay datos guardados.");
	}
});

// Función para establecer datos en localStorage
function establecerLocalStorage(clave, valor) {
	localStorage.setItem(clave, valor);
}

// Función para obtener datos de localStorage
function obtenerLocalStorage(clave) {
	return localStorage.getItem(clave);
}
