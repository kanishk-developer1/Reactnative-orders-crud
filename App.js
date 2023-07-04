
import { React } from 'react';
import NavigationRouter from './navigation/NavigationRouter';
import AuthProvider from './context/auth-context';

export default function App() {
  return (
    <AuthProvider>
      <NavigationRouter />
    </AuthProvider>
  );
}
