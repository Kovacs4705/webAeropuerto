document.addEventListener("DOMContentLoaded", () => {
    class Alumno {
        constructor(dni, nombre, notaExamen, notaPracticas) {
            this.dni = dni;
            this.nombre = nombre;
            this.notaExamen = notaExamen;
            this.notaPracticas = notaPracticas;
        }
        getNombre() {
            return this.nombre;
        }
        
        setNombre(nombre) {
            this.nombre = nombre;
        }
        
        getNotaExamen() {
            return this.notaExamen;
        }
        
        setNotaExamen(notaExamen) {
            this.notaExamen = notaExamen;
        }
        
        getNotaPracticas() {
            return this.notaPracticas;
        }
        
        setNotaPracticas(notaPracticas) {
            this.notaPracticas = notaPracticas;
        }

        calcularNotaMedia() {
            return (this.notaExamen + this.notaPracticas) / 2;
        }
    }

    class Colegio {
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
        const notaPracticas = parseFloat(document.getElementById("notaPracticasEntrada").value);
        const notaExamen = parseFloat(document.getElementById("notaExamenEntrada").value);
        
        colegio.modificarAlumno(id, nombre, notaExamen, notaPracticas);
        alert("Datos guardados para el alumno con ID: " + id);
    });

    document.getElementById("botonMostrar").addEventListener("click", () => {
        const id = parseInt(document.getElementById("idSalida").value);
        const alumno = colegio.consultarAlumno(id);
        
        if (alumno) {
            document.getElementById("nombreSalida").value = alumno.getNombre();
            document.getElementById("notaPracticasSalida").value = alumno.getNotaPracticas();
            document.getElementById("notaExamenSalida").value = alumno.getNotaExamen();
            document.getElementById("notaMediaSalida").value = alumno.calcularNotaMedia();
        } else {
            alert("No se encontró un alumno con ID: " + id);
        }
    });
});