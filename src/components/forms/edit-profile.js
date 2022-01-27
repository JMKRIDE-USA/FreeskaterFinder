import { useGetUserInfo, usePatchUser } from '@jeffdude/frontend-helpers';

import useMakeFormCard from '../../hooks/form-card'
import { makeTextField } from './fields'
import PageCard from '../page-card';


function EditProfileCard({onSuccess}){
  const userInfo = useGetUserInfo();
  const patchUser = usePatchUser();
  const renderForm = useMakeFormCard({
    actionFn: patchUser,
    onSuccess,
    stateList: [
      ["firstName" , "First Name"],
      ["lastName", "Last Name"],
      ["bio", "User Blurb"],
    ].map(([key, label]) => ({
      key, label, initialState: userInfo[key],
      component: makeTextField({key, label}),
      formatFn: i => i,
    })),
  })

  return <PageCard small>
    {renderForm()}
  </PageCard>
}

export default EditProfileCard;