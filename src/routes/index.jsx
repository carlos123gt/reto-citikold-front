import React from "react";
import { Route, Routes } from "react-router-dom"
import { PATHS } from "../utils/constants";
import ProtectedRoutes from "./ProtectedRoutes";
import Loader from "../components/root/Loader/Loader";
const Login = React.lazy(() => import("../pages/Login"));
const Home = React.lazy(() => import("../pages/Home"));
const Products = React.lazy(() => import("../pages/Products"));
const Clients = React.lazy(() => import("../pages/Clients"));
const Facturas = React.lazy(() => import("../pages/Facturas"));

const ApplicationRoutes = () => {
    return(
        <Routes>
            <Route
                path="/"
                element={
                    <React.Suspense
                        fallback={
                            <Loader/>
                        }
                    >
                        <Login/>
                    </React.Suspense>
                }
        />
        <Route path="/" element={<ProtectedRoutes/>} >

            <Route
            path={PATHS.HOME}
            element={
            <React.Suspense
                fallback={
                    <Loader/>
                    }
                >
                <Home/>       
            </React.Suspense>
            }
            />
 
         <Route
             path={PATHS.PRODUCTS}
             element={
             <React.Suspense
                 fallback={
                     <Loader/>
                     }
                 >
                 <Products/>       
             </React.Suspense>
             }
         />
 
            <Route
                path={PATHS.CLIENTS}
                element={
                <React.Suspense
                    fallback={
                        <Loader/>
                        }
                    >
                    <Clients/>       
                </React.Suspense>
                }
            />
            <Route
                path={PATHS.RECEIPTS}
                element={
                <React.Suspense
                    fallback={
                        <Loader/>
                        }
                    >
                    <Facturas/>       
                </React.Suspense>
                }
            />
         </Route>
        </Routes>
    )
}

export default ApplicationRoutes;