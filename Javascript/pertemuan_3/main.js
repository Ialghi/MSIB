// array untuk menyimpan daftar produk
let produkToko = [
    {id: 1, nama: "Laptop", harga: 7000000, stok: 5},
    {id: 2, nama: "Mouse", harga: 200000, stok: 10},
    {id: 3, nama: "Keyboard", harga: 350000, stok: 7}
];

 // array untuk menyimpan produk keranjang belanja
let keranjang = [];

// fungsi untuk menambahkan produk baru
function tambahProduk() {
    nama = document.getElementById('namaProduk').value;
    harga = document.getElementById('hargaProduk').value;
    stok = document.getElementById('stokProduk').value;
    // mengecek apakah nama produk sudah ada di array produkToko atau belum
    const produkAda = produkToko.some(produk => produk.nama.toLowerCase() === nama.toLowerCase());
    if (!nama || !harga || !stok) { // validasi input agar tidak kosong
        alert('Semua input harus diisi!');
        return;
    }
    
    // jika nama produk sudah ada maka akan alert produk sudah ada
    if (produkAda) { 
        alert('Produk sudah ada!');
        return;
    }
    // jika produk belum ada maka bisa menambahkan produk baru
    else { 
        // menambahkan produk baru ke array produkToko
        const idProdukBaru = produkToko.length ? produkToko[produkToko.length - 1].id + 1 : 1; // membuat id produk baru
        produkToko.push({id: idProdukBaru, nama, harga: Number(harga), stok: Number(stok)}); // menambahkan produk baru ke array produkToko dan memastikan harga dan stok bertipe number
        tampilkanProduk();
    }
}

// fungsi untuk menampilkan daftar produk
function tampilkanProduk() {
    let listProduk = document.getElementById('listProduk');
    listProduk.innerHTML = ''; // membersihkan daftar produk sebelumnya sudah ditampilkan

    // mengambil value dari search input
    let search = document.getElementById('search').value.toLowerCase();

    // menampilkan kembali produk yang sesuai dengan search
    produkToko.forEach(produk => { // loop melalui setiap produk dalam array produkToko
        if (produk.nama.toLowerCase().includes(search)) {
            const produkCard = document.createElement('div'); // membuat elemen div untuk setiap produk yang ada di array produkToko
            produkCard.className = 'card bg-light px-3 mb-3';
            produkCard.innerHTML = `
                <div class="d-flex justify-content-between align-items-center mb-4 my-3">
                    <h4>${produk.nama}</h4>
                    <div>
                        <button class="btn btn-danger btn-sm" onclick="hapusProduk(${produk.id})"><i class="bi bi-trash"></i></button>
                        <button class="btn btn-warning btn-sm text-white" onclick="tambahKeKeranjang(${produk.id})"><i class="bi bi-cart-plus-fill"></i></button>
                    </div>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                    <p class="text-muted">Rp ${produk.harga.toLocaleString()}</p>
                    <small class="alert alert-primary py-1 px-2">stok: ${produk.stok}</small>
                </div>`;
            listProduk.appendChild(produkCard); // menambahkan elemen div ke dalam listProduk di HTML
        }
    });
}

// fungsi untuk menghapus produk dari daftar produk berdasarkan id
function hapusProduk(id) {
    produkToko = produkToko.filter(produk => produk.id !== id); // menghapus produk dari array produkToko berdasarkan id
    tampilkanProduk();
}

// fungsi untuk menambahkan produk ke keranjang
function tambahKeKeranjang(id) {
    const produk = produkToko.find(produk => produk.id === id); // mencari produk berdasarkan id
    if (produk && produk.stok > 0) { // mengecek apakah produk ada dan stoknya lebih dari 0
        // mengecek apakah produk sudah ada di keranjang atau belum
        const produkDiKeranjang = keranjang.find(item => item.produk.id === id);
        if (produkDiKeranjang) {
            produkDiKeranjang.jumlah ++; // jika sudah ada, menambahkan jumlahnya di keranjang
        } 
        else {
            keranjang.push({produk, jumlah: 1}); // jika belum ada, menambahkan produk ke keranjang
        }

        produk.stok --; // mengurangi stok produk
        tampilkanProduk();
        tampilkanKeranjang();
    }
    //jika produk habis stoknya akan muncul alert
    else { 
        alert('Stok produk habis!');
    }
}

// fungsi untuk menampilkan isi keranjang
function tampilkanKeranjang() {
    let keranjangList = document.getElementById('keranjangList');
    keranjangList.innerHTML = ''; // bersihkan daftar keranjang sebelumnya
    let totalItem = 0;
    keranjang.forEach(produkKeranjang => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        listItem.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <span>${produkKeranjang.produk.nama} (x${produkKeranjang.jumlah})</span>
                <span>Rp ${(produkKeranjang.produk.harga * produkKeranjang.jumlah).toLocaleString()}</span>
            </div>`;
        keranjangList.appendChild(listItem);
        totalItem += produkKeranjang.produk.harga * produkKeranjang.jumlah;
    });

    // menampilkan total harga produk di keranjang
    document.getElementById('totalItem').innerText = `Rp ${totalItem.toLocaleString()}`;
}

//fungsi untuk memproses pembayaran
function prosesPembayaran() {
    const harga = document.getElementById('totalItem').innerText;
    if (keranjang.length === 0) { // mengecek apakah keranjang kosong
        alert('Keranjang belanja kosong!'); // jika kosong akam muncul alert bahwa keranjang kosong
        return;
    }

    alert('Total yang perlu dibayar: ' + harga);
    keranjang = []; // mengosongkan keranjang setelah pembayaran

    tampilkanKeranjang();
}

// perintah untuk menampilkan produk saat halaman dimuat
tampilkanProduk();