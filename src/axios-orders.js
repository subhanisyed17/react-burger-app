import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://react-burger-app-4468a.firebaseio.com/'
})

export default instance;