import axios from 'axios';

const API_URL = 'http://192.168.1.39:8082';

interface PropertyData {
  address: string;
  price: number;
}


export const fetchProperties = async () => {
  const response = await axios.get(`${API_URL}/properties`);
  return response.data;
};

export const createProperty = async (propertyData: PropertyData) => {
  const response = await axios.post(`${API_URL}/properties`, propertyData);
  return response.data;
};

export const fetchPaymentHistory = async (propertyId: number) => {
  const response = await axios.get(`${API_URL}/payments/history/${propertyId}`);
  return response.data;
};
