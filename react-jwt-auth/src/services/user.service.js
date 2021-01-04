import axios from "axios"
import authHeader from "./auth-header"

const API_URL_USER = "http://localhost:8090/"

class UserService {

    getAllProduct() {
        return axios.get(API_URL_USER + "ShowProduct")
    }

    postCreatProduct() {
        return axios.post(API_URL_USER + "CreatProduct", { header: authHeader() })
    }

    deleteProductId(id) {
        return axios.delete(API_URL_USER + "DeleteProduct/"+ id, { header: authHeader() })
    }
}

export default new UserService()