// API para gerenciar categorias e transações

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export default api;