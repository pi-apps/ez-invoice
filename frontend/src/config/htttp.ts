import axios from 'axios';

export interface WindowWithEnv extends Window {
    __ENV?: {
      backendURL: string, // REACT_APP_BACKEND_URL environment variable
      sandbox: "true" | "false", // REACT_APP_SANDBOX_SDK environment variable - string, not boolean!
    }
}
const _window: WindowWithEnv = window;
const backendURL = _window.__ENV && _window.__ENV.backendURL;

export const axiosClient = axios.create({ baseURL: `${backendURL}`, timeout: 20000, withCredentials: true});
export const config = {headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}};
// export const config = {headers: {'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>', 'Access-Control-Allow-Origin': '*', 'Accept-Encoding': 'gzip, deflate, br'}};