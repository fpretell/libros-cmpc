-- Datos iniciales exportados desde PostgreSQL

BEGIN;

INSERT INTO public.usuarios (id, email, password, nombre, rol, created_at, updated_at) VALUES (1, 'admin@example.com', '$2b$10$.pPALROharBoTAjldiSh/efR9YzcTj.BNXsllIwKfsW9tB1.ST4we', 'Admin', 'USER', '2026-10-25 17:58:09.605533', '2026-10-25 17:58:09.605533');



INSERT INTO public.autores (id, nombre, created_at, updated_at, deleted_at) VALUES (1, 'Gabriel García Márquez', '2026-10-25 17:58:09.599527', '2026-10-25 17:58:09.599527', NULL);

INSERT INTO public.autores (id, nombre, created_at, updated_at, deleted_at) VALUES (2, 'Isabel Allende', '2026-10-25 17:58:09.599527', '2026-10-25 17:58:09.599527', NULL);

INSERT INTO public.autores (id, nombre, created_at, updated_at, deleted_at) VALUES (3, 'Jorge Luis Borges', '2026-10-25 17:58:09.599527', '2026-10-25 17:58:09.599527', NULL);

INSERT INTO public.autores (id, nombre, created_at, updated_at, deleted_at) VALUES (4, 'Mario Vargas Llosa', '2026-10-25 17:58:09.599527', '2026-10-25 17:58:09.599527', NULL);

INSERT INTO public.autores (id, nombre, created_at, updated_at, deleted_at) VALUES (5, 'Julio Cortázar', '2026-10-25 17:58:09.599527', '2026-10-25 17:58:09.599527', NULL);

INSERT INTO public.autores (id, nombre, created_at, updated_at, deleted_at) VALUES (6, 'Laura Esquivel', '2026-10-25 17:58:09.599527', '2026-10-25 17:58:09.599527', NULL);

INSERT INTO public.autores (id, nombre, created_at, updated_at, deleted_at) VALUES (7, 'Carlos Ruiz Zafón', '2026-10-25 17:58:09.599527', '2026-10-25 17:58:09.599527', NULL);

INSERT INTO public.autores (id, nombre, created_at, updated_at, deleted_at) VALUES (8, 'Pablo Neruda', '2026-10-25 17:58:09.599527', '2026-10-25 17:58:09.599527', NULL);

INSERT INTO public.autores (id, nombre, created_at, updated_at, deleted_at) VALUES (9, 'Miguel de Cervantes', '2026-10-25 17:58:09.599527', '2026-10-25 17:58:09.599527', NULL);

INSERT INTO public.autores (id, nombre, created_at, updated_at, deleted_at) VALUES (10, 'Federico García Lorca', '2026-10-25 17:58:09.599527', '2026-10-25 17:58:09.599527', NULL);



INSERT INTO public.editoriales (id, nombre, created_at, updated_at, deleted_at) VALUES (1, 'Editorial Planeta', '2026-10-25 17:58:09.600391', '2026-10-25 17:58:09.600391', NULL);

INSERT INTO public.editoriales (id, nombre, created_at, updated_at, deleted_at) VALUES (2, 'Penguin Random House', '2026-10-25 17:58:09.600391', '2026-10-25 17:58:09.600391', NULL);

INSERT INTO public.editoriales (id, nombre, created_at, updated_at, deleted_at) VALUES (3, 'HarperCollins', '2026-10-25 17:58:09.600391', '2026-10-25 17:58:09.600391', NULL);

INSERT INTO public.editoriales (id, nombre, created_at, updated_at, deleted_at) VALUES (4, 'Editorial Anagrama', '2026-10-25 17:58:09.600391', '2026-10-25 17:58:09.600391', NULL);

INSERT INTO public.editoriales (id, nombre, created_at, updated_at, deleted_at) VALUES (5, 'Alfaguara', '2026-10-25 17:58:09.600391', '2026-10-25 17:58:09.600391', NULL);

INSERT INTO public.editoriales (id, nombre, created_at, updated_at, deleted_at) VALUES (6, 'Grupo SM', '2026-10-25 17:58:09.600391', '2026-10-25 17:58:09.600391', NULL);

INSERT INTO public.editoriales (id, nombre, created_at, updated_at, deleted_at) VALUES (7, 'Debolsillo', '2026-10-25 17:58:09.600391', '2026-10-25 17:58:09.600391', NULL);

INSERT INTO public.editoriales (id, nombre, created_at, updated_at, deleted_at) VALUES (8, 'Editorial Norma', '2026-10-25 17:58:09.600391', '2026-10-25 17:58:09.600391', NULL);

INSERT INTO public.editoriales (id, nombre, created_at, updated_at, deleted_at) VALUES (9, 'Ediciones B', '2026-10-25 17:58:09.600391', '2026-10-25 17:58:09.600391', NULL);

INSERT INTO public.editoriales (id, nombre, created_at, updated_at, deleted_at) VALUES (10, 'Santillana', '2026-10-25 17:58:09.600391', '2026-10-25 17:58:09.600391', NULL);



INSERT INTO public.generos (id, nombre, created_at, updated_at, deleted_at) VALUES (1, 'Realismo Mágico', '2026-10-25 17:58:09.601274', '2026-10-25 17:58:09.601274', NULL);

INSERT INTO public.generos (id, nombre, created_at, updated_at, deleted_at) VALUES (2, 'Novela Histórica', '2026-10-25 17:58:09.601274', '2026-10-25 17:58:09.601274', NULL);

INSERT INTO public.generos (id, nombre, created_at, updated_at, deleted_at) VALUES (3, 'Ficción Científica', '2026-10-25 17:58:09.601274', '2026-10-25 17:58:09.601274', NULL);

INSERT INTO public.generos (id, nombre, created_at, updated_at, deleted_at) VALUES (4, 'Poesía', '2026-10-25 17:58:09.601274', '2026-10-25 17:58:09.601274', NULL);

INSERT INTO public.generos (id, nombre, created_at, updated_at, deleted_at) VALUES (5, 'Teatro', '2026-10-25 17:58:09.601274', '2026-10-25 17:58:09.601274', NULL);

INSERT INTO public.generos (id, nombre, created_at, updated_at, deleted_at) VALUES (6, 'Narrativa', '2026-10-25 17:58:09.601274', '2026-10-25 17:58:09.601274', NULL);

INSERT INTO public.generos (id, nombre, created_at, updated_at, deleted_at) VALUES (7, 'Ensayo', '2026-10-25 17:58:09.601274', '2026-10-25 17:58:09.601274', NULL);

INSERT INTO public.generos (id, nombre, created_at, updated_at, deleted_at) VALUES (8, 'Cuento', '2026-10-25 17:58:09.601274', '2026-10-25 17:58:09.601274', NULL);

INSERT INTO public.generos (id, nombre, created_at, updated_at, deleted_at) VALUES (9, 'Literatura Infantil', '2026-10-25 17:58:09.601274', '2026-10-25 17:58:09.601274', NULL);

INSERT INTO public.generos (id, nombre, created_at, updated_at, deleted_at) VALUES (10, 'Biografía', '2026-10-25 17:58:09.601274', '2026-10-25 17:58:09.601274', NULL);



INSERT INTO public.libros (id, titulo, precio, imagen, disponible, autor_id, editorial_id, genero_id, created_at, updated_at, deleted_at) VALUES (1, 'Cien Años de Soledad', 1500.00, NULL, true, 1, 1, 1, '2026-10-25 17:58:09.602153', '2026-10-25 17:58:09.602153', NULL);

INSERT INTO public.libros (id, titulo, precio, imagen, disponible, autor_id, editorial_id, genero_id, created_at, updated_at, deleted_at) VALUES (2, 'La Casa de los Espíritus', 1450.00, NULL, true, 2, 2, 1, '2026-10-25 17:58:09.602153', '2026-10-25 17:58:09.602153', NULL);

INSERT INTO public.libros (id, titulo, precio, imagen, disponible, autor_id, editorial_id, genero_id, created_at, updated_at, deleted_at) VALUES (3, 'Ficciones', 1300.00, NULL, true, 3, 3, 8, '2026-10-25 17:58:09.602153', '2026-10-25 17:58:09.602153', NULL);

INSERT INTO public.libros (id, titulo, precio, imagen, disponible, autor_id, editorial_id, genero_id, created_at, updated_at, deleted_at) VALUES (4, 'Conversación en La Catedral', 1400.00, NULL, true, 4, 4, 6, '2026-10-25 17:58:09.602153', '2026-10-25 17:58:09.602153', NULL);

INSERT INTO public.libros (id, titulo, precio, imagen, disponible, autor_id, editorial_id, genero_id, created_at, updated_at, deleted_at) VALUES (5, 'Rayuela', 1350.00, NULL, false, 5, 5, 6, '2026-10-25 17:58:09.602153', '2026-10-25 17:58:09.602153', NULL);

INSERT INTO public.libros (id, titulo, precio, imagen, disponible, autor_id, editorial_id, genero_id, created_at, updated_at, deleted_at) VALUES (6, 'Como Agua para Chocolate', 1200.00, NULL, true, 6, 6, 1, '2026-10-25 17:58:09.602153', '2026-10-25 17:58:09.602153', NULL);

INSERT INTO public.libros (id, titulo, precio, imagen, disponible, autor_id, editorial_id, genero_id, created_at, updated_at, deleted_at) VALUES (7, 'La Sombra del Viento', 1250.00, NULL, true, 7, 7, 6, '2026-10-25 17:58:09.602153', '2026-10-25 17:58:09.602153', NULL);

INSERT INTO public.libros (id, titulo, precio, imagen, disponible, autor_id, editorial_id, genero_id, created_at, updated_at, deleted_at) VALUES (8, 'Veinte Poemas de Amor', 900.00, NULL, true, 8, 8, 4, '2026-10-25 17:58:09.602153', '2026-10-25 17:58:09.602153', NULL);

INSERT INTO public.libros (id, titulo, precio, imagen, disponible, autor_id, editorial_id, genero_id, created_at, updated_at, deleted_at) VALUES (9, 'Don Quijote de la Mancha', 1700.00, NULL, true, 9, 9, 3, '2026-10-25 17:58:09.602153', '2026-10-25 17:58:09.602153', NULL);

INSERT INTO public.libros (id, titulo, precio, imagen, disponible, autor_id, editorial_id, genero_id, created_at, updated_at, deleted_at) VALUES (10, 'Bodas de Sangre', 950.00, NULL, false, 10, 10, 5, '2026-10-25 17:58:09.602153', '2026-10-25 17:58:09.602153', NULL);

INSERT INTO public.libros (id, titulo, precio, imagen, disponible, autor_id, editorial_id, genero_id, created_at, updated_at, deleted_at) VALUES (11, 'El Otoño del Patriarca', 1100.00, NULL, true, 1, 2, 1, '2026-10-25 17:58:09.602153', '2026-10-25 17:58:09.602153', NULL);

INSERT INTO public.libros (id, titulo, precio, imagen, disponible, autor_id, editorial_id, genero_id, created_at, updated_at, deleted_at) VALUES (12, 'De Amor y de Sombra', 1080.00, NULL, true, 2, 3, 1, '2026-10-25 17:58:09.602153', '2026-10-25 17:58:09.602153', NULL);

INSERT INTO public.libros (id, titulo, precio, imagen, disponible, autor_id, editorial_id, genero_id, created_at, updated_at, deleted_at) VALUES (13, 'El Aleph', 980.00, NULL, true, 3, 4, 8, '2026-10-25 17:58:09.602153', '2026-10-25 17:58:09.602153', NULL);

INSERT INTO public.libros (id, titulo, precio, imagen, disponible, autor_id, editorial_id, genero_id, created_at, updated_at, deleted_at) VALUES (14, 'La Guerra del Fin del Mundo', 1200.00, NULL, true, 4, 5, 2, '2026-10-25 17:58:09.602153', '2026-10-25 17:58:09.602153', NULL);

INSERT INTO public.libros (id, titulo, precio, imagen, disponible, autor_id, editorial_id, genero_id, created_at, updated_at, deleted_at) VALUES (15, 'Final del Juego', 990.00, NULL, true, 5, 6, 8, '2026-10-25 17:58:09.602153', '2026-10-25 17:58:09.602153', NULL);

INSERT INTO public.libros (id, titulo, precio, imagen, disponible, autor_id, editorial_id, genero_id, created_at, updated_at, deleted_at) VALUES (16, 'Tan Veloz Como el Deseo', 1050.00, NULL, true, 6, 7, 1, '2026-10-25 17:58:09.602153', '2026-10-25 17:58:09.602153', NULL);

INSERT INTO public.libros (id, titulo, precio, imagen, disponible, autor_id, editorial_id, genero_id, created_at, updated_at, deleted_at) VALUES (17, 'El Juego del Ángel', 1150.00, NULL, false, 7, 8, 6, '2026-10-25 17:58:09.602153', '2026-10-25 17:58:09.602153', NULL);

INSERT INTO public.libros (id, titulo, precio, imagen, disponible, autor_id, editorial_id, genero_id, created_at, updated_at, deleted_at) VALUES (18, 'Cien Sonetos de Amor', 870.00, NULL, true, 8, 9, 4, '2026-10-25 17:58:09.602153', '2026-10-25 17:58:09.602153', NULL);

INSERT INTO public.libros (id, titulo, precio, imagen, disponible, autor_id, editorial_id, genero_id, created_at, updated_at, deleted_at) VALUES (19, 'Novelas Ejemplares', 940.00, NULL, true, 9, 10, 9, '2026-10-25 17:58:09.602153', '2026-10-25 17:58:09.602153', NULL);

INSERT INTO public.libros (id, titulo, precio, imagen, disponible, autor_id, editorial_id, genero_id, created_at, updated_at, deleted_at) VALUES (20, 'Yerma', 930.00, NULL, true, 10, 1, 5, '2026-10-25 17:58:09.602153', '2026-10-25 17:58:09.602153', NULL);

INSERT INTO public.libros (id, titulo, precio, imagen, disponible, autor_id, editorial_id, genero_id, created_at, updated_at, deleted_at) VALUES (21, 'El Coronel No Tiene Quien Le Escriba', 1100.00, NULL, true, 1, 3, 1, '2026-10-25 17:58:09.602153', '2026-10-25 17:58:09.602153', NULL);

INSERT INTO public.libros (id, titulo, precio, imagen, disponible, autor_id, editorial_id, genero_id, created_at, updated_at, deleted_at) VALUES (22, 'Paula', 1000.00, NULL, true, 2, 4, 10, '2026-10-25 17:58:09.602153', '2026-10-25 17:58:09.602153', NULL);

INSERT INTO public.libros (id, titulo, precio, imagen, disponible, autor_id, editorial_id, genero_id, created_at, updated_at, deleted_at) VALUES (23, 'El Informe de Brodie', 1020.00, NULL, false, 3, 5, 8, '2026-10-25 17:58:09.602153', '2026-10-25 17:58:09.602153', NULL);

INSERT INTO public.libros (id, titulo, precio, imagen, disponible, autor_id, editorial_id, genero_id, created_at, updated_at, deleted_at) VALUES (24, 'La Ciudad y los Perros', 1250.00, NULL, true, 4, 6, 2, '2026-10-25 17:58:09.602153', '2026-10-25 17:58:09.602153', NULL);

INSERT INTO public.libros (id, titulo, precio, imagen, disponible, autor_id, editorial_id, genero_id, created_at, updated_at, deleted_at) VALUES (25, 'Bestiario', 950.00, NULL, true, 5, 7, 8, '2026-10-25 17:58:09.602153', '2026-10-25 17:58:09.602153', NULL);

INSERT INTO public.libros (id, titulo, precio, imagen, disponible, autor_id, editorial_id, genero_id, created_at, updated_at, deleted_at) VALUES (26, 'Cien Años de Soledad', 900.00, NULL, true, 1, 1, 1, '2026-10-25 18:00:39.375747', '2026-10-25 18:00:39.375747', NULL);

INSERT INTO public.libros (id, titulo, precio, imagen, disponible, autor_id, editorial_id, genero_id, created_at, updated_at, deleted_at) VALUES (27, 'Cien Años de Soledad', 1200.00, NULL, false, 2, 2, 1, '2026-10-25 18:00:39.375747', '2026-10-25 18:00:39.375747', NULL);

INSERT INTO public.libros (id, titulo, precio, imagen, disponible, autor_id, editorial_id, genero_id, created_at, updated_at, deleted_at) VALUES (28, 'Cien Años de Soledad', 1500.00, NULL, true, 3, 3, 8, '2026-10-25 18:00:39.375747', '2026-10-25 18:00:39.375747', NULL);

INSERT INTO public.libros (id, titulo, precio, imagen, disponible, autor_id, editorial_id, genero_id, created_at, updated_at, deleted_at) VALUES (29, 'Cien Años de Soledad', 1800.00, NULL, false, 1, 4, 6, '2026-10-25 18:00:39.375747', '2026-10-25 18:00:39.375747', NULL);

INSERT INTO public.libros (id, titulo, precio, imagen, disponible, autor_id, editorial_id, genero_id, created_at, updated_at, deleted_at) VALUES (30, 'Don Quijote de la Mancha', 800.00, NULL, true, 9, 9, 3, '2026-10-25 18:00:39.375747', '2026-10-25 18:00:39.375747', NULL);

INSERT INTO public.libros (id, titulo, precio, imagen, disponible, autor_id, editorial_id, genero_id, created_at, updated_at, deleted_at) VALUES (31, 'Don Quijote de la Mancha', 1100.00, NULL, false, 9, 1, 3, '2026-10-25 18:00:39.375747', '2026-10-25 18:00:39.375747', NULL);

INSERT INTO public.libros (id, titulo, precio, imagen, disponible, autor_id, editorial_id, genero_id, created_at, updated_at, deleted_at) VALUES (32, 'Don Quijote de la Mancha', 1500.00, NULL, true, 10, 2, 9, '2026-10-25 18:00:39.375747', '2026-10-25 18:00:39.375747', NULL);

INSERT INTO public.libros (id, titulo, precio, imagen, disponible, autor_id, editorial_id, genero_id, created_at, updated_at, deleted_at) VALUES (33, 'Ficciones', 700.00, NULL, true, 3, 3, 8, '2026-10-25 18:00:39.375747', '2026-10-25 18:00:39.375747', NULL);

INSERT INTO public.libros (id, titulo, precio, imagen, disponible, autor_id, editorial_id, genero_id, created_at, updated_at, deleted_at) VALUES (34, 'Ficciones', 1000.00, NULL, false, 3, 4, 7, '2026-10-25 18:00:39.375747', '2026-10-25 18:00:39.375747', NULL);

INSERT INTO public.libros (id, titulo, precio, imagen, disponible, autor_id, editorial_id, genero_id, created_at, updated_at, deleted_at) VALUES (35, 'Ficciones', 1300.00, NULL, true, 5, 5, 8, '2026-10-25 18:00:39.375747', '2026-10-25 18:00:39.375747', NULL);

INSERT INTO public.libros (id, titulo, precio, imagen, disponible, autor_id, editorial_id, genero_id, created_at, updated_at, deleted_at) VALUES (36, 'Rayuela', 850.00, NULL, false, 5, 5, 6, '2026-10-25 18:00:39.375747', '2026-10-25 18:00:39.375747', NULL);

INSERT INTO public.libros (id, titulo, precio, imagen, disponible, autor_id, editorial_id, genero_id, created_at, updated_at, deleted_at) VALUES (37, 'Rayuela', 1200.00, NULL, true, 5, 6, 6, '2026-10-25 18:00:39.375747', '2026-10-25 18:00:39.375747', NULL);

INSERT INTO public.libros (id, titulo, precio, imagen, disponible, autor_id, editorial_id, genero_id, created_at, updated_at, deleted_at) VALUES (38, 'Rayuela', 1600.00, NULL, true, 1, 7, 8, '2026-10-25 18:00:39.375747', '2026-10-25 18:00:39.375747', NULL);

INSERT INTO public.libros (id, titulo, precio, imagen, disponible, autor_id, editorial_id, genero_id, created_at, updated_at, deleted_at) VALUES (39, 'La Casa de los Espíritus', 950.00, NULL, true, 2, 2, 1, '2026-10-25 18:00:39.375747', '2026-10-25 18:00:39.375747', NULL);

INSERT INTO public.libros (id, titulo, precio, imagen, disponible, autor_id, editorial_id, genero_id, created_at, updated_at, deleted_at) VALUES (40, 'La Casa de los Espíritus', 1250.00, NULL, false, 2, 3, 1, '2026-10-25 18:00:39.375747', '2026-10-25 18:00:39.375747', NULL);

INSERT INTO public.libros (id, titulo, precio, imagen, disponible, autor_id, editorial_id, genero_id, created_at, updated_at, deleted_at) VALUES (41, 'La Casa de los Espíritus', 1550.00, NULL, true, 4, 4, 6, '2026-10-25 18:00:39.375747', '2026-10-25 18:00:39.375747', NULL);

INSERT INTO public.libros (id, titulo, precio, imagen, disponible, autor_id, editorial_id, genero_id, created_at, updated_at, deleted_at) VALUES (42, 'Aventuras del Código', 1000.00, NULL, true, 1, 1, 6, '2026-10-25 18:00:39.375747', '2026-10-25 18:00:39.375747', NULL);

INSERT INTO public.libros (id, titulo, precio, imagen, disponible, autor_id, editorial_id, genero_id, created_at, updated_at, deleted_at) VALUES (43, 'Biblioteca del Futuro', 1000.00, NULL, false, 2, 2, 3, '2026-10-25 18:00:39.375747', '2026-10-25 18:00:39.375747', NULL);

INSERT INTO public.libros (id, titulo, precio, imagen, disponible, autor_id, editorial_id, genero_id, created_at, updated_at, deleted_at) VALUES (44, 'Caminos de la Historia', 1000.00, NULL, true, 3, 3, 2, '2026-10-25 18:00:39.375747', '2026-10-25 18:00:39.375747', NULL);

INSERT INTO public.libros (id, titulo, precio, imagen, disponible, autor_id, editorial_id, genero_id, created_at, updated_at, deleted_at) VALUES (45, 'Diario de un Escritor', 1000.00, NULL, false, 4, 4, 10, '2026-10-25 18:00:39.375747', '2026-10-25 18:00:39.375747', NULL);

INSERT INTO public.libros (id, titulo, precio, imagen, disponible, autor_id, editorial_id, genero_id, created_at, updated_at, deleted_at) VALUES (46, 'El Código Secreto', 600.00, NULL, true, 5, 5, 3, '2026-10-25 18:00:39.375747', '2026-10-25 18:00:39.375747', NULL);

INSERT INTO public.libros (id, titulo, precio, imagen, disponible, autor_id, editorial_id, genero_id, created_at, updated_at, deleted_at) VALUES (47, 'El Código Secreto', 900.00, NULL, false, 6, 6, 3, '2026-10-25 18:00:39.375747', '2026-10-25 18:00:39.375747', NULL);

INSERT INTO public.libros (id, titulo, precio, imagen, disponible, autor_id, editorial_id, genero_id, created_at, updated_at, deleted_at) VALUES (48, 'El Código Secreto', 1200.00, NULL, true, 7, 7, 7, '2026-10-25 18:00:39.375747', '2026-10-25 18:00:39.375747', NULL);

INSERT INTO public.libros (id, titulo, precio, imagen, disponible, autor_id, editorial_id, genero_id, created_at, updated_at, deleted_at) VALUES (49, 'Historia Universal', 700.00, NULL, false, 8, 8, 2, '2026-10-25 18:00:39.375747', '2026-10-25 18:00:39.375747', NULL);

INSERT INTO public.libros (id, titulo, precio, imagen, disponible, autor_id, editorial_id, genero_id, created_at, updated_at, deleted_at) VALUES (50, 'Historia Universal', 1100.00, NULL, true, 9, 9, 2, '2026-10-25 18:00:39.375747', '2026-10-25 18:00:39.375747', NULL);

INSERT INTO public.libros (id, titulo, precio, imagen, disponible, autor_id, editorial_id, genero_id, created_at, updated_at, deleted_at) VALUES (51, 'La Aventura Final', 800.00, NULL, true, 10, 10, 6, '2026-10-25 18:00:39.375747', '2026-10-25 18:00:39.375747', NULL);

INSERT INTO public.libros (id, titulo, precio, imagen, disponible, autor_id, editorial_id, genero_id, created_at, updated_at, deleted_at) VALUES (52, 'La Aventura Final', 1400.00, NULL, false, 1, 1, 6, '2026-10-25 18:00:39.375747', '2026-10-25 18:00:39.375747', NULL);

INSERT INTO public.libros (id, titulo, precio, imagen, disponible, autor_id, editorial_id, genero_id, created_at, updated_at, deleted_at) VALUES (53, 'Programación Limpia', 950.00, NULL, true, 2, 3, 3, '2026-10-25 18:00:39.375747', '2026-10-25 18:00:39.375747', NULL);

INSERT INTO public.libros (id, titulo, precio, imagen, disponible, autor_id, editorial_id, genero_id, created_at, updated_at, deleted_at) VALUES (54, 'Programación Limpia', 950.00, NULL, false, 3, 4, 3, '2026-10-25 18:00:39.375747', '2026-10-25 18:00:39.375747', NULL);

INSERT INTO public.libros (id, titulo, precio, imagen, disponible, autor_id, editorial_id, genero_id, created_at, updated_at, deleted_at) VALUES (55, 'Zonas de Silencio', 500.00, NULL, true, 4, 5, 8, '2026-10-25 18:00:39.375747', '2026-10-25 18:00:39.375747', NULL);

INSERT INTO public.libros (id, titulo, precio, imagen, disponible, autor_id, editorial_id, genero_id, created_at, updated_at, deleted_at) VALUES (56, 'Zonas de Silencio', 1500.00, NULL, false, 5, 6, 8, '2026-10-25 18:00:39.375747', '2026-10-25 18:00:39.375747', NULL);



INSERT INTO public.inventario (id, libro_id, cantidad, fecha) VALUES (1, 1, 13, '2026-10-14 17:58:09.604097');

INSERT INTO public.inventario (id, libro_id, cantidad, fecha) VALUES (2, 2, 20, '2026-10-15 17:58:09.604097');

INSERT INTO public.inventario (id, libro_id, cantidad, fecha) VALUES (3, 3, 10, '2026-10-16 17:58:09.604097');

INSERT INTO public.inventario (id, libro_id, cantidad, fecha) VALUES (4, 4, 16, '2026-10-17 17:58:09.604097');

INSERT INTO public.inventario (id, libro_id, cantidad, fecha) VALUES (5, 5, 8, '2026-10-18 17:58:09.604097');

INSERT INTO public.inventario (id, libro_id, cantidad, fecha) VALUES (6, 6, 17, '2026-10-19 17:58:09.604097');

INSERT INTO public.inventario (id, libro_id, cantidad, fecha) VALUES (7, 7, 14, '2026-10-20 17:58:09.604097');

INSERT INTO public.inventario (id, libro_id, cantidad, fecha) VALUES (8, 8, 12, '2026-10-21 17:58:09.604097');

INSERT INTO public.inventario (id, libro_id, cantidad, fecha) VALUES (9, 9, 19, '2026-10-22 17:58:09.604097');

INSERT INTO public.inventario (id, libro_id, cantidad, fecha) VALUES (10, 10, 11, '2026-10-23 17:58:09.604097');

INSERT INTO public.inventario (id, libro_id, cantidad, fecha) VALUES (11, 11, 15, '2026-10-24 17:58:09.604097');

INSERT INTO public.inventario (id, libro_id, cantidad, fecha) VALUES (12, 12, 6, '2026-10-25 17:58:09.604097');

INSERT INTO public.inventario (id, libro_id, cantidad, fecha) VALUES (13, 13, 9, '2026-10-25 17:58:09.604097');

INSERT INTO public.inventario (id, libro_id, cantidad, fecha) VALUES (14, 14, 5, '2026-10-25 17:58:09.604097');

INSERT INTO public.inventario (id, libro_id, cantidad, fecha) VALUES (15, 15, 7, '2026-10-25 17:58:09.604097');

INSERT INTO public.inventario (id, libro_id, cantidad, fecha) VALUES (16, 16, 18, '2026-10-25 17:58:09.604097');

INSERT INTO public.inventario (id, libro_id, cantidad, fecha) VALUES (17, 17, 3, '2026-10-25 17:58:09.604097');

INSERT INTO public.inventario (id, libro_id, cantidad, fecha) VALUES (18, 18, 14, '2026-10-25 17:58:09.604097');

INSERT INTO public.inventario (id, libro_id, cantidad, fecha) VALUES (19, 19, 8, '2026-10-25 17:58:09.604097');

INSERT INTO public.inventario (id, libro_id, cantidad, fecha) VALUES (20, 20, 20, '2026-10-25 17:58:09.604097');

INSERT INTO public.inventario (id, libro_id, cantidad, fecha) VALUES (21, 21, 12, '2026-10-25 17:58:09.604097');

INSERT INTO public.inventario (id, libro_id, cantidad, fecha) VALUES (22, 22, 10, '2026-10-25 17:58:09.604097');

INSERT INTO public.inventario (id, libro_id, cantidad, fecha) VALUES (23, 23, 15, '2026-10-25 17:58:09.604097');

INSERT INTO public.inventario (id, libro_id, cantidad, fecha) VALUES (24, 24, 9, '2026-10-25 17:58:09.604097');

INSERT INTO public.inventario (id, libro_id, cantidad, fecha) VALUES (25, 25, 13, '2026-10-25 17:58:09.604097');

INSERT INTO public.inventario (id, libro_id, cantidad, fecha) VALUES (26, 26, 15, '2026-10-25 18:00:39.381659');

INSERT INTO public.inventario (id, libro_id, cantidad, fecha) VALUES (27, 28, 15, '2026-10-25 18:00:39.381659');

INSERT INTO public.inventario (id, libro_id, cantidad, fecha) VALUES (28, 30, 15, '2026-10-25 18:00:39.381659');

INSERT INTO public.inventario (id, libro_id, cantidad, fecha) VALUES (29, 32, 15, '2026-10-25 18:00:39.381659');

INSERT INTO public.inventario (id, libro_id, cantidad, fecha) VALUES (30, 33, 15, '2026-10-25 18:00:39.381659');

INSERT INTO public.inventario (id, libro_id, cantidad, fecha) VALUES (31, 35, 15, '2026-10-25 18:00:39.381659');

INSERT INTO public.inventario (id, libro_id, cantidad, fecha) VALUES (32, 37, 15, '2026-10-25 18:00:39.381659');

INSERT INTO public.inventario (id, libro_id, cantidad, fecha) VALUES (33, 38, 15, '2026-10-25 18:00:39.381659');

INSERT INTO public.inventario (id, libro_id, cantidad, fecha) VALUES (34, 39, 15, '2026-10-25 18:00:39.381659');

INSERT INTO public.inventario (id, libro_id, cantidad, fecha) VALUES (35, 41, 15, '2026-10-25 18:00:39.381659');

INSERT INTO public.inventario (id, libro_id, cantidad, fecha) VALUES (36, 42, 15, '2026-10-25 18:00:39.381659');

INSERT INTO public.inventario (id, libro_id, cantidad, fecha) VALUES (37, 44, 15, '2026-10-25 18:00:39.381659');

INSERT INTO public.inventario (id, libro_id, cantidad, fecha) VALUES (38, 46, 15, '2026-10-25 18:00:39.381659');

INSERT INTO public.inventario (id, libro_id, cantidad, fecha) VALUES (39, 48, 15, '2026-10-25 18:00:39.381659');

INSERT INTO public.inventario (id, libro_id, cantidad, fecha) VALUES (40, 50, 15, '2026-10-25 18:00:39.381659');

INSERT INTO public.inventario (id, libro_id, cantidad, fecha) VALUES (41, 51, 15, '2026-10-25 18:00:39.381659');

INSERT INTO public.inventario (id, libro_id, cantidad, fecha) VALUES (42, 53, 15, '2026-10-25 18:00:39.381659');

INSERT INTO public.inventario (id, libro_id, cantidad, fecha) VALUES (43, 55, 15, '2026-10-25 18:00:39.381659');



SELECT setval(pg_get_serial_sequence('public.usuarios', 'id'), COALESCE((SELECT MAX(id) FROM public.usuarios), 1), EXISTS (SELECT 1 FROM public.usuarios));

SELECT setval(pg_get_serial_sequence('public.autores', 'id'), COALESCE((SELECT MAX(id) FROM public.autores), 1), EXISTS (SELECT 1 FROM public.autores));

SELECT setval(pg_get_serial_sequence('public.editoriales', 'id'), COALESCE((SELECT MAX(id) FROM public.editoriales), 1), EXISTS (SELECT 1 FROM public.editoriales));

SELECT setval(pg_get_serial_sequence('public.generos', 'id'), COALESCE((SELECT MAX(id) FROM public.generos), 1), EXISTS (SELECT 1 FROM public.generos));

SELECT setval(pg_get_serial_sequence('public.libros', 'id'), COALESCE((SELECT MAX(id) FROM public.libros), 1), EXISTS (SELECT 1 FROM public.libros));

SELECT setval(pg_get_serial_sequence('public.inventario', 'id'), COALESCE((SELECT MAX(id) FROM public.inventario), 1), EXISTS (SELECT 1 FROM public.inventario));

COMMIT;
