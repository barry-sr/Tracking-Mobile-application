import React from 'react'
import { AppRegistry } from 'react-native';
import App from './App'
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

AppRegistry.registerComponent('MyProject', () => App); 


