import { useGetQuery, useCreateMutation } from '@jeffdude/frontend-helpers';

const useFriendsQuery = (endpoint, options = {}) => useGetQuery(endpoint, "friends", options)

export const useCreateFriendRequest = () => 
  useCreateMutation({
    endpoint: "friends/request/create",
    method: "POST",
    verb: "creating friend request"
  })

export const useGetIncomingPendingFriends = () =>
  useFriendsQuery("friends/request/incoming")

export const useAcceptFriendRequest = (requestId) =>
  useCreateMutation({
    endpoint: "friends/request/accept/id/" + requestId,
    method: "POST",
    verb: "accepting friend request"
  })