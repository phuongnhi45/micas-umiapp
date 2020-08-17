import React from 'react';
import styles from './index.less';
import UserStaff from './private/UserStaff';
import { Provider } from ‘react-redux’;
import store from ‘./redux/store’;

export default () => {
  return (
    // <div>
    //   <UserStaff/>
    // </div>
    <div>
      <Provider store={store}>
        <Router>
          <Switch>
            <PrivateRoute
            exact
            path='/'
            component={Index} />
            <GuestRoute
            exact
            path="/login"
            component={Login} />
          </Switch>
        </Router> 
      </Provider>
    </div>
      )
    }
  );
}
