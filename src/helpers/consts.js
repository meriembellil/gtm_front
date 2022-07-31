import socketIOClient from "socket.io-client"
import axios from "axios";
export const API_URL = process.env.REACT_APP_API_URL;
export let api;

/**
 * token from localStorage
 */
const token = localStorage.getItem('authUser')

/**
 * config axios
 */
if (token) {
  api = axios.create({
    baseURL: API_URL,
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
} else {
  api = axios.create({
    baseURL: API_URL,
  })
}

/**
 * socket client
 */
export const socket = socketIOClient(API_URL)