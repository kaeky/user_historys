-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-08-2021 a las 18:25:50
-- Versión del servidor: 10.4.20-MariaDB
-- Versión de PHP: 8.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `fusepong`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `company`
--

CREATE TABLE `company` (
  `nit` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `phone` bigint(15) NOT NULL,
  `address` varchar(50) NOT NULL,
  `email` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `company`
--

INSERT INTO `company` (`nit`, `name`, `phone`, `address`, `email`) VALUES
(1654, 'camisas', 64879778, 'calle 46 # 55 sur - 44', 'camisas@hotmail.com'),
(51963, 'sillas', 123456, 'calle 46 # 45- 4', 'sillas@hotmail.com'),
(96357, 'sudaderas', 1415978, 'calle 49 # 41sur - 4', 'sudaderas@hotmail.com'),
(145654, 'keky', 123456789, 'calle 546 # 45 sur - 4', 'keky@hotmail.com'),
(147536, 'tenis', 456789, 'calle 86 # 45 sur - 4', 'tenis@hotmail.com'),
(123456789, 'fusepong', 3124521145, 'calle 111# 75-50', 'fusepong@gmail.com'),
(456789123, 'zapatos', 654879798, 'calle 56 # 5 sur - 4', 'zapatos@hotmail.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `project`
--

CREATE TABLE `project` (
  `id_project` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `description` varchar(200) NOT NULL,
  `companyFK` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `project`
--

INSERT INTO `project` (`id_project`, `name`, `description`, `companyFK`) VALUES
(5, 'proyecto 1', 'proyecto 1', 1654),
(6, 'proyecto 2', 'proyecto 2', 1654),
(7, 'proyecto 1', 'proyecto 1', 123456789),
(8, 'proyecto 2', 'proyecto 2', 123456789),
(9, 'proyecto 1', 'proyecto 1', 145654),
(10, 'proyecto 2', 'proyecto 2', 145654),
(11, 'proyecto 1', 'proyecto 1', 51963),
(12, 'proyecto 2', 'proyecto 2', 51963),
(13, 'proyecto 1', 'proyecto 1', 96357),
(14, 'proyecto 2', 'proyecto 2', 96357),
(15, 'proyecto 1', 'proyecto 1', 147536),
(16, 'proyecto 2', 'proyecto 2', 147536),
(17, 'proyecto 2das', 'proyecto 2', 456789123),
(18, 'proyecto 2', 'proyecto 2', 456789123),
(25, 'dsadas', 'dasda', 456789123),
(26, 'Proyecto 3', 'Holaaaaa', 456789123),
(27, 'Proyecto 3', 'Holaaaaaaaaaa', 456789123),
(28, 'dsa', 'dsa', 456789123),
(29, 'Lisa', 'Hola lisa', 456789123),
(30, 'Carlos', 'dasdsa', 456789123),
(31, 'Preuba', '123', 456789123),
(32, 'Diosito', 'Funciona', 456789123),
(33, 'Prueba 3', 'dsadadsadasdsada', 456789123),
(34, 'dasdasda', 'dsadasda', 456789123),
(35, 'dsadas', 'sadasd', 456789123),
(36, 'dsadsa', 'asdas', 456789123),
(37, 'Nuevo', '123', 456789123),
(38, 'Nuevo123', '123', 456789123),
(39, 'test', 'test', 456789123),
(40, 'Kskdksjd', 'Kskdjabd', 147536),
(41, 'adsads', 'asdasda', 1654),
(42, 'asdasd', 'asdasdas', 1654);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `status`
--

CREATE TABLE `status` (
  `id_status` int(11) NOT NULL,
  `type` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `status`
--

INSERT INTO `status` (`id_status`, `type`) VALUES
(1, 'Activo'),
(2, 'En proceso'),
(3, 'Finalizado'),
(4, 'Cancelado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ticket`
--

CREATE TABLE `ticket` (
  `id_ticket` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `contend` varchar(200) NOT NULL,
  `comment` varchar(200) NOT NULL,
  `statusFK` int(11) NOT NULL,
  `user_historyFK` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `lastname` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(200) NOT NULL,
  `companyFK` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id_user`, `name`, `lastname`, `email`, `password`, `companyFK`) VALUES
(46, 'Carlosdsada', 'dsadasadsadsada', 'carlosadas@hmal.com', '$2a$08$641ufNPafg0nKIbhZdpc0OYpRxCrfV.biINP9zG.5CS', NULL),
(49, 'dsadas', 'dsadsa', 'dsad@mgioal.com', '$2a$08$seTteSYH1X.83/7OK6tGIe4JF0ZT10CMnFuQIyl52RA', NULL),
(52, 'dsadas', 'dsadsa', 'dsad@mdasgioal.com', '$2a$08$4GQNFRqJo.abvbDz4wDUxOp81huKMxM7PkgM4lOEAQp', NULL),
(61, 'dsadsa', 'dsadsa', 'dsad@dsadasdamdasgioal.com', '$2a$08$Hy3P1PVG1O/FeGOSglVn5OTXU9i4X8Mku2x2TxQSMV5', NULL),
(62, 'Preubalogin', 'dsada', 'login123@gmail.com', '$2a$08$DNHFxauILafUE5xaBAZQOuwC38fC8JO/XGKrD7RjhR8', NULL),
(63, 'dsadsa', 'dsadsa', 'preuba123@prueba.com', '$2a$10$o8uCJlfkiPx8QnoAHS1YP.hY8UpFIQhsurhfTU2xAeU', NULL),
(66, 'dsadsa', 'dsadsa', 'preub123@prueba.com', '$2a$08$Px9Gz4wx6GU/t9cMUjRLG.Bq4Sgk6TqZl0lzwvvv4qM', NULL),
(68, 'Preubalogin', 'dsada', 'login123s@gmail.com', '$2a$08$Pvi5a/8lXPwuh6datj6d3.f56Dv07TkO7zl/FtZmD6ZTE9Iv2FV1e', NULL),
(69, 'csada', 'dsadas', 'dsadasdasdsa@dsagsdad.com', '$2a$08$Hm9pXUQ2ugYmIEdTYwB35.59hIB94JxRxauAvdfYV8BkZC4Dd5iY.', NULL),
(70, 'pruebaa2', 'casa', '123@prueba.com', '$2a$08$hh97gdKjB1jIW6reeRanUOAP1HWJqcBxaqQ3zmYhhq1MUkkWDTGYe', NULL),
(71, 'dsada', 'asdadas', 'funciona@prueba.com', '$2a$08$HEMy1ruuKYwEjodI6EXHR.oGZ61tP7lbc3g4D5xucrHYPLyh0k1Ma', 456789123),
(72, 'Ximena', 'Nava', 'ximenanava@gmail.com', '$2a$08$tMT79baTLKQLPCFi9qIPAu1kRL4NNqL/pC7u5fksyL9VBRvhG5eQS', 147536),
(73, 'dsadsa', 'dsadas', 'zapatos@gmail.com', '$2a$08$wcqJHpJ24DNHE6DY4/3o0OOFNzxDHAGQ.YvksjYCpppaXzJjx0A/C', 456789123),
(74, 'cristian', 'puenguenan', 'styven21121@gmail.com', '$2a$08$xvYf8FqwhLydD3a3IpDMD.C6CadZ37mx9QkmdBHLZlLjNFFf1gU.u', 1654),
(75, 'dasdas', 'dasdsa', 'dasdsa@gmail.com', '$2a$08$qLg5u/dd7hrPdh268UZhT.hG6sErLpawsBjJ3J3Azu1FKwjXGL3fq', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_history`
--

CREATE TABLE `user_history` (
  `id_userhistory` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `contend` varchar(200) NOT NULL,
  `projectFK` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `user_history`
--

INSERT INTO `user_history` (`id_userhistory`, `name`, `contend`, `projectFK`) VALUES
(6, 'historia1123 edited', 'historia1 edited', 30),
(7, 'historia2', 'historia2', 34),
(8, 'historia3', 'historia3', 32),
(9, 'historia4', 'historia4', 28),
(10, 'historia5', 'historia5', 29),
(11, 'historia1', 'historia', 11),
(12, 'Nueva historia', 'No lo se ', 32),
(53, 'Carlos', 'cascsa', 25),
(56, 'dsadasd', 'dsadas', 26),
(58, 'dsadads', 'dasdas', 31),
(61, 'dsadsadas', 'dsadsada', 26);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`nit`);

--
-- Indices de la tabla `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`id_project`),
  ADD KEY `companyFK` (`companyFK`);

--
-- Indices de la tabla `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`id_status`);

--
-- Indices de la tabla `ticket`
--
ALTER TABLE `ticket`
  ADD PRIMARY KEY (`id_ticket`),
  ADD KEY `statusFK` (`statusFK`),
  ADD KEY `user_historyFK` (`user_historyFK`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `company_FK` (`companyFK`);

--
-- Indices de la tabla `user_history`
--
ALTER TABLE `user_history`
  ADD PRIMARY KEY (`id_userhistory`),
  ADD KEY `projectFK` (`projectFK`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `project`
--
ALTER TABLE `project`
  MODIFY `id_project` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT de la tabla `status`
--
ALTER TABLE `status`
  MODIFY `id_status` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `ticket`
--
ALTER TABLE `ticket`
  MODIFY `id_ticket` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT de la tabla `user_history`
--
ALTER TABLE `user_history`
  MODIFY `id_userhistory` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `project`
--
ALTER TABLE `project`
  ADD CONSTRAINT `companyFK` FOREIGN KEY (`companyFK`) REFERENCES `company` (`nit`);

--
-- Filtros para la tabla `ticket`
--
ALTER TABLE `ticket`
  ADD CONSTRAINT `statusFK` FOREIGN KEY (`statusFK`) REFERENCES `status` (`id_status`),
  ADD CONSTRAINT `user_historyFK` FOREIGN KEY (`user_historyFK`) REFERENCES `user_history` (`id_userhistory`);

--
-- Filtros para la tabla `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `company_FK` FOREIGN KEY (`companyFK`) REFERENCES `company` (`nit`);

--
-- Filtros para la tabla `user_history`
--
ALTER TABLE `user_history`
  ADD CONSTRAINT `projectFK` FOREIGN KEY (`projectFK`) REFERENCES `project` (`id_project`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
