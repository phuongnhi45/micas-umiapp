import React from 'react';
import UserStaff from './home';
import { SignIn } from '../auth/login';
import { SignUp } from '../auth/register';

export default () => {
  return (
    <div>
      {/* <UserStaff/> */}
      {/* <SignUp/> */}
      <SignIn />
    </div>
  );
};
