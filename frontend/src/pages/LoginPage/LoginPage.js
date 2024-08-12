import React from 'react';
import AuthForm from '../../components/Auth/AuthForm/AuthForm';
import Header from '../../components/Header/Header';

const LoginPage = () => {
  return (
    <div className="flex h-screen">
      <Header />
      <AuthForm />
    </div>
  );
};

export default LoginPage;
