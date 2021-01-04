import axios from "axios"

const API_URL_AUTH = "http://localhost:8080/"

class AuthService {
    login(name, password) {
        return axios
            .post(API_URL_AUTH + "Login", {
                name,
                password
            })
            .then( response => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data))
                }

                return response.data
            })
    }

    logout() {
        localStorage.removeItem("user")
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem("user"))
    }
}

export default new AuthService()