import axios from "axios";

const instance=axios.create( {
    //The API (cloud fn) URL
    baseURL:" http://localhost:5000"
})

export default instance;