import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});

// Portfolio API
export const getPortfolio = async () => {
  const response = await api.get("/portfolio/");
  return response.data;
};

// Prediction API
export const getPrediction = async (symbol = "AAPL") => {
  const response = await api.get(`/predict?symbol=${symbol}`);
  return response.data;
};

// Stock History API
export const getStockHistory = async (symbol) => {
  const response = await api.get(`/stock/${symbol}/history`);
  return response.data;
};

// Market API
export const getMarketOverview = async () => {
  const response = await api.get("/market/overview");
  return response.data;
};



// Auth API
export const login = async (email, password) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
};

export const register = async (email, password) => {
  const response = await api.post("/auth/register", { email, password });
  return response.data;
};

export default api;

