import React, { PureComponent } from 'react';
import { Route,  withRouter } from 'react-router-dom';

import LayoutIndex from './views/Layout/Layout';


class CustomRoute extends PureComponent {


  render() {
      const { component: Component, layout, ...rest  } = this.props;
    console.log(rest)
    return (
      <Route
        {...rest}
        render={props => {
          return  (
            layout ?
            <LayoutIndex>
              <Component {...props} />
            </LayoutIndex>
            :
            <Component {...props} />
          ) 
        }}
      />
    );
  }
}

CustomRoute.defaultProps = {
  layout : true
}
export default withRouter(CustomRoute);

