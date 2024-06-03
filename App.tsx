import React from 'react';
import {LogBox} from 'react-native';
import 'react-native-gesture-handler';
import AppNavigation from './src/navigation';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import AuthProvider from './src/context/AuthContext';

LogBox.ignoreAllLogs();
LogBox.ignoreLogs(['EventEmitter.removeListener']);
LogBox.ignoreLogs(['VirtualizedLists', 'Warning:...']);

export const navigationRef = React.createRef();

export function navigate(name: string, params: string) {
  navigationRef.current?.navigate(name, params);
}
GoogleSignin.configure({
  scopes: ['profile', 'email'],
  webClientId:
    '1048141216024-kit5emhoc1vdu1rgekqu5994km9og4qd.apps.googleusercontent.com',
  // offlineAccess: true,
  // // hostedDomain: '',
  // forceCodeForRefreshToken: true,
  // // accountName: '',
  // // iosClientId: '<FROM DEVELOPER CONSOLE>',
  // // googleServicePlistPath: '',
  // // openIdRealm: '',
  // profileImageSize: 120,
});

const App = () => {
  return (
    <AuthProvider>
      <AppWrapper />
    </AuthProvider>
  );
};

const AppWrapper = () => {
  return <AppNavigation />;
};

export default App;
