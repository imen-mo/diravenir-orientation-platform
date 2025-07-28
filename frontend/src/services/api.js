import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8084/api",
});

export default API;

// URL de base de l'API (adapter si besoin)
const API_BASE = 'http://localhost:8084/api';

export const fetchFilieres = async () => {
  const response = await axios.get(`${API_BASE}/filieres`);
  return response.data;
};

export const fetchTemoignages = async () => {
  const response = await axios.get(`${API_BASE}/temoignages`);
  return response.data;
};

export const fetchDestinations = async () => {
  const response = await axios.get(`${API_BASE}/destinations`);
  return response.data;
};

export const fetchPartenaires = async () => {
  const response = await axios.get(`${API_BASE}/partenaires`);
  return response.data;
};
