create database ejemplo_node;
use ejemplo_node;

create table usuarios(
    id int not null,
    username varchar(35) not null,
    password varchar(35) not null,
    fullname varchar(100) not null
);

alter table usuarios
add constraint pk_usuario
primary key (id);

ALTER TABLE usuarios
MODIFY id INT NOT NULL AUTO_INCREMENT;

create table links(
    id int not null,
    titulo varchar(150) not null,
    url varchar(150) not null,
    descripcion varchar(255),
    user_id int,
    created_at timestamp not null
);

alter table links
add constraint pk_links
primary key(id);

ALTER TABLE links
MODIFY id INT NOT NULL AUTO_INCREMENT;

alter table links
add constraint fk_usuario_links
foreign key (user_id)
references usuarios (id);