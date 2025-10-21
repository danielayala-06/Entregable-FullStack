# 🚀Entregable FullStack.
## 🗄️Base de Datos
Primero vamos a necesitar crear esta Base de datos:
```SQL
CREATE DATABASE cursos_virtuales;
USE cursos_virtuales;

-- CREACION DE LAS TABLAS
CREATE TABLE categorias(
	id			INT AUTO_INCREMENT PRIMARY KEY,
    titulo 		VARCHAR(45) NOT NULL
)ENGINE = INNODB;

CREATE TABLE sub_categorias(
	id 			INT AUTO_INCREMENT PRIMARY KEY,
    categoria 	INT NOT NULL,
    titulo 		VARCHAR(45),
    FOREIGN KEY(categoria) REFERENCES categorias(id)
)ENGINE = INNODB; 

CREATE TABLE docentes(
	id 			INT AUTO_INCREMENT PRIMARY KEY,
    nombres 	VARCHAR(45) NOT NULL, 
    apellidos 	VARCHAR(45) NOT NULL,
    dni 		CHAR(8) UNIQUE NOT NULL,
    telefono 	CHAR(9) UNIQUE NOT NULL,
    correo 		VARCHAR(60) UNIQUE NOT NULL
)ENGINE = INNODB;

CREATE TABLE cursos(
	id 			INT AUTO_INCREMENT PRIMARY KEY,
    subcategoria INT NOT NULL COMMENT 'Esta columna es el ID de subcategoria',
    docente 	INT NOT NULL COMMENT 'Esta columna es el ID del docente',
    titulo 		VARCHAR(45) NOT NULL,
    descripcion VARCHAR(255) NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin 	DATE NOT NULL,
    duracion 	TINYINT UNSIGNED COMMENT 'El valor de la duracion es en horas' NOT NULL,
    precio 		DECIMAL(7,2) UNSIGNED  NOT NULL,
FOREIGN KEY(subcategoria) REFERENCES sub_categorias(id),
FOREIGN KEY(docente) REFERENCES docentes(id)
)ENGINE = INNODB;

-- *************************
-- INSERCCION DE LOS DATOS:
-- *************************

-- Datos para la tabla categorias 
INSERT INTO categorias(titulo) VALUES('Informatica'),('Matematica'), ('Comunicación'), ('Ciencias Sociales');

-- Datos para la tabla sub_categorias
INSERT INTO sub_categorias(categoria, titulo) VALUES(1,'Inteligencia Articial'),(1,'Ciberceguridad'), (1, 'Lenguajes de Programación');
INSERT INTO sub_categorias(categoria, titulo) VALUES(2,'Álgebra'),(2,'Geometría'), (2, 'Cálculo');
INSERT INTO sub_categorias(categoria, titulo) VALUES(3,'Comunicación Organizacional'),(3,'Comunicación Social'), (3, 'Comunicación Interpersonal');
INSERT INTO sub_categorias(categoria, titulo) VALUES(4,'Sociología'),(4,'Economía'), (4, 'Psicología');

-- Datos para la tabla docentes
INSERT INTO docentes(nombres, apellidos, dni, telefono, correo) VALUES('Crisitan Jeffersón', 'Valle Ronceros', '73760778', '985206335', 'cristian_ronceros@gmail.com');
INSERT INTO docentes(nombres, apellidos, dni, telefono, correo) VALUES('Jesús Valerio', 'Flores Canchari', '44626498', '980492240', 'jesus_valerio@gmail.com');
INSERT INTO docentes(nombres, apellidos, dni, telefono, correo) VALUES('Morgan Murilo', 'Bondioli Molina', '70625546', '924527099', 'morgan_bondioli@gmail.com');

-- Datos para la tabla cursos
INSERT INTO cursos(subcategoria, docente, titulo, descripcion, fecha_inicio, fecha_fin, duracion, precio) VALUES
(1, 2, 'Aprende IA en 3 meses', 'Curso intensivo de Fundamentos de la IA. Todo lo que necesitas saber para entrar en el desarrollo de modelos de IA', '2025-11-03', '2026-01-31', 200, 200.00),
(4, 1, 'Curso de PHP con Laravel', 'Domina los conceptos de PHP para convertirte en un desarrollador web', '2025-11-03', '2025-12-26', 100, 449.90);

```
## 📂Instalación de modulós
Con la BD lista, continuamos con la instalación de los módulos que vamos a necesitar. Para ello ejecutamos el siguiente comando:
```bash
npm install
```
## ⚙️Configuración de variables de entorno
Continuamos con la configuración del archivo `.env`. En nuestro proyecto encontramos un archivo similar: `.env.example`. Renombramos este archivo a `.env` y pegamos lo siguiente:
```js
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_DATABASE=cursos_virtuales
DB_PORT=3306
```
## ▶️Ejecución del Proyecto
Para levantar el proyecto solamente necesita ejecutar el siguiente comando:
```bash
nodemon server
```
En caso de no tener nodemon instalado también se puede ejecutar con node.js:
```bash
node server.js
```