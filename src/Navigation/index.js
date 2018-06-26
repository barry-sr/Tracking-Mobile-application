import React, { Component } from "react";
import { connect } from "react-redux";
import { addNavigationHelpers } from "react-navigation";
import {
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import NavigationStack from "./navigationStack";


// Note: createReactNavigationReduxMiddleware must be run before createReduxBoundAddListener
const middleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.navigationState,
);
const addListener = createReduxBoundAddListener("root");


class AppNavigation extends Component {
  render() {
    const { navigationState, dispatch } = this.props;
    return (
      <NavigationStack
        navigation={addNavigationHelpers({ dispatch, state: navigationState, addListener })}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    navigationState: state.Nav
  };
};

export default connect(mapStateToProps)(AppNavigation);