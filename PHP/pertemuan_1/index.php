<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Form Penilaian</title>
</head>
<body>
    <h1>Form cek nilai</h1>
    <form method="POST">
        <label for="nama">Nama</label><br>
        <input type="text" name="nama" required><br>
        <label for="email">Email</label><br>
        <input type="text" name="email" required><br>
        <label for="nilai">Nilai</label><br>
        <input type="text" name="nilai" required><br>

        <input type="submit" name="proses" value="cekNilai">
    </form>

    <?php

    if (isset($_POST['proses'])){
        $nama = $_POST['nama'];
        $email = $_POST['email'];
        $nilai = $_POST['nilai'];
        $tombol = $_POST['proses'];

        if ($nilai >= 70 && $nilai < 100) $keterangan = 'Lulus';
        else if ($nilai < 70 && $nilai > 0) $keterangan = 'Remedial';
        else $keterangan = 'Tidak Valid';

        echo '<br><br>';
        echo "Nama: $nama <br>";
        echo "Email: $email <br>";
        echo "Nilai: $nilai <br>";
        echo "Keterangan: $keterangan <br>";
    }
    
    ?>

    
</body>
</html>