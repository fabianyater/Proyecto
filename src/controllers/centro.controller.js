const centroCtrl = {}

const pool = require('../database');

centroCtrl.renderAddCentro = (req, res) => {
    res.render('centro/addCentro');
};

centroCtrl.addCentro = async (req, res) => {
    const {
        centro_id,
        nombre,
        direccion,
        correo,
        tel,
        rut,
        descripcion
    } = req.body;
    const newCentro = {
        centro_id,
        nombre,
        direccion,
        correo,
        tel,
        rut,
        usuario_id: req.user.id
    };
    await pool.query('INSERT INTO centro set ?', [newCentro]);
    req.flash('success', 'Centro agregado correctamente');
    res.redirect('centro');
};

centroCtrl.renderMiCentro = async (req, res) => {
    const micentro = await pool.query('SELECT * FROM centro where fk_usuario = ?', [req.user.id]);
    res.render('centrodep', { micentro });
};

centroCtrl.renderCentros = async (req, res) => {
    const allcentros = await pool.query('SELECT * FROM centro');
    res.render('centro/listCentro', { allcentros });
};

module.exports = centroCtrl;