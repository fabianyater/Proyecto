const serviciosCtrl = {}

const pool = require('../database');

serviciosCtrl.renderAddServicio = (req, res) => {
    res.render('servicios/addServices');
};

serviciosCtrl.addServicio = async (req, res) => {
    const { servicio_id, nombres } = req.body;
    const newServicio = {
        servicio_id,
        nombres
    };
    await pool.query('INSERT INTO servicio set ?', [newServicio]);
    const centro_id = await pool.query('select centro_id from centro where fk_usuario = ?', [req.user.id]);
    console.log({centro_id: centro_id[0]})
    //await pool.query('CALL pc_ServicioCentro(?)', [centro_id])
    req.flash('success', 'Servicio agregado correctamente');
    res.redirect('/centro');
}

serviciosCtrl.renderEditServicio = async (req, res) => {
    const { id } = req.params;
    const servicios = await pool.query('SELECT * FROM servicio WHERE servicio_id = ?', [id]);
    console.log({ servicio: servicios[0] })
    res.render('servicios/editServices', { servicio: servicios[0] });
};

serviciosCtrl.editServicio = async (req, res) => {
    const { id } = req.params;
    const { servicio_id, nombres } = req.body;
    const newServicio = {
        servicio_id,
        nombres
    };
    await pool.query('UPDATE servicio SET ? WHERE servicio_id = ?', [newServicio, id]);
    req.flash('success', 'Servicio actualizado correctamente');
    res.redirect('/centro');
}

serviciosCtrl.renderServicios = async (req, res) => {
    const servicios = await pool.query('SELECT * FROM servicio s inner join centro_servicio cs on s.servicio_id = cs.servicio_id inner join centro c2 on cs.centro_id = c2.centro_id where fk_usuario = ?', [req.user.id]);
    res.render('servicios/listServices', { servicios });
}

serviciosCtrl.deleteServicio = async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM servicio WHERE servicio_id = ?', [id]);
    req.flash('success', 'Servicio eliminado correctamente');
    res.redirect('/centro');
};

module.exports = serviciosCtrl;