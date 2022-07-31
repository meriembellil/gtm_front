import { api } from "helpers/consts";

/**
 * @returns Visit list by userId(merchandiser)
 */
export const getVisitByUser = async (userId, from, to) => {
    const res = await api.get(`/visit/${userId}/${from}/${to}`);
    return res.data.data
};

/**
 * @param {[Visit]} visits array of visit 
 */
export const upsertVisit = async (visits) => {
    const res = await api.post(`/visit`, visits);
    return res
};

/**
 * @param {Integer} id visitId 
 */
export const deleteVisitById = async (id) => {
    const res = await api.delete(`/visit/${id}`);
    return res
};