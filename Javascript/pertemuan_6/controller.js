import { users } from "./data.js";

let dataUsers = [...users];

// mengambil data user
const index = () => {
    return dataUsers;
}

// menambahkan data user
const store = (user) => {
    const idBaru = dataUsers.length + 1;
    dataUsers = [...dataUsers, { id: idBaru, ...user }]; //menginsert data user baru
}

// menghapus data user
const destroy = (id) => {
    dataUsers = dataUsers.filter(user => user.id !== id); 
}

export { index, store, destroy };