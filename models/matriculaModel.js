const db = require("../config/db.js");

function mostrarMatriculas(callback) {
    db.query("SELECT * FROM matricula", (err, results) => {
        if (err) {
            console.log("No se pudo hacer la consulta");
        } else {
            callback(results)
        }
    })
}
function añadirMatricula(nuevaMatricula, callback) {
    const query = "INSERT INTO matricula (cursos, modalidad, estado, idEstudiante) VALUES(?, ?, ?, ?)";
    db.query(query, [nuevaMatricula.cursos, nuevaMatricula.modalidad, nuevaMatricula.estado, nuevaMatricula.idEstudiante], (err, results) => {
        if (err) {
            console.log("Error al añadir la matrícula");
        } else {
            db.query("SELECT * FROM matricula WHERE id_matricula=?", [results.insertId], (err, results) => {
                if (err) {
                    console.log("No se pudo obtener la matrícula añadida");
                } else {
                    callback(results[0]);
                }
            });
        }
    });
}
function actualizarMatricula(matriculaid, nuevosDatosMatricula, callback) {
    let query = "UPDATE matricula SET cursos = ?, modalidad = ?, estado = ?, idEstudiante = ? WHERE id_matricula = ?";
    db.query(query, [nuevosDatosMatricula.cursos, nuevosDatosMatricula.modalidad, nuevosDatosMatricula.estado, nuevosDatosMatricula.idEstudiante, matriculaid], (err, results) => {
        if (err) {
            console.log("Actualización de matrícula no realizada", err);
            callback(err);  // Enviar el error de vuelta al callback
        } else {
            db.query("SELECT * FROM matricula WHERE id_matricula = ?", [matriculaid], (err, results) => {
                if (err) {
                    console.log("No se pudo obtener la matrícula actualizada", err);
                    callback(err);
                } else {
                    callback(null, results[0]);
                }
            });
        }
    });
}
function eliminarMatricula(matriculaid, callback) {
    db.query("DELETE FROM matricula WHERE id_matricula=?", [matriculaid], (err, results) => {
        if (err) {
            console.log("No se pudo eliminar la matrícula");
            callback(err);
        } else {
            callback(results);
        }
    });
}
/* select count(id) from matricula */
function contarMatriculas(callback) {
    db.query("SELECT COUNT(id_matricula) as cantidad FROM matricula", (err, results) => {
        if (err) {
            console.log("Error al contar matrículas");
            callback(err);
        } else {
            callback(null, results[0].cantidad);
        }
    });
}
module.exports = {mostrarMatriculas, añadirMatricula, actualizarMatricula, eliminarMatricula, contarMatriculas}