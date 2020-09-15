const centroCtrl = {}

const pool = require('../database');

centroCtrl.renderAddCentro = (req, res) => {
    res.render('centro/addCentro');
};

centroCtrl.addCentro = async (req, res) => {
    const {
        centro_id,
        nombrec,
        direccion,
        correo,
        tel,
        rut,
        descripcion
    } = req.body;
    const newCentro = {
        centro_id,
        nombrec,
        direccion,
        correo,
        tel,
        rut,
        descripcion,
        fk_usuario: req.user.id,
    };
    await pool.query('INSERT INTO centro set ?', [newCentro]);
    req.flash('success', 'Centro agregado correctamente');
    res.redirect('centro');
};

centroCtrl.renderMiCentro = async (req, res) => {
    const micentro = await pool.query('SELECT * FROM centro where fk_usuario = ?', [req.user.id]);
    const dtes = await pool.query('select nombre from deporte')
    const srvs = await pool.query('select nombres from servicio')
    console.log(dtes)
    res.render('centrodep', { micentro, dtes, srvs});
};

centroCtrl.renderCentros = async (req, res) => {
    const allcentros = await pool.query('SELECT * FROM mostrar_centros');
    res.render('centro/listCentro', { allcentros });
};

module.exports = centroCtrl;