// David Kovacs y Alejandro Solar

// Crear el aeropuerto
const aeropuerto = new Aeropuerto("Nombre1", "Ciudad1", 10);

// ---------------- Formulario iniciar Sesion ---------------
const formularioInicioSesion = document.getElementById("contenedor3");
const botonInicioSesion = document.getElementById("iniciarSesion");
const botonInvitado = document.getElementById("invitado");
const spinner = document.getElementById("loader");
const contenedorFormularios = document.getElementById("contenedorFormularios");

// Maneja el evento de clic en el botón de invitado
botonInvitado.addEventListener("click", () => {
	formularioInicioSesion.style.display = "none";
	botonInicioSesion.style.display = "none"; // Ocultar el botón
	spinner.style.display = "flex"; // Mostrar el spinner

	const formularioGuardarVuelo = document.getElementById("contenedor1");
	formularioGuardarVuelo.style.filter = "blur(5px)";
	const camposGuardarVuelo = formularioGuardarVuelo.elements;

	for (let i = 0; i < camposGuardarVuelo.length; i++) {
		camposGuardarVuelo[i].disabled = true;
	}

	// se puede mejorar
	camposGuardarVuelo["botonGuardar"].style.transition = "none";
	camposGuardarVuelo["botonBuscar"].style.transition = "none";
	camposGuardarVuelo["botonGuardar"].style.transform = "none";
	camposGuardarVuelo["botonBuscar"].style.transform = "none";
	camposGuardarVuelo["botonGuardar"].style.boxShadow = "none";
	camposGuardarVuelo["botonBuscar"].style.boxShadow = "none";

	setTimeout(() => {
		spinner.style.display = "none"; // Ocultar el spinner
		contenedorFormularios.style.display = "flex"; // Mostrar todo menos el spinner y el inicio sesion
	}, 3000); // Esperar 2 segundos
});

// Maneja el evento de clic en el botón de inicio de sesión
botonInicioSesion.addEventListener("click", () => {
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
		alert("Login exitoso. Puedes añadir vuelos.");
		formularioInicioSesion.style.display = "none";
		spinner.style.display = "flex"; // Mostrar el spinner
		setTimeout(() => {
			spinner.style.display = "none"; // Ocultar el spinner
			contenedorFormularios.style.display = "flex"; // Mostrar el formulario
		}, 3000); // Esperar 3 segundos
	} else {
		alert("Credenciales incorrectas. Intenta de nuevo.");
	}
});

// comprueba que no se pase de 120 caracteres el textarea
comprobarTextaera();
