import axios, { AxiosResponse } from 'axios';
import { Gig } from '../models/gig';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'http://localhost:5001/api';

axios.interceptors.response.use(async response => {
   try{
    await sleep(1000);
    return response;
   }
    catch(error) {
        console.log(error);
        return await Promise.reject(error);
    }
})

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Gigs = {
    list: () => requests.get<Gig[]>('/gigs'),
    details: (id: string) => requests.get<Gig>(`/gigs/${id}`),
    create: (gig: Gig) => requests.post<void>('/gigs', gig),
    update: (gig: Gig) => requests.put<void>(`/gigs`, gig),
    delete: (id: string) => requests.del<void>(`/gigs/${id}`)
}

const agent = {
    Gigs
}

export default agent;