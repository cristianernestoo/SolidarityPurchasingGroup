import API from '../API'

let notifID = undefined;

// Add a notification for a legitimate user
test('n-addNotification', () => {
    
    return API.postNotification(2, "prova").then((obj) =>{
        notifID = obj.id;
         expect(obj.id >= 0).toEqual(true)
        }
    )
})

// Add a notifications for a non existent user
test('n-addNotification', () => {
    
    return API.postNotification(200002, "prova").then((obj) =>{
         expect(obj).toEqual(false)
        }
    )
})

// Getting notifications
test('n-getNotifications', () => {

    return API.getNotifications(2).then((notifications) => 
        expect(notifications.length >= 1).toEqual(true))
})

// Getting notifications for a non existent user
test('n-getNotifications', () => {

    return API.getNotifications(2000002).then((notifications) => 
        expect(notifications.length).toEqual(0))
})

// Deleting a notification
test('n-deleteNotifications', () => {

    return API.deleteNotification(notifID).then((result) => 
        expect(result).toEqual(true))
})