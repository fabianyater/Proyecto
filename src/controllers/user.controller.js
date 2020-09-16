const userCtrl = {};

const pool = require('../database');
const helpers = require('../lib/helpers');

userCtrl.renderInicio = (req, res) => {
    res.render('inicio');
};

userCtrl.renderUserProfile = async (req, res) => {
    const result = await pool.query('SELECT COUNT(*) as Reservas from cant_reservas where id = ?', [req.user.id])
    result.stringify = JSON.stringify(result)
    console.log(result)
    res.render('profile', { perfil_usuario: result });
}

userCtrl.renderEditUser = async (req, res) => {
    const { id } = req.params;
    const users = await pool.query('SELECT * FROM usuario WHERE id = ?', [id]);
    res.render('edit', { user: users[0] });
};

userCtrl.editUser = async (req, res) => {
    const { id } = req.params;
    const { nombres, apellidos, numcel, correo, contra, numidentificacion } = req.body;
    let newUser = {
        nombres,
        apellidos,
        numcel,
        correo,
        contra,
        numidentificacion
    };
    newUser.contra = await helpers.encryptPassword(contra);
    await pool.query('UPDATE usuario SET ? WHERE id = ?', [newUser, id]);
    req.flash('success', 'Usuario actualizado correctamente');
    res.redirect('/inicio');
}

userCtrl.deleteUser = async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM usuario WHERE id = ?', [id]);
    req.flash('success', 'Usuario eliminado correctamente');
    res.redirect('/index');
};

module.exports = userCtrl;