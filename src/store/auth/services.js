import { api } from "helpers/consts";

export const authenticate = async (user) => {
    const res = await api.post(`/auth/login`, user);
    return res.data;
};