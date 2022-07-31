import { api } from "helpers/consts";

/**
 * 
 * @returns roles list
 */
export const getRoles = async () => {
    const res = await api.get(`/role`);
    return res.data.data;
}

/**
 * 
 * @param {Role} role 
 * @returns  Role
 */
 export const upsertRole = async (role) => {
    const res = await api.post(`/role`, role)
    return res.data;
}

/**
 * 
 * @param {Permission} permission 
 * @param {int} roleId 
 * @returns Permission
 */
export const upsertPermission = async (permission) => {
    const res = await api.post(`/permission`, permission)
    return res.data;
}

export const getPermissionsByRole = async (roleId) => {
    const res = await api.get(`/permission/${roleId}`)
    return res.data.data
}
