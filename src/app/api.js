import Axios from "axios";

const api = Axios.create({
    baseURL: "https://api.etherscan.io/api?module=account&action=txlistinternal&address=0x2Eee48ae4Ffc10FBAbE48c64F90d76cDafa80B2D&startblock=0&endblock=latest&page=1&offset=1000&sort=desc&apikey=",
    
    timeout: 50000000000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export default api;