const deportesCtrl = {}

const pool = require('../database');

deportesCtrl.renderAddDeporte = (req, res) => {
    res.render('deportes/addDeporte');
};

deportesCtrl.addDeporte = async(req, res) => {
    const { deporte_id, nombre, estado } = req.body;
    const newDeporte = {
        deporte_id,
        nombre,
        estado
    };
    await pool.query('INSERT INTO deporte set ?', [newDeporte]);
    req.flash('success', 'Deporte agregado correctamente');
    res.redirect('/listDeporte');
}

deportesCtrl.renderEditDeporte = async(req, res) => {
    const { id } = req.params;
    const deportes = await pool.query('SELECT * FROM deporte WHERE deporte_id = ?', [id]);
    res.render('deportes/editDeporte', { deporte: deportes[0] });
};

deportesCtrl.editDeporte = async(req, res) => {
    const { id } = req.params;
    const { deporte_id, nombre, estado } = req.body;
    const newDeporte = {
        deporte_id,
        nombre,
        estado
    };
    await pool.query('UPDATE deporte SET ? WHERE deporte_id = ?', [newDeporte, id]);
    req.flash('success', 'Deporte actualizado correctamente');
    res.redirect('/listDeporte');
}

deportesCtrl.renderDeportes = async(req, res) => {
    const deportes = await pool.query('SELECT * FROM deporte');
    res.render('deportes/listDeporte', { deportes });
}

deportesCtrl.deleteDeporte = async(req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM deporte WHERE deporte_id = ?', [id]);
    req.flash('success', 'Deporte eliminado correctamente');
    res.redirect('/listDeporte');
};

module.exports = deportesCtrl;