import React from 'react';
import AuthForm from '../../components/Auth/AuthForm/AuthForm';

const RegisterPage = () => {
  const handleRegister = (formData) => {
    // Add logic for registration
    console.log('Register Data:', formData);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <AuthForm
        formType="register"
        onSubmit={handleRegister}
        title="Create an Account"
        buttonText="Register"
      />
    </div>
  );
};

export default RegisterPage;
