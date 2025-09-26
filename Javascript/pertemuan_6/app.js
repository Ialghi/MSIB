import { store, destroy, index } from './controller.js';

export class UserView {
    constructor() {
        this.tbody = document.getElementById('listUser');
        this.form = document.getElementById('formTambahUser');
        this.inputNama = document.getElementById('inputNama');
        this.inputUmur = document.getElementById('inputUmur');
        this.inputAlamat = document.getElementById('inputAlamat');
        this.inputEmail = document.getElementById('inputEmail');
    }

    // menampilkan data user
    tampilkanData(users) {
        this.tbody.innerHTML = '';
        
        const rows = users.map(user => {
            const tableRow = document.createElement('tr');
            tableRow.innerHTML = `
                <td>${user.id}</td>
                <td>${user.nama}</td>
                <td>${user.umur}</td>
                <td>${user.alamat}</td>
                <td>${user.email}</td>
                <td>
                    <button class="btn btn-danger btn-sm" id="hapus-btn-${user.id}"><i class="bi bi-trash"></i></button>
                </td>
            `;
            return tableRow;
        });
        
        // Menambahkan semua baris ke tabel
        rows.forEach(tableRow => this.tbody.appendChild(tableRow));

        // membuat event listener tombol hapus
        for (const user of users) {
            const hapusBtn = document.getElementById(`hapus-btn-${user.id}`);
            hapusBtn.addEventListener('click', () => {
                destroy(user.id); // memanggil fungsi destroy dari controller
                const users = index(); // mengambil data user terbaru
                this.tampilkanData(users); 
            });
        }
    }

    // menambahkan data user dari input
    tambahUser() {
        this.form.addEventListener('submit', (event) => {
            event.preventDefault();
            
            const dataUser = {
                nama: this.inputNama.value,
                umur: Number(this.inputUmur.value),
                alamat: this.inputAlamat.value,
                email: this.inputEmail.value
            };

            store(dataUser); // memanggil fungsi store dari controller
            const users = index();
            this.tampilkanData(users);
            this.form.reset();
        });
    }
}

// membuat eventlistener untuk menampilkan data user saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    const view = new UserView();
    const users = index();
    
    view.tampilkanData(users);
    view.tambahUser();
});