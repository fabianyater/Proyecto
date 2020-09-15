const tipoCanchaCtrl = {}

const pool = require('../database');

tipoCanchaCtrl.renderAddTipoCancha = (req, res) => {
    res.render('tipoCancha/addTipoCancha');
};

tipoCanchaCtrl.addTipoCancha = async(req, res) => {
    const { tcancha_id, nombre } = req.body;
    const newTipoCancha = {
        tcancha_id,
        nombre
    };
    await pool.query('INSERT INTO t_cancha set ?', [newTipoCancha]);
    req.flash('success', 'Tipo de cancha agregado correctamente');
    res.redirect('/listTipoCancha');
}

tipoCanchaCtrl.renderEditTipoCancha = async(req, res) => {
    const { id } = req.params;
    const tipoCancha = await pool.query('SELECT * FROM t_cancha WHERE tcancha_id = ?', [id]);
    res.render('tipoCancha/editTipoCancha', { tiposCancha: tipoCancha[0] });
};

tipoCanchaCtrl.editTipoCancha = async(req, res) => {
    const { id } = req.params;
    const { tcancha_id, nombre } = req.body;
    const newTipoCancha = {
        tcancha_id,
        nombre
    };
    await pool.query('UPDATE t_cancha SET ? WHERE tcancha_id = ?', [newTipoCancha, id]);
    req.flash('success', 'Tipo de cancha actualizado correctamente');
    res.redirect('/centro');
}

tipoCanchaCtrl.renderTipoCancha = async(req, res) => {
    const tipoCancha = await pool.query('SELECT * FROM t_cancha');
    res.render('tipoCancha/listTipoCancha', { tipoCancha });
}

tipoCanchaCtrl.deleteTipoCancha = async(req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM t_cancha WHERE tcancha_id = ?', [id]);
    req.flash('success', 'Tipo de cancha eliminado correctamente');
    res.redirect('/centro');
};

module.exports = tipoCanchaCtrl;