import axios from 'axios';

const auth_api = axios.create({
  // baseURL: 'https://server.pranimithra.in/auth/api/',
  baseURL: `${process.env.REACT_APP_SERVER_URL}/auth/api/`,
  withCredentials: true
});

const farmer_api = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/farmer/api/`,
  withCredentials: true
});

const doctor_api = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/doctor/api/`, 
  withCredentials: true
});

const hospital_api = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/hospital/api/`,
  withCredentials: true
});

const organization_api = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/organ/api/`,
  withCredentials: true
});

const vendor_api = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/vendor/api/`,
  withCredentials: true
});

const ae_api = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/animal_enth/api/`,
  withCredentials: true
});

const admin_api = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/admin/api/`,
  withCredentials: true
});

const payment_api = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/pay/api/`,
  withCredentials: true
});

export default {
  auth_api,
  farmer_api,
  doctor_api,
  hospital_api,
  organization_api,
  vendor_api,
  ae_api,
  admin_api,
  payment_api
};
