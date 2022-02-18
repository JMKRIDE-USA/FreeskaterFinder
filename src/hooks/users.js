import { useGetQuery } from '@jeffdude/frontend-helpers';

const useGetUserQuery = (endpoint, options) => useGetQuery(endpoint, 'users', options);

export const useGetUserById = (userId) => useGetUserQuery('users/id/' + userId, {version: 2});