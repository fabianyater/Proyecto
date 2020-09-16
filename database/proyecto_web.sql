CREATE DATABASE web;
use web;

create table rol(
  rol_id INT NOT NULL,
  descripcionr VARCHAR(45) NOT NULL
);

create table t_documento(
  documento_id INT NOT NULL,
  descripcion VARCHAR(45) NOT NULL
);

create table t_cancha(
  tcancha_id INT NOT NULL,
  nombre VARCHAR(45) NOT NULL
);

create table servicio(
  servicio_id INT NOT NULL,
  nombres VARCHAR(35) NOT NULL
);

create table deporte(
  deporte_id INT NOT NULL,
  nombre VARCHAR(45) NOT NULL,
  estado VARCHAR(1) NOT NULL
);

create table menu(
  menu_id INT NOT NULL,
  nombre VARCHAR(45) NOT NULL,
  padre VARCHAR(1) NOT NULL,
  estado VARCHAR(45) NOT NULL
);

create table usuario(
  usuario_id INT NOT NULL auto_increment,
  nombres VARCHAR(45) NOT NULL,
  apellidos VARCHAR(45) NOT NULL,
  numcel VARCHAR(11) NOT NULL,
  correo VARCHAR(45) NOT NULL,
  contra VARCHAR(45) NOT NULL,
  numidentificacion VARCHAR(15) NOT NULL,
  estado VARCHAR(45) NOT NULL DEFAULT "A",
  primary key(usuario_id),
  fk_rol INT NOT NULL DEFAULT 3,
  fk_documento INT NOT NULL
);

create table centro(
  centro_id INT NOT NULL,
  nombred VARCHAR(45) NOT NULL,
  direccion VARCHAR(45) NOT NULL,
  correo VARCHAR(45) NOT NULL,
  tel VARCHAR(15) NULL,
  rut VARCHAR(35) NOT NULL,
  descripcion VARCHAR(45) NOT NULL,
  fk_usuario INT NOT NULL
);

create table cancha(
  cancha_id INT NOT NULL,
  nombre VARCHAR(45) NOT NULL,
  numero VARCHAR(2) NOT NULL,
  fk_tcancha INT NOT NULL,
  fk_centro INT NOT NULL
);

create table horario(
  horario_id INT NOT NULL,
  hora_inicio DATETIME NOT NULL,
  hora_finaliza DATETIME NOT NULL,
  fecha DATE NOT NULL,
  fk_usuario INT NOT NULL
);

create table c_telefono(
  telefono_id INT NOT NULL,
  numero VARCHAR(15) NOT NULL,
  fk_centro INT NOT NULL
);

create table horario_cancha(
  horario_id INT NOT NULL,
  cancha_id INT NOT NULL,
  precio INT NOT NULL,
  estado VARCHAR(10) NOT NULL
);

create table menu_rol(
  menu_id INT NOT NULL,
  rol_id INT NOT NULL
);

create table usuario_cancha(
  usuario_id INT NOT NULL,
  cancha_id INT NOT NULL
);

create table centro_deporte(
  centro_id INT NOT NULL,
  deporte_id INT NOT NULL
);
create table centro_servicio(
  centro_id INT NOT NULL,
  servicio_id INT NOT NULL
);

alter table rol 			add constraint pk_rol 			  primary key(rol_id);
alter table t_documento 	add constraint pk_doc 			  primary key(documento_id);
alter table t_cancha 		add constraint pk_tcancha 		  primary key(tcancha_id);
alter table servicio 		add constraint pk_servicio 		  primary key(servicio_id);
alter table deporte 		add constraint pk_deporte 		  primary key(deporte_id);
alter table menu 			add constraint pk_menu 			  primary key(menu_id);
alter table centro 			add constraint pk_centro 		  primary key(centro_id);
alter table cancha 			add constraint pk_cancha 		  primary key(cancha_id);
alter table horario 		add constraint pk_horario 		  primary key(horario_id);
alter table c_telefono 		add constraint pk_telefono 		  primary key(telefono_id);
alter table horario_cancha 	add constraint pk_hor_cancha 	  primary key(horario_id, cancha_id);
alter table menu_rol 		add constraint pk_menu_rol 		  primary key(menu_id, rol_id);
alter table usuario_cancha 	add constraint pk_usuario_cancha  primary key(usuario_id, cancha_id);
alter table centro_deporte 	add constraint pk_centro_deporte  primary key(centro_id, deporte_id);
alter table centro_servicio add constraint pk_centro_servicio primary key(centro_id, servicio_id);

alter table usuario 		add constraint fk_usuario_rol  		foreign key(fk_rol)  		references rol(rol_id);
alter table usuario 		add constraint fk_usuario_doc  		foreign key(fk_documento)  	references t_documento(documento_id);
alter table centro 			add constraint fk_centro_usuario  	foreign key(fk_usuario)  	references usuario(usuario_id);
alter table cancha 			add constraint fk_cancha_tcancha  	foreign key(fk_tcancha)  	references t_cancha(tcancha_id);
alter table cancha 			add constraint fk_cancha_centro  	foreign key(fk_centro)  	references centro(centro_id);
alter table horario 		add constraint fk_horario_usuario  	foreign key(fk_usuario)  	references usuario(usuario_id);
alter table c_telefono 		add constraint fk_telefono_centro  	foreign key(fk_centro)  	references centro(centro_id);
alter table horario_cancha 	add constraint fk_horario_cancha  	foreign key(cancha_id)  	references cancha(cancha_id);
alter table horario_cancha 	add constraint fk_horario_cancha1  	foreign key(horario_id)  	references horario(horario_id);
alter table menu_rol 		add constraint fk_menu_rol  		foreign key(menu_id)  		references menu(menu_id);
alter table menu_rol 		add constraint fk_menu_rol1  		foreign key(rol_id)  		references rol(rol_id);
alter table usuario_cancha 	add constraint fk_usuario_cancha  	foreign key(cancha_id)  	references cancha(cancha_id);
alter table usuario_cancha 	add constraint fk_usuario_cancha1  	foreign key(usuario_id)  	references usuario(usuario_id);
alter table centro_deporte 	add constraint fk_centro_deporte  	foreign key(centro_id)  	references centro(centro_id);
alter table centro_deporte 	add constraint fk_centro_deporte1  	foreign key(deporte_id)  	references deporte(deporte_id);
alter table centro_servicio add constraint fk_centro_servicio  	foreign key(centro_id)  	references centro(centro_id);
alter table centro_servicio add constraint fk_centro_servicio1  foreign key(servicio_id)  	references servicio(servicio_id);

CREATE VIEW cant_reservas AS
select
    id,
    concat(nombres , apellidos) AS "Nombre completo",
    u.correo,
    u.numcel,
    h.hora_inicio,
    h.hora_finaliza,
    h.fecha,
    hc.precio,
    c.numero
from usuario u
join horario h on
    u.id = h.fk_usuario
join horario_cancha hc on
    h.horario_id = hc.horario_id
join cancha c on
    hc.cancha_id = c.cancha_id
where
    u.id = h.fk_usuario;

CREATE VIEW mostrar_canchas AS
select
    ce.centro_id,
    ce.nombrec,
    ce.correo,
    ce.descripcion,
    ce.tel,
    ca.nombre,
    ca.numero,
from
    cancha ca
join centro ce on
    ca.fk_centro  = ce.centro_id;

CREATE VIEW mostrar_centros AS
select
    ce.nombrec,
    ce.correo,
    ce.descripcion,
    ce.tel,
    u.nombres,
    u.apellidos,
    u.fk_rol,
    r2.descripcionr,
from
    centro ce
join usuario u on
    ce.fk_usuario = u.id
join rol r2 on
    u.fk_rol = r2.rol_id;

CREATE OR REPLACE
ALGORITHM = UNDEFINED VIEW `web`.`mostrar_micentro` AS
select
    c.nombrec,
    c.direccion,
    c.correo,
    c.descripcion,
    s.nombres,
    d2.nombre
from
    centro c
join centro_servicio cs on
    c.centro_id = cs.centro_id
join servicio s on
    cs.servicio_id = s.servicio_id
join centro_deporte cd on
    c.centro_id = cd.deporte_id
join web.deporte d2 on
    cd.deporte_id = d2.deporte_id;


CREATE PROCEDURE pc_ServicioCentro(
in centrodeportivoid int
)
BEGIN
 insert into centro_servicio(centro_id, servicio_id) values(
centrodeportivoid, 
(select servicio_id from servicio order by servicio_id desc limit 1)
);
END;
