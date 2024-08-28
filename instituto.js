const express = require('express');
const app = express();
const PORT = 3300
const {traerEstudiantes, agregarEstudiante, actualizarEstudiante, eliminarEstudiante} = require('./models/institutoModel');
app.use(express.json())

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
app.listen(PORT, () => {
    console.log("Servidor corriendo correctamente");
})