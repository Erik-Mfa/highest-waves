import React from 'react';
import RegisterForm from '../../components/Auth/RegisterForm/RegisterForm';
import Header from '../../components/Header/Header';

const RegisterPage = () => {

  return (
    <div className="flex justify-center items-center h-screen">

      <Header />
      <RegisterForm />
      
    </div>
  );
};

export default RegisterPage;
