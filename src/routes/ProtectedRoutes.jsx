/* eslint-disable react/prop-types */
import { Outlet, Navigate } from "react-router-dom"
import { PATHS } from "../utils/constants";

function ProtectedRoutes({children}) {
    const user = localStorage.getItem('user');
    if(!user){
        return <Navigate to={PATHS.LOGIN} replace />
    }
    return children ? children : <Outlet />;
}

export default ProtectedRoutes