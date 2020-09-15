const canchaCtrl = {}

const pool = require('../database');

canchaCtrl.renderAddCancha = (req, res) => {
    res.render('cancha/addCancha');
};

canchaCtrl.addCancha = async (req, res) => {
    const {
        cancha_id,
        nombre,
        numero,
        fk_tcancha
    } = req.body;
    const newCancha = {
        cancha_id,
        nombre,
        numero,
        fk_tcancha,
        fk_centro: req.centro.centro_id,
    };
    console.log(newCancha);
    await pool.query('INSERT INTO cancha set ?', [newCancha]);
    req.flash('success', 'Cancha agregado correctamente');
    res.redirect('cancha/listCancha');
};

canchaCtrl.renderCancha = async (req, res) => {
    console.log(req.centro)
    const canchas = await pool.query('SELECT * FROM cancha ');
    res.render('cancha', { canchas });
};

canchaCtrl.rendercanchas = async (req, res) => {
    const allcanchas = await pool.query('SELECT * FROM mostrar_canchas');
    res.render('cancha/listcancha', { allcanchas });
};

module.exports = canchaCtrl;