import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { isAdmin, isAuthenticated } from './api/auth';

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const [isAdminCheck, setIsAdminCheck] = useState(null);
  const [isAuthenticatedCheck, setIsAuthenticatedCheck] = useState(null);

  //Get User and Admin
  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const admin = await isAdmin();
        const authenticated = await isAuthenticated();
        
        console.log("Admin Check:", admin); // Debugging
        console.log("Authenticated Check:", authenticated); // Debugging

        setIsAdminCheck(admin);
        setIsAuthenticatedCheck(authenticated);
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    fetchInfo();
  }, []);

  useEffect(() => {
    console.log("Auth and Admin checks updated: ", { isAuthenticatedCheck, isAdminCheck });

    if (isAuthenticatedCheck === false) {
      console.log("User not authenticated, redirecting to login...");
      navigate("/");
    } else if (isAuthenticatedCheck && !isAdminCheck) {
      console.log("User authenticated but not admin, redirecting to home...");
      navigate("/");
    }
  }, [isAdminCheck, isAuthenticatedCheck, navigate]);

  if (isAuthenticatedCheck === null || isAdminCheck === null) {
    console.log("Still loading authentication checks...");
    return <div>Loading...</div>;
  }

  console.log("Rendering children component...");
  return children ? children : <Outlet />;
}