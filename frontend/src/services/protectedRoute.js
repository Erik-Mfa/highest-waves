import { React, useState, useEffect } from 'react';
import { Outlet } from "react-router-dom";
import { isAdmin, isAuthenticated } from './auth';
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const [isAdminCheck, setIsAdminCheck] = useState(null);
  const [isAuthenticatedCheck, setIsAuthenticatedCheck] = useState(null);
  
  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const admin = await isAdmin();
        const authenticated = await isAuthenticated();
  
        console.log("First admin: ", admin);
        console.log("First auth: ", authenticated);
  
        setIsAdminCheck(admin);
        setIsAuthenticatedCheck(authenticated);
      } catch (error) {
        console.error('Error :', error);
      }
    };
  
    fetchInfo();
  }, []);
  
  useEffect(() => {
    if (isAuthenticatedCheck === null || isAdminCheck === null) {
      // Skip the check if state values are not yet set
      return;
    }
  
    if (!isAuthenticatedCheck) {
      console.log("User not authenticated");
      navigate("/login");
      return;
    }
  
    if (!isAdminCheck) {
      console.log("User not admin");
      navigate("/");
    }
  }, [isAdminCheck, isAuthenticatedCheck, navigate]);

  if (isAuthenticatedCheck === null || isAdminCheck === null) {
    // You can return a loading spinner or some indication that the check is in progress
    return <div>Loading...</div>;
  }

  return children ? children : <Outlet />;
}