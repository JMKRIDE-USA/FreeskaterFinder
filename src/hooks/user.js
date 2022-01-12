import { useGetUserId, useCreateMutation, useGetSelf } from '@jeffdude/frontend-helpers';

export const useGetUserSocials = () => {
  const userInfo = useGetSelf();
  return userInfo.socialLinks;
}

export const usePatchUser = () => {
  const userId = useGetUserId();
  return useCreateMutation({
    endpoint: "users/id/" + userId,
    method: "PATCH",
  });
}