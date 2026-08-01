import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const getEntries = async () => {
  const response = await api.get("/entries");

  return response.data;
};


interface CreateEntryData {
  term: string;
  meaning: string;
  category?: string;
  example?: string;
}

export const createEntry = async (data: CreateEntryData) => {
  const response = await api.post("/entries", data);
  return response.data;
};

export const deleteEntry = async (id: string) => {
  await api.delete(`/entries/${id}`);
};