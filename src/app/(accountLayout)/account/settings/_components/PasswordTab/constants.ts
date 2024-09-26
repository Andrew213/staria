export const data = {
  title: 'Password',
  subtitle: 'Please enter your current password to change your password.',
  fields: [
    { label: 'Current password', type: 'currentPassword' },
    {
      label: 'New password',
      notification: 'The password should be a minimum length of 8 characters and include one special symbol.',
      type: 'password',
    },
    { label: 'Confirm new password', type: 'repeatPassword' },
  ],
  cancelButtonText: 'Cancel',
  okButtonText: 'Update password',
  textSuccess: 'Your password has been successfully changed.',
  textError: 'The current password you have entered is incorrect.',
};
