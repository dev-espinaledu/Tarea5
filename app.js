const express = require('express');
const app = express();
const PORT = 3300
const {traerEstudiantes, agregarEstudiante, actualizarEstudiante, eliminarEstudiante} = require('./models/estudianteModel.js');
const {mostrarMatriculas, añadirMatricula, verificarMatricula, actualizarMatricula, eliminarMatricula} = require('./models/matriculaModel.js');
app.use(express.json())

// Estudiante
app.get('/estudiante', (req, res) => {
    traerEstudiantes((results) => {
        res.json(results);
    });
})
app.get('/estudiante/:id', (req, res) => {
    traerEstudiantes((results) => {
        const id = req.params.id;
        const estudiante = results.find((estudiante) => estudiante.id === parseInt(id));
        res.json(estudiante);
    });
});
app.post('/estudiante/:id', (req, res) => {
    let nuevoEstudiante = req.body;
    if (!nuevoEstudiante.nombre || !nuevoEstudiante.apellido || !nuevoEstudiante.edad || !nuevoEstudiante.grado || !nuevoEstudiante.fecha_registro) {
        return res.send("Faltan datos")
    }
    else {
        agregarEstudiante(nuevoEstudiante, (result) => {
            return res.json({result});
        })
    }
});
app.put('/estudiante/:id', (req, res) => {
    let estudianteid = req.params.id;
    const nuevosDatosEstudiante = req.body;
    if (!nuevosDatosEstudiante.nombre || !nuevosDatosEstudiante.apellido || !nuevosDatosEstudiante.edad || !nuevosDatosEstudiante.grado || !nuevosDatosEstudiante.fecha_registro) {
        return res.send("Faltan datos");
    } else {
        actualizarEstudiante(estudianteid, nuevosDatosEstudiante, (err, result) => {
        return res.json({result});
        }
    )}
})
app.delete('/estudiante/:id', (req, res) => {
    let estudianteid = req.params.id;
    eliminarEstudiante(estudianteid, (err, results) => {
        if (!err) {
            return res.send("Error al eliminar el estudiante");
        } else {
            return res.json({message: "Se eliminó el estudiante"});
        }
    })
})

// Matricula
app.get('/matricula', (req, res) => {
    mostrarMatriculas((results) => {
        res.json(results);
    });
})
app.get('/matricula/:id', (req, res) => {
    mostrarMatriculas((results) => {
        const id = req.params.id;
        const matricula = results.find((matricula) => matricula.id_matricula === parseInt(id));
        res.json(matricula);
    });
});
app.post('/matricula', (req, res) => {
    let nuevaMatricula = req.body;
    if (!nuevaMatricula.cursos || !nuevaMatricula.modalidad || !nuevaMatricula.estado || !nuevaMatricula.idEstudiante) {
        return res.send("Faltan datos");
    } else {
        verificarMatricula(nuevaMatricula.idEstudiante, (err, existeMatricula) => {
            if (err) {
                return res.send("Error al verificar la matrícula del estudiante");
            }
            if (existeMatricula) {
                return res.send("El estudiante ya tiene una matrícula");
            } else {
                añadirMatricula(nuevaMatricula, (err, result) => {
                    if (err) {
                        return res.send("Error al añadir la matrícula");
                    } else {
                        return res.json({result});
                    }
                });
            }
        });
    }
});
app.put('/matricula/:id', (req, res) => {
    let matriculaid = req.params.id;
    const nuevosDatosMatricula = req.body;
    if (!nuevosDatosMatricula.cursos || !nuevosDatosMatricula.modalidad || !nuevosDatosMatricula.estado || !nuevosDatosMatricula.idEstudiante) {
        return res.send("Faltan datos");
    } else {
        actualizarMatricula(matriculaid, nuevosDatosMatricula, (err, result) => {
            if (err) {
                return res.send("Error al actualizar la matrícula");
            } else {
                return res.json({result});
            }
        });
    }
});
app.delete('/matricula/:id', (req, res) => {
    let matriculaid = req.params.id;
    eliminarMatricula(matriculaid, (err, result) => {
        if (err) {
            return res.send("Error al eliminar la matricula");
        } else {
            return res.json({message: "Se eliminó la matricula"});
        }
    });
});
/* select count(id) from matricula */
/* app.get('/matricula/count', (req, res) => {
    contarMatriculas((results) => {
    const count = results.length;
        res.json({count});
    });
}); */
app.listen(PORT, () => {
    console.log("Servidor corriendo correctamente");
})