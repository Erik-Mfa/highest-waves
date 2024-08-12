import { Navigate, Outlet } from "react-router-dom"

export default function ProtectedRoute({ isAllowed, isAuthenticated, redirectTo, children }) {

if (!isAuthenticated) {
    console.log("user not validated");
    return <Navigate to={redirectTo} />
    }

//CHEKCS PARAMTER ROUTER
 if (!isAllowed) {
    console.log("user not admin");
    return <Navigate to={redirectTo} />
 } 
 return children ? children : <Outlet />
}