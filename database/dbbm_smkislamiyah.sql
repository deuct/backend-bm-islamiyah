-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Feb 10, 2023 at 12:40 AM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 8.0.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dbbm_smkislamiyah`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `nama_lengkap` varchar(26) NOT NULL,
  `username` varchar(11) NOT NULL,
  `photo_dir` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`nama_lengkap`, `username`, `photo_dir`, `createdAt`, `updatedAt`) VALUES
('Admin Farhan', 'admin01', 'files/images/profile-picture/730_generated.jpg', '2022-12-20 00:41:19', '2023-02-04 00:22:42');

-- --------------------------------------------------------

--
-- Table structure for table `jenis_kelamin`
--

CREATE TABLE `jenis_kelamin` (
  `id` int(2) NOT NULL,
  `jenis_kelamin` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `jenis_kelamin`
--

INSERT INTO `jenis_kelamin` (`id`, `jenis_kelamin`) VALUES
(1, 'Laki - laki'),
(2, 'Perempuan');

-- --------------------------------------------------------

--
-- Table structure for table `jurusan`
--

CREATE TABLE `jurusan` (
  `id` int(2) NOT NULL,
  `nama_jurusan` varchar(50) NOT NULL,
  `deskripsi` varchar(150) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `jurusan`
--

INSERT INTO `jurusan` (`id`, `nama_jurusan`, `deskripsi`, `createdAt`, `updatedAt`) VALUES
(1, 'TKJ', 'Teknik Komputer Jaringan', '2023-02-05 08:29:25', '2023-02-05 08:29:35'),
(2, 'Akuntansi', 'Akuntansi', '2023-02-05 08:29:35', '2023-02-05 08:29:35');

-- --------------------------------------------------------

--
-- Table structure for table `nasabah`
--

CREATE TABLE `nasabah` (
  `norek` varchar(12) NOT NULL,
  `pengesah` varchar(20) NOT NULL,
  `nama_lengkap` varchar(26) NOT NULL,
  `kelas` varchar(5) NOT NULL,
  `kode_jurusan` varchar(2) NOT NULL,
  `NIS` int(16) NOT NULL,
  `kode_jk` varchar(1) NOT NULL,
  `tgl_lahir` date NOT NULL,
  `alamat` text NOT NULL,
  `notelp` int(16) NOT NULL,
  `email` varchar(50) NOT NULL,
  `tgl_daftar` date NOT NULL,
  `ayah` varchar(50) NOT NULL,
  `ibu` varchar(50) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `nasabah`
--

INSERT INTO `nasabah` (`norek`, `pengesah`, `nama_lengkap`, `kelas`, `kode_jurusan`, `NIS`, `kode_jk`, `tgl_lahir`, `alamat`, `notelp`, `email`, `tgl_daftar`, `ayah`, `ibu`, `createdAt`, `updatedAt`) VALUES
('20221224001', 'Farhan Edited', 'Nasabah New Edited', 'XII', 'TK', 2147483647, 'F', '2000-12-13', 'Pd. Petir Utara Jl. Betong No.9, Pamulang Edited', 2147483647, 'farhan972015@gmail.com Edited', '2023-01-10', 'fadlusz', 'dian Edited', '2022-12-22 15:30:33', '2022-12-22 15:30:33'),
('20221224099', 'Farhan', 'Nasabah New 3', 'X', 'TK', 2147483647, 'L', '2000-12-08', 'Pd. Petir Utara Jl. Betong No.9, Pamulang', 2147483647, 'farhan972015@gmail.com', '2023-01-11', 'fadlu', 'dian', '2022-12-24 05:25:19', '2022-12-24 05:25:19'),
('20221224105', 'asdasd', 'Farhan Fadil', 'XI', 'in', 2147483647, 'M', '2022-07-13', 'test', 123123, 'asdasd', '2022-12-24', 'asdasdas', 'asdasd', '2022-12-24 10:44:34', '2022-12-24 10:44:34'),
('20221224106', 'asdasd', 'farhan testing', 'XI', 'in', 2147483647, 'M', '2022-07-13', 'test', 123123, 'asdasd', '2022-12-24', 'asdasdas', 'asdasd', '2022-12-24 10:45:34', '2022-12-24 10:45:34'),
('20230121013', 'x', 'new', 'X', 'x', 0, 'M', '2023-01-13', 'x', 0, 'x', '2023-01-21', 'x', 'texxx', '2023-01-21 03:16:53', '2023-01-21 03:16:53'),
('20230121014', 'Nurmeli', 'dono', 'XI', 'tk', 123, 'M', '2004-01-03', 'ciputat', 123333, 'dono@mail.com', '2023-01-21', 'joko', 'susan', '2023-01-21 09:27:33', '2023-01-21 09:27:33'),
('20230126015', 'j', 'John', 'X', 'j', 0, 'M', '2023-01-02', 'j', 0, 'j', '2023-01-26', 'j', 'j', '2023-01-26 14:41:33', '2023-01-26 14:41:33'),
('20230130016', 'rahmat', 'oji', 'X', 'tk', 123456, 'M', '2010-01-06', 'xxxx', 2111111, 'oji@mail', '2023-01-10', 'rosta', 'ujuk', '2023-01-30 06:17:25', '2023-01-30 06:17:25'),
('2023017012', 'new 7', 'new 7', 'X', 'ne', 0, 'M', '0000-00-00', 'new 7', 0, 'new 7', '2023-01-07', 'new 7', 'new 7', '2023-01-07 04:20:55', '2023-01-07 04:20:55'),
('20230205018', 'TLR001', 'user baru', 'X', '1', 123, '2', '2023-02-01', '123', 123, '123', '2023-02-05', 'fa', 'fa', '2023-02-05 08:08:45', '2023-02-05 08:08:45'),
('20230205019', 'TLR001', 'bunga', 'XI', '2', 123, '1', '2023-02-01', '123', 123, '123', '2023-02-05', 'fa', 'fa', '2023-02-05 08:27:32', '2023-02-05 08:27:32'),
('20230205020', 'TLR001', 'dyandra', 'XI', '1', 123, '1', '2023-02-01', '123', 123, '123', '2023-02-05', '123', '123', '2023-02-05 08:29:40', '2023-02-05 08:29:40'),
('20230208001', 'TLR001', 'Nasabah New', 'X', '1', 123, '1', '2000-02-08', 'Pamulang', 2147483647, 'farhan972015@mail.com', '2023-02-08', 'Fadlu', 'Dian', '2023-02-08 15:50:06', '2023-02-08 15:50:06'),
('20230208002', 'TLR001', 'baru4', 'X', '1', 123, '1', '2023-02-08', '123', 123123, '123', '2023-02-08', '123', '123', '2023-02-08 16:40:01', '2023-02-08 16:40:01'),
('20230209001', 'TLR001', 'sidang', 'X', '1', 123, '1', '2023-02-02', 'pamulang', 123, 'farhan@mail.com', '2023-02-09', 'test', 'test', '2023-02-09 03:25:17', '2023-02-09 03:25:17'),
('2023025017', 'TLR001', 'februari123', 'XI', '1', 123456, '1', '2023-02-01', '1234', 1234, '1234', '2023-02-05', 'farhan', 'bunga', '2023-02-05 06:51:20', '2023-02-05 06:51:20');

-- --------------------------------------------------------

--
-- Table structure for table `nsb_webuser`
--

CREATE TABLE `nsb_webuser` (
  `username` varchar(26) NOT NULL,
  `norek` varchar(16) NOT NULL,
  `photo_dir` varchar(100) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `nsb_webuser`
--

INSERT INTO `nsb_webuser` (`username`, `norek`, `photo_dir`, `createdAt`, `updatedAt`) VALUES
('baru4', '20230208002', 'files/images/profile-picture/aa.jpg', '2023-02-08 16:40:01', '2023-02-08 16:40:01'),
('bunga123', '20230205019', '', '2023-02-05 09:36:49', '2023-02-05 09:36:49'),
('far444', '20230205020', '', '2023-02-05 08:29:40', '2023-02-05 08:29:40'),
('farhan122', '20221224105', '', '2023-01-29 05:39:26', '2023-01-29 05:39:26'),
('farhannfdl', '20230121014', '', '2023-01-27 13:23:08', '2023-01-27 13:23:08'),
('john123', '20230126015', 'files/images/profile-picture/test.jpg', '2023-01-26 14:41:33', '2023-01-26 14:41:33'),
('nasabahnew', '20230208001', '', '2023-02-08 15:50:06', '2023-02-08 15:50:06'),
('oji123', '20230130016', '', '2023-01-30 06:17:25', '2023-01-30 06:17:25'),
('sidang1', '20230209001', '', '2023-02-09 03:25:17', '2023-02-09 03:25:17'),
('user01', '20221224001', '', '2023-01-23 15:15:03', '2023-01-23 15:15:03'),
('x123', '20230121013', '', '2023-01-30 06:19:13', '2023-01-30 06:19:13');

-- --------------------------------------------------------

--
-- Table structure for table `st_homedate`
--

CREATE TABLE `st_homedate` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `period_start` date NOT NULL,
  `period_end` date NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `st_homedate`
--

INSERT INTO `st_homedate` (`id`, `name`, `period_start`, `period_end`, `createdAt`, `updatedAt`) VALUES
(1, 'nasabah', '2022-12-01', '2023-01-17', '2023-01-07 23:32:32', '2023-01-07 23:32:32'),
(2, 'saldo', '2022-01-05', '2023-01-31', '2023-01-07 23:32:32', '2023-01-07 23:32:32'),
(3, 'transaksi', '2023-01-06', '2023-01-31', '2023-01-07 23:33:39', '2023-01-07 23:33:39');

-- --------------------------------------------------------

--
-- Table structure for table `st_logo`
--

CREATE TABLE `st_logo` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `path` varchar(255) NOT NULL,
  `updatedAt` datetime NOT NULL,
  `createdAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `st_logo`
--

INSERT INTO `st_logo` (`id`, `name`, `path`, `updatedAt`, `createdAt`) VALUES
(1, 'logo-islamiyah.png', 'files/images/logo-islamiyah.png', '2023-01-21 03:01:49', '2023-01-21 03:01:49');

-- --------------------------------------------------------

--
-- Table structure for table `teller`
--

CREATE TABLE `teller` (
  `username` varchar(100) NOT NULL,
  `no` int(5) NOT NULL,
  `nama_lengkap` varchar(26) NOT NULL,
  `nuptk` varchar(50) NOT NULL,
  `photo_dir` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `teller`
--

INSERT INTO `teller` (`username`, `no`, `nama_lengkap`, `nuptk`, `photo_dir`, `createdAt`, `updatedAt`) VALUES
('TLR001', 1, 'Teller Satusss', '222111312', 'files/images/profile-picture/93134-full_tracing-the-beatles-road-to-white-album-as-rock-s.jpg', '2022-12-25 08:33:12', '2022-12-25 08:33:12'),
('TLR002', 2, 'Teller Dua', '66555333431', '', '2022-12-25 08:33:30', '2022-12-25 08:33:30'),
('TLR010', 3, 'test edit 14', 'test', '', '2023-01-07 09:29:24', '2023-01-07 09:29:24'),
('TLR011', 4, 'new teller edited 14', '213222', '', '2023-01-14 16:16:32', '2023-01-14 16:16:32'),
('TLR012', 6, 'Bunga', '123456', '', '2023-01-29 12:21:07', '2023-01-29 12:21:07'),
('TLR013', 7, 'Dyandra', '22222111', 'files/images/profile-picture/aa.jpg', '2023-01-29 12:24:02', '2023-01-29 12:24:02'),
('TLR015', 9, 'senin', '1234', 'files/images/profile-picture/avatar.png', '2023-01-30 06:11:25', '2023-01-30 06:11:25');

-- --------------------------------------------------------

--
-- Table structure for table `transaksi`
--

CREATE TABLE `transaksi` (
  `id_transaksi` varchar(20) NOT NULL,
  `teller` varchar(20) NOT NULL,
  `norek` varchar(16) NOT NULL,
  `tgl_transaksi` date NOT NULL,
  `type` varchar(20) NOT NULL,
  `jumlah` int(16) NOT NULL,
  `current_saldo` int(9) NOT NULL,
  `updatedAt` datetime NOT NULL,
  `createdAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `transaksi`
--

INSERT INTO `transaksi` (`id_transaksi`, `teller`, `norek`, `tgl_transaksi`, `type`, `jumlah`, `current_saldo`, `updatedAt`, `createdAt`) VALUES
('TRS-20230121038', 'TLR001', '20221224001', '2023-01-21', 'penarikan', 120000, 0, '2023-01-21 04:34:58', '2023-01-21 04:34:58'),
('TRS-20230121039', 'TLR001', '20221224001', '2023-01-21', 'penarikan', 10000, 0, '2023-01-21 04:35:49', '2023-01-21 04:35:49'),
('TRS-20230121040', 'TLR001', '20221224001', '2023-01-21', 'penarikan', 10000, 0, '2023-01-21 04:36:55', '2023-01-21 04:36:55'),
('TRS-20230121041', 'TLR001', '20221224001', '2023-01-21', 'penarikan', 100000, 0, '2023-01-21 04:38:59', '2023-01-21 04:38:59'),
('TRS-20230121042', 'TLR001', '20221224001', '2023-01-21', 'penarikan', 1000000, 0, '2023-01-21 04:39:56', '2023-01-21 04:39:56'),
('TRS-20230121043', 'TLR001', '20221224001', '2023-01-21', 'setoran', 100000, 0, '2023-01-21 04:43:24', '2023-01-21 04:43:24'),
('TRS-20230121044', 'TLR001', '20221224001', '2023-01-21', 'penarikan', 50000, 0, '2023-01-21 04:43:41', '2023-01-21 04:43:41'),
('TRS-20230121045', 'TLR001', '20221224001', '2023-01-21', 'penarikan', 1000, 0, '2023-01-21 04:43:54', '2023-01-21 04:43:54'),
('TRS-20230121046', 'TLR001', '20230121014', '2023-01-21', 'setoran', 20000, 0, '2023-01-21 09:30:36', '2023-01-21 09:30:36'),
('TRS-20230121047', 'TLR002', '20230121014', '2023-01-21', 'penarikan', 10000, 0, '2023-01-21 09:32:23', '2023-01-21 09:32:23'),
('TRS-20230123048', 'TLR001', '20230121014', '2023-01-23', 'setoran', 15000, 0, '2023-01-23 06:20:20', '2023-01-23 06:20:20'),
('TRS-20230128049', 'test edit 14', '20230126015', '2023-01-28', 'setoran', 200000, 0, '2023-01-28 15:41:06', '2023-01-28 15:41:06'),
('TRS-20230129050', 'Teller Dua', '20230126015', '2023-01-28', 'penarikan', 5000, 0, '2023-01-28 23:44:33', '2023-01-28 23:44:33'),
('TRS-20230129051', '', '20230126015', '2023-01-29', 'setoran', 100000, 0, '2023-01-29 01:01:51', '2023-01-29 01:01:51'),
('TRS-20230129052', '', '20230126015', '2023-01-29', 'penarikan', 50000, 0, '2023-01-29 01:02:34', '2023-01-29 01:02:34'),
('TRS-20230130053', 'Teller Dua', '20230126015', '2023-01-30', 'setoran', 250000, 0, '2023-01-30 06:22:14', '2023-01-30 06:22:14'),
('TRS-20230205006', 'TLR001', '20230205019', '2023-02-05', 'setoran', 100000, 100000, '2023-02-05 15:18:32', '2023-02-05 15:18:32'),
('TRS-20230205007', 'TLR001', '20230205019', '2023-02-05', 'penarikan', 50000, 50000, '2023-02-05 15:18:49', '2023-02-05 15:18:49'),
('TRS-20230207001', 'TLR001', '20230205020', '2023-02-07', 'setoran', 10000, 10000, '2023-02-06 23:52:36', '2023-02-06 23:52:36'),
('TRS-20230207002', 'TLR001', '20230205020', '2023-02-07', 'penarikan', 10000, 0, '2023-02-07 00:02:54', '2023-02-07 00:02:54'),
('TRS-20230208001', 'TLR001', '20230208002', '2023-02-08', 'setoran', 50000, 50000, '2023-02-08 16:51:31', '2023-02-08 16:51:31'),
('TRS-20230208002', 'TLR001', '20230208002', '2023-02-08', 'penarikan', 5000, 45000, '2023-02-08 16:57:06', '2023-02-08 16:57:06'),
('TRS-20230209001', 'TLR001', '20230209001', '2023-02-09', 'setoran', 50000, 50000, '2023-02-09 03:26:45', '2023-02-09 03:26:45'),
('TRS-20230209002', 'TLR001', '20230209001', '2023-02-09', 'penarikan', 10000, 40000, '2023-02-09 03:29:33', '2023-02-09 03:29:33'),
('TRS-20230209003', 'TLR001', '20230209001', '2023-02-09', 'penarikan', 10000, 30000, '2023-02-09 08:26:37', '2023-02-09 08:26:37');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `username` varchar(16) NOT NULL,
  `password` varchar(255) NOT NULL,
  `refresh_token` varchar(255) NOT NULL,
  `isNewUser` varchar(1) NOT NULL,
  `role` varchar(10) NOT NULL,
  `updatedAt` datetime NOT NULL,
  `createdAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`username`, `password`, `refresh_token`, `isNewUser`, `role`, `updatedAt`, `createdAt`) VALUES
('admin01', '$2a$12$/r7Je221m9w6R6Ve1.QjweCv8cBnCeaVIBt3oRO6XjblYTCiShkK2', '', 'Y', 'admin', '2023-02-04 18:05:18', '2023-02-04 18:05:18'),
('baru4', '$2b$10$03KTQknVkerdW2XqJ4utxelmcql9blidn6zf/lBPmeLkwPY8cYuIa', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImJhcnU0IiwiaWF0IjoxNjc1ODc0ODU5LCJleHAiOjE2NzU5NjEyNTl9.4MtUbVooWNJ03xOu85bhf7gsMt3NcboYPb5MIyLUPRQ', 'N', 'nasabah', '2023-02-08 16:40:01', '2023-02-08 16:40:01'),
('bunga123', '$2a$12$f.xgCpBG2II/ZjxOG9vC3u3qriPxcPMQPUIvdRJ7kysIqyqBxD3N.', '', 'Y', '', '2023-02-05 09:36:49', '2023-02-05 09:36:49'),
('fa123', '$2a$12$f.xgCpBG2II/ZjxOG9vC3u3qriPxcPMQPUIvdRJ7kysIqyqBxD3N.', '', 'Y', '', '2023-02-05 08:08:45', '2023-02-05 08:08:45'),
('fa456', '$2a$12$f.xgCpBG2II/ZjxOG9vC3u3qriPxcPMQPUIvdRJ7kysIqyqBxD3N.', '', 'Y', '', '2023-02-05 08:27:32', '2023-02-05 08:27:32'),
('far444', '$2b$10$Rjmg3X458HbYFmhQWsRRO.4bYNgO3z6/zEr/aZhYT6//TOs9LPUmq', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImZhcjQ0NCIsImlhdCI6MTY3NTU5NTc5MiwiZXhwIjoxNjc1NjgyMTkyfQ.peamPvIjcv6mrdVfly72vjUvaJI8mv8dBH-jr4iiqKE', 'N', 'nasabah', '2023-02-05 08:29:40', '2023-02-05 08:29:40'),
('farhan122', '$2a$12$/r7Je221m9w6R6Ve1.QjweCv8cBnCeaVIBt3oRO6XjblYTCiShkK2', '', 'Y', 'nasabah', '2023-02-04 18:05:18', '2023-02-04 18:05:18'),
('feb123', '$2a$12$f.xgCpBG2II/ZjxOG9vC3u3qriPxcPMQPUIvdRJ7kysIqyqBxD3N.', '', 'Y', '', '2023-02-05 06:51:20', '2023-02-05 06:51:20'),
('nasabahnew', '$2b$10$BgzvYYn5W5WiXvW9VJd4o.ErDjAcNH.kgSaNHz46kAUiv6r.juV7O', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6Im5hc2FiYWhuZXciLCJpYXQiOjE2NzU4NzE0MzUsImV4cCI6MTY3NTk1NzgzNX0.mgOGFYeDg-lpAyIJbhzzLjbPt0BAHoSmgYm_0bZobsw', 'N', 'nasabah', '2023-02-08 15:50:06', '2023-02-08 15:50:06'),
('sidang1', '$2b$10$sjNfMaxnJfsv8wlF1pvbMuAvzVGMHblG53BVcIabyqrf1ZAug6fVO', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InNpZGFuZzEiLCJpYXQiOjE2NzU5MzYwMzgsImV4cCI6MTY3NjAyMjQzOH0.Lzhn-H51GYURKq72R16Mz-gHOqqPK6WJ2UXId8bZDFE', 'N', 'nasabah', '2023-02-09 03:25:17', '2023-02-09 03:25:17'),
('TLR001', '$2a$12$f.xgCpBG2II/ZjxOG9vC3u3qriPxcPMQPUIvdRJ7kysIqyqBxD3N.', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IlRMUjAwMSIsImlhdCI6MTY3NTkyNzY4NiwiZXhwIjoxNjc2MDE0MDg2fQ.yH9YKCEYm2P548JZa7TbY6nnVUT0saUzkOh8zOfSaLE', 'N', 'teller', '2023-02-04 18:05:18', '2023-02-04 18:05:18');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `jenis_kelamin`
--
ALTER TABLE `jenis_kelamin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jurusan`
--
ALTER TABLE `jurusan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `nasabah`
--
ALTER TABLE `nasabah`
  ADD PRIMARY KEY (`norek`);

--
-- Indexes for table `nsb_webuser`
--
ALTER TABLE `nsb_webuser`
  ADD PRIMARY KEY (`username`),
  ADD UNIQUE KEY `norek` (`norek`);

--
-- Indexes for table `st_homedate`
--
ALTER TABLE `st_homedate`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `st_logo`
--
ALTER TABLE `st_logo`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `teller`
--
ALTER TABLE `teller`
  ADD PRIMARY KEY (`username`),
  ADD UNIQUE KEY `no` (`no`);

--
-- Indexes for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD PRIMARY KEY (`id_transaksi`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `jenis_kelamin`
--
ALTER TABLE `jenis_kelamin`
  MODIFY `id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `jurusan`
--
ALTER TABLE `jurusan`
  MODIFY `id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `st_homedate`
--
ALTER TABLE `st_homedate`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `st_logo`
--
ALTER TABLE `st_logo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `teller`
--
ALTER TABLE `teller`
  MODIFY `no` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
