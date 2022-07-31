import { api } from "helpers/consts";

/**
 * @returns Notification list
 */
export const updateNotificationsStatus = async (notifications) => {
    const res = await api.post(`/notification/updateStatus`, notifications);
    return res
}

/**
 * @returns Notification list
 */
export const getNotificationList = async (userId, limit, offset) => {
    
    console.log(userId)
    if(userId!=undefined)
   {const res = await api.get(`/notification/${userId}/${limit}/${offset}`);
    return res.data.data
}
return {notifications:[]}
}

/**
 * @returns NotificationConfig list
 */
export const getNotificationConfigList = async () => {
    const res = await api.get(`/notificationConfig`);
    return res.data.data
}

/**
 * @param {NotificationConfig} notificationConfig
 */
export const upsertNotificationConfig = async (notificationConfig, selectedStores, selectedUsers, selectedProducts) => {
    let stores = []
    let users = []
    let products = []
    selectedStores.forEach(element => {
        stores.push(element.value)
    });
    selectedUsers.forEach(element => {
        users.push(element.value)
    });
    selectedProducts.forEach(element => {
        products.push(element.value)
    });
    const res = await api.post(`/notificationConfig`, { ...notificationConfig, selectedStores: stores, selectedUsers: users, selectedProducts: products });
    return res
}