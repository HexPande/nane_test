import axios, { AxiosRequestConfig } from 'axios'

const config: AxiosRequestConfig = {
  baseURL: 'https://nane.tada.team/api',
}

const client = axios.create(config)

client.interceptors.response.use((response) => response, (error) => {
  alert('Error getting data from server')
  throw error
});

export default client
