import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/auth";

class AuthService {

    register(data){
        return axios.post(`${API_BASE_URL}/user`,data);
    }
    login(credentials) {
        return axios.post(`${API_BASE_URL}/login`, credentials);
    }
}

const authServiceInstance = new AuthService();

export default authServiceInstance;
