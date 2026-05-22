import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const api = axios.create({ baseURL: API_URL });

export const createBooking = (data) => api.post("/booking", data).then((r) => r.data);
export const getBookings = () => api.get("/booking").then((r) => r.data);
export const deleteBooking = (id) => api.delete(`/booking/${id}`).then((r) => r.data);
export const updateBookingStatus = (id, status) =>
  api.patch(`/booking/${id}`, { status }).then((r) => r.data);
