import { useGetUserInfo } from '@jeffdude/frontend-helpers';

import { defaultUserSettings } from '../constants';

export const useGetUserSettings = () => {
  const { settings } = useGetUserInfo();
  return {...defaultUserSettings, ...settings}
}