import { api } from "helpers/consts";

/**
 * 
 * @param {String} username 
 * @returns user by username
 */
 export const getUserByUsername = async (username) => {
    const res = await api.get(`/user/${username}`);
    return res.data;
}

/**
 * 
 * @param {String} role 
 * @returns user by role name
 */
 export const getUsersByRole = async (role) => {
    const res = await api.get(`/user/role/${role}`);
    return res.data.data;
}

/**
 * 
 * @returns users list
 */
export const getUsers = async () => {
    const res = await api.get(`/user`);
    return res.data.data;
}

/**
 * 
 * @param {User} user 
 * @description create update user 
 */
export const upsertUser = async (user, file) => {
    const formData = new FormData();
    formData.append('file', file)
    formData.append('user', JSON.stringify(user))
    const res = await api.post(`/user`, formData);
    return res.data;
}

/**
 * 
 * @param {User} user 
 * @description enable / disable user account
 */
export const switchStateUser = async (user) => {
    const res = await api.post(`/user/switchState`, user)
    return res
}

/**
 * 
 * @param {User} user 
 * @description reset password and send email with new password 
 */
export const resetPwd = async (user) => {
    const res = await api.post(`/user/resetpwd`, user)
    return res;
}


export const updatePwd = async (user) => {
    const res = await api.post(`/user/updatepwd`, user)
    return res
}