import { Navigate, Outlet } from "react-router-dom";

function RotaProtegida() {

    const token = localStorage.getItem("token");
    const usuario = localStorage.getItem("usuario");

    if (!token || !usuario) {

        return (
            <Navigate
                to="/login"
                replace
            />
        );

    }

    return <Outlet />;

}

export default RotaProtegida;