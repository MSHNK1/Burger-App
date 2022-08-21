import axios from "axios";

const instance = axios.create({
    baseURL: 'https://fastfoodburger-b4f23-default-rtdb.europe-west1.firebasedatabase.app/'
});

export default instance;