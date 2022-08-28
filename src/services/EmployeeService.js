import axios from 'axios';

const employeeServiceAPI = axios.create({baseURL: 'http://localhost:9090/'});

export { employeeServiceAPI};