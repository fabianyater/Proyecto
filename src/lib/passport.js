const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('./helpers');

// Registrarse
passport.use('local.signup', new LocalStrategy({
    usernameField: 'correo',
    passwordField: 'contra',
    passReqToCallback: true
}, async(req, correo, contra, done) => {

    const { nombres, apellidos, numcel, numidentificacion } = req.body;
    let newUser = {
        nombres,
        apellidos,
        numcel,
        correo,
        contra,
        numidentificacion
    };
    newUser.contra = await helpers.encryptPassword(contra);
    const result = await pool.query('INSERT INTO usuario SET ? ', [newUser]);
    newUser.id = result.insertId;
    return done(null, newUser);
}));

//Inciar sesión
passport.use('local.signin', new LocalStrategy({
    usernameField: 'correo',
    passwordField: 'contra',
    passReqToCallback: true
}, async(req, correo, contra, done) => {
    const rows = await pool.query('SELECT * FROM usuario WHERE correo = ?', [correo]);
    if (rows.length > 0) {
        const usuario = rows[0];
        const validPassword = await helpers.matchPassword(contra, usuario.contra)
        if (validPassword) {
            done(null, usuario, req.flash("success", "Bienvenido(a) " + usuario.nombres));
        } else {
            done(null, false, req.flash("message", "Contaseña incorrecta"));
        }
    } else {
        return done(null, false, req.flash('message', 'El usuario no se encuentra registrado'));
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async(id, done) => {
    const rows = await pool.query('SELECT * FROM usuario WHERE id = ?', [id]);
    done(null, rows[0]);
});