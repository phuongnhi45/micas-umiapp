import React from 'react';
import SignIn from '../auth/login/';

export default (props: any) => {
  return (
    <div>
      {props.children}
      {/* <SignIn /> */}
    </div>
  );
};
