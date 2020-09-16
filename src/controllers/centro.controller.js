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
    const micentro = await pool.query('SELECT * FROM centro where fk_usuario= ?', [req.user.id]);
    const srvs = await pool.query('SELECT nombres FROM servicio s inner join centro_servicio cs on s.servicio_id = cs.servicio_id inner join centro c2 on cs.centro_id = c2.centro_id where fk_usuario = ?', [req.user.id])
    const dtes = await pool.query('SELECT * FROM deporte d inner join centro_deporte cd on d.deporte_id = cd.deporte_id inner join centro c2 on cd.centro_id = c2.centro_id where fk_usuario = ?', [req.user.id])
    const canchas = await pool.query('SELECT c2.nombre from centro c inner join cancha c2 ON c.centro_id = c2.fk_centro where fk_usuario = ?', [req.user.id])
    res.render('centrodep', { micentro, dtes, srvs, canchas});
};

centroCtrl.renderCentros = async (req, res) => {
    const allcentros = await pool.query('SELECT * FROM mostrar_centros');
    res.render('centro/listCentro', { allcentros });
};

module.exports = centroCtrl;