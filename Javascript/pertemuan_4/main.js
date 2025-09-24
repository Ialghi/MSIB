// class data pelanggan untuk sistem manajemen transportasi
class Pelanggan {
    constructor(nama, nomorTelepon, kendaraanDisewa) {
        this.nama = nama;
        this.nomorTelepon = nomorTelepon;
        this.kendaraanDisewa = kendaraanDisewa;
    }
    // method untuk menampilkan info pelanggan
    tampilkanInfo() {
        console.log(`Nama: ${this.nama}, Nomor Telepon: ${this.nomorTelepon}, Kendaraan Disewa: ${this.kendaraanDisewa}`);
    }   
}

// class data pelanggan yang sedang menyewa
class PelangganSedangMenyewa extends Pelanggan {
    constructor(nama, nomorTelepon, kendaraanDisewa, statusSewa) {
        super(nama, nomorTelepon, kendaraanDisewa);
        this.statusSewa = statusSewa;
    }
    // method untuk menampilkan nama pelanggan yang sedang menyewa
    tampilkanInfo() {
        super.tampilkanInfo();
        console.log(`Nama: ${this.nama}, Status Sewa: ${this.statusSewa}`);
    }

}

// class sistem manajemen transportasi
class SistemManajemenTransportasi {
    constructor() {
        this.pelangganList = [];
    }
    // method untuk menambah pelanggan baru
    tambahPelanggan(pelanggan) {
        this.pelangganList.push(pelanggan);
        console.log(`Pelanggan baru ditambahkan: ${pelanggan.nama}`);
    }
    // method untuk menampilkan semua pelanggan
    tampilkanSemuaPelanggan() {
        this.pelangganList.forEach(pelanggan => { // membuat perulangan untuk menampilkan semua pelanggan
            pelanggan.tampilkanInfo();
        });
    }
}


const sistem = new SistemManajemenTransportasi();

const pelanggan1 = new Pelanggan("Ihsan", "08123456789", "Mobil");
const pelanggan2 = new PelangganSedangMenyewa("Akmal", "08987654321", "Motorcycle", "Sedang Disewa");

sistem.tambahPelanggan(pelanggan1);
sistem.tambahPelanggan(pelanggan2);

sistem.tampilkanSemuaPelanggan();
