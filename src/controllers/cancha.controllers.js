const canchaCtrl = {}

const pool = require('../database');

canchaCtrl.renderAddCancha = async(req, res) => {
    const result = await pool.query('select * from t_cancha')
    res.render('cancha/addCancha', {tipo_cancha: result});
};

canchaCtrl.addCancha = async (req, res) => {
    const {
        cancha_id,
        nombre,
        numero,
        fk_tcancha,
        fk_centro
    } = req.body;
    const newCancha = {
        cancha_id,
        nombre,
        numero,
        fk_tcancha,
        fk_centro,
    };
    console.log(newCancha);
    await pool.query('INSERT INTO cancha set ?', [newCancha]);
    req.flash('success', 'Cancha agregado correctamente');
    res.redirect('/listCancha');
};

canchaCtrl.renderCancha = async (req, res) => {
    const canchas = await pool.query('SELECT * FROM cancha inner join horario_cancha on cancha.cancha_id = horario_cancha.cancha_id');
    res.render('cancha/listCancha', { canchas});
};

//canchaCtrl.rendercanchas = async (req, res) => {
    //const allcanchas = await pool.query('SELECT * FROM mostrar_canchas');
  //  res.render('cancha/listcancha', { allcanchas });
//};

module.exports = canchaCtrl;