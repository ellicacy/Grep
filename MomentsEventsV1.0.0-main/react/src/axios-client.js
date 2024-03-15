import axios from "axios";

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
})

axiosClient.interceptors.request.use((config) => {
    if (!config.headers.Authorization) {
        const token = localStorage.getItem('ACCESS_TOKEN');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});


axiosClient.interceptors.response.use((response)=>{
    return response;
}, (error)=>{
    try{
        const {response} = error;
        // if (response) {
            if (response.status === 401) {
                localStorage.removeItem('ACCESS_TOKEN')
                localStorage.removeItem('USER')
            }
        // }
    }catch(e) {
        console.error(e)
    }
    throw error;
    // return Promise.reject(error);
})

export default axiosClient;