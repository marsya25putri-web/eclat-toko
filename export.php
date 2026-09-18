<?php
header('Content-Type: application/json');
include '../config/koneksi.php';

$query = "SELECT p.id, p.nama_produk, p.harga, p.stok, p.deskripsi, p.gambar, 
          p.kategori_id, k.nama_kategori
          FROM produk p
          LEFT JOIN kategori k ON p.kategori_id = k.id
          ORDER BY p.id";

$result = mysqli_query($koneksi, $query);
$data = [];

while ($row = mysqli_fetch_assoc($result)) {
    $row['harga'] = (int) $row['harga'];
    $row['stok'] = (int) $row['stok'];
    $row['id'] = (int) $row['id'];
    $row['kategori_id'] = (int) $row['kategori_id'];
    $data[] = $row;
}

echo json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
?>