import { useCreateMutation, useGetQuery } from '@jeffdude/frontend-helpers';
import { invalidateJFHCache } from '@jeffdude/frontend-helpers';

const useNotificationQuery = (endpoint, options) => 
  useGetQuery(endpoint, 'notifications', options)

export const useGetUserNotifications = () => {
  return useNotificationQuery("notifications")
}

export const useReadNotification = (notificationId) => 
  useCreateMutation({
    endpoint: "notifications/read/id/" + notificationId,
    method: "POST",
    verb: "marking notification as read",
    createMutationCallOptions: {
      onSuccess: invalidateJFHCache,
    }
  })

export const useReadAllNotifications = () => 
  useCreateMutation({
    endpoint: "notifications/read/all",
    method: "POST",
    verb: "marking all notifications as read",
    createMutationCallOptions: {
      onSuccess: invalidateJFHCache,
    }
  })