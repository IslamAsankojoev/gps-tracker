import axiosInstance from './axios.config';

export const LocationService = {
  findAll: async () => {
    const response = await axiosInstance.get('/save-location/');
    const data = await response.data;
    return data;
  },
  findOne: async (id: string) => {
    const response = await axiosInstance.get(`/save-location/${id}/`);
    const data = await response.data;
    return data;
  },
  create: async (latitude: string, longitude: string, user: number) => {
    const response = await axiosInstance.post('/save-location/', {
      latitude,
      longitude,
      user,
    });
    const data = await response.data;
    return data;
  },
  update: async (id: number, user: number, latitude: string, longitude: string) => {
    const response = await axiosInstance.put(`/save-location/${id}/`, {
      user,
      latitude,
      longitude,
    });
    const data = await response.data;
    return data;
  },
  delete: async (id: number) => {
    const response = await axiosInstance.delete(`/save-location/${id}/`);
    const data = await response.data;
    return data;
  },
};

export type ILocation = {
  id?: number;
  user: number;
  latitude: string;
  longitude: string;
};
