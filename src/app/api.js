import Axios from "axios";

const api = Axios.create({
    baseURL: "https://api.etherscan.io/api?module=account&action=txlistinternal&address=0xb2Fda2C633Ae2B600dd732F57e0F325CBE95f590&startblock=0&endblock=latest&page=1&offset=1000&sort=desc&apikey=GBDNNIHACP5YDQ8DPZTZRMI1HFNSZZG2XH",
    
    timeout: 50000000000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export default api;