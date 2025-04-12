import axios from 'axios';

const API_URL = 'http://192.268.1.39:8082'; // Замените на адрес бекенда

export const fetchProperties = async () => {
  const response = await axios.get(`${API_URL}/properties`);
  return response.data;
};

export const createProperty = async (propertyData) => {
  const response = await axios.post(`${API_URL}/properties`, propertyData);
  return response.data;
};

export const fetchPaymentHistory = async (propertyId) => {
  const response = await axios.get(`${API_URL}/payments/history/${propertyId}`);
  return response.data;
};
