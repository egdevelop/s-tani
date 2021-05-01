-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Waktu pembuatan: 01 Bulan Mei 2021 pada 23.10
-- Versi server: 10.4.17-MariaDB
-- Versi PHP: 8.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `stani`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `forum`
--

CREATE TABLE `forum` (
  `id` int(11) NOT NULL,
  `id_petani` int(11) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `isi` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `forum`
--

INSERT INTO `forum` (`id`, `id_petani`, `nama`, `isi`) VALUES
(5, 1, 'Pak dadang', 'halo'),
(6, 3, 'Bryan Dharmawan', 'Hallo'),
(7, 4, 'Febrian Dwi Rizqi Dharmawan', 'Gimana atasi hama sawah nih pa');

-- --------------------------------------------------------

--
-- Struktur dari tabel `petani`
--

CREATE TABLE `petani` (
  `id` int(11) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `resiko` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `petani`
--

INSERT INTO `petani` (`id`, `nama`, `username`, `password`, `resiko`) VALUES
(1, 'Pak dadang', 'dadang12', '$2b$10$XBHNjymjJ/YQdWQjTYV62.TAWqpaY8ZHBHP8MA05LANjg/kGk208m', 10),
(2, 'Pak Yoga', 'yogany115', '$2b$10$6MRRbPR.8HxnRK7zvwuUeea9uSP/l.7b9i.BmSBcztwfKx1U.vCsy', 10),
(3, 'Bryan Dharmawan', 'bry99', '$2b$10$36NDFJHH0t7Vmy.12D7SF.XDe3ehiv8lzTsOCVPvAoQ2F20zLpiXm', 5),
(4, 'Febrian Dwi Rizqi Dharmawan', 'bryandharmawan75', '$2b$10$rVEFoLjJeJwE3gSMrmfh7OE7K38n5XUJzrfaH8XcFmw8uYPM1hD1m', 8);

-- --------------------------------------------------------

--
-- Struktur dari tabel `tanaman`
--

CREATE TABLE `tanaman` (
  `id` int(11) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `rasio_pasar` int(10) NOT NULL,
  `suhu_min` varchar(25) NOT NULL,
  `tanah_min` varchar(25) NOT NULL,
  `udara_min` varchar(25) NOT NULL,
  `ketinggian_min` varchar(25) NOT NULL,
  `suhu_max` varchar(25) NOT NULL,
  `udara_max` varchar(25) NOT NULL,
  `tanah_max` varchar(25) NOT NULL,
  `ketinggian_max` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `tanaman`
--

INSERT INTO `tanaman` (`id`, `nama`, `rasio_pasar`, `suhu_min`, `tanah_min`, `udara_min`, `ketinggian_min`, `suhu_max`, `udara_max`, `tanah_max`, `ketinggian_max`) VALUES
(3, 'Jagung', 90, '21', '80', '60', '50', '40', '100', '90', '600'),
(4, 'Padi', 70, '20', '70', '30', '50', '35', '100', '80', '1300'),
(5, 'Terong', 70, '20', '30', '50', '50', '30', '70', '70', '800'),
(6, 'Tomat', 50, '24', '60', '50', '200', '40', '100', '80', '700'),
(7, 'Jagung', 90, '0', '0', '0', '0', '1000', '1000', '1000', '1000'),
(8, 'Padi', 70, '0', '0', '0', '0', '1000', '1000', '1000', '1000'),
(9, 'Tomat', 50, '0', '0', '0', '0', '10000', '1000', '1000', '1000');

-- --------------------------------------------------------

--
-- Struktur dari tabel `test`
--

CREATE TABLE `test` (
  `id` int(11) NOT NULL,
  `id_petani` int(11) NOT NULL,
  `waktu` varchar(100) NOT NULL,
  `suhu` varchar(25) NOT NULL,
  `tanah` varchar(25) NOT NULL,
  `udara` varchar(25) NOT NULL,
  `ketinggian` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `test`
--

INSERT INTO `test` (`id`, `id_petani`, `waktu`, `suhu`, `tanah`, `udara`, `ketinggian`) VALUES
(1, 1, '2021-04-07 23:00:29.178', '10', '10', '10', '10'),
(3, 2, '2021-04-28 22:14:22.389', '20.00', '20.00', '74.00', '191.00'),
(12, 2, '2021-04-28 22:32:29.326', '27.00', '20.00', '74.00', '191.00'),
(13, 2, '2021-04-28 22:32:33.627', '27.00', '20.00', '74.00', '191.00'),
(14, 2, '2021-04-28 22:32:42.636', '27.00', '20.00', '74.00', '191.00'),
(15, 2, '2021-04-28 22:42:09.043', '20.00', '27.00', '27.00', '199.00');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `forum`
--
ALTER TABLE `forum`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `petani`
--
ALTER TABLE `petani`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `tanaman`
--
ALTER TABLE `tanaman`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `test`
--
ALTER TABLE `test`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `forum`
--
ALTER TABLE `forum`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT untuk tabel `petani`
--
ALTER TABLE `petani`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `tanaman`
--
ALTER TABLE `tanaman`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT untuk tabel `test`
--
ALTER TABLE `test`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
