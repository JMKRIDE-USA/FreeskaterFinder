import { useCreateMutation } from '@jeffdude/frontend-helpers';

export const useCreateFriendRequest = () => 
  useCreateMutation({
    endpoint: "friends/request/create",
    method: "POST",
    verb: "creating friend request"
  })