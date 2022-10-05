import axios, { AxiosRequestConfig } from 'axios'

const config: AxiosRequestConfig = {
  baseURL: 'https://nane.tada.team/api',
}

const client = axios.create(config)

export default client
