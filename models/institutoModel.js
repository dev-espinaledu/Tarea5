const db = require("../config/db.js")

function traerEstudiantes(callback) {
    db.query("SELECT * FROM estudiantes", (err, results) => {
        if (err) {
            console.log("No se pudo hacer la consulta");
        } else {
            callback(results)
        }
    })
}
function agregarEstudiante(nuevoEstudiante, callback) {
    let estudianteI = "INSERT INTO estudiantes (nombre, apellido, edad, grado, fecha_registro) VALUES(?, ?, ?, ?, ?)"
    db.query(estudianteI, [nuevoEstudiante.nombre, nuevoEstudiante.apellido, nuevoEstudiante.edad, nuevoEstudiante.grado, nuevoEstudiante.fecha_registro], (err, results) => {
        if (err) {
            console.log("No se pudo hacer la consulta");
        } else {
            db.query("SELECT * FROM estudiantes where id=?",[results.insertId], (err, results) => {
                if (err) {
                    console.log("No se pudo actualizar el estudiante");
                } else {
                    callback(results[0])
                }
            })
        }
    });
}
function actualizarEstudiante(estudianteid, nuevosDatosEstudiante, callback) {
    let estudianteU = "UPDATE estudiantes SET nombre = ?, apellido = ?, edad = ?, grado = ?, fecha_registro = ? WHERE id = ?";
    db.query(estudianteU, [nuevosDatosEstudiante.nombre, nuevosDatosEstudiante.apellido, nuevosDatosEstudiante.edad, nuevosDatosEstudiante.grado, nuevosDatosEstudiante.fecha_registro, estudianteid], (err, results) => {
        if (err) {
            console.log("Error durante la actualización");
        } else {
            db.query("SELECT * FROM estudiantes where id=?",[estudianteid], (err, results) => {
                if (err) {
                    console.log("No se pudo actualizar el estudiante");
                } else {
                    callback(null,results[0])
                }
            })
        }
    });
}
function eliminarEstudiante(estudianteid, callback) {
    const query = "DELETE FROM estudiantes WHERE id=?"
    db.query(query, [estudianteid], (err, results) => {
        if (err) {
            console.log("Eliminación no realizada");
        } else {
            callback(results)
        }
    })
}
module.exports = {traerEstudiantes, agregarEstudiante, actualizarEstudiante, eliminarEstudiante}