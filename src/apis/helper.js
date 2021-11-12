import axios from 'axios'

const baseURL = 'http://cpbl-python.herokuapp.com'

export const apiHelper = axios.create({
  baseURL
})
