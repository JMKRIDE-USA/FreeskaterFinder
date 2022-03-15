import { useCreateMutation } from '@jeffdude/frontend-helpers';


export const useCreatePasswordResetToken = (options) => useCreateMutation({
  endpoint: 'auth/token/password_reset',
  method: 'POST',
  verb: 'creating password reset token',
  ...options
})

export const usePasswordResetWithToken = (token) => useCreateMutation({
  endpoint: 'auth/reset_password/token/' + token,
  method: 'POST',
  verb: 'resetting password with a token',
})