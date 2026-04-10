import axios, { AxiosInstance } from 'axios'

export const axiosInstance: AxiosInstance = axios.create({
    baseURL: process.env.API_URL ||'https://api.thecatapi.com/v1',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        ...(process.env.API_KEY && {
            'x-api-key': process.env.API_KEY,
        })
    }
})

