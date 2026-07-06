import {
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import ScrollToTop from "../components/ScrollToTop";
import RotaProtegida from "../components/RotaProtegida/RotaProtegida";

import Home from "../pages/Home/Home";
import Produtos from "../pages/Produtos/Produtos";
import Sobre from "../pages/Sobre/Sobre";
import Contato from "../pages/Contato/Contato";
import Login from "../pages/Login/Login";

import Admin from "../pages/Admin/Dashboard";
import ProdutosAdmin from "../pages/Admin/ProdutosAdmin";
import CategoriasAdmin from "../pages/Admin/CategoriasAdmin";
import ConfiguracoesAdmin from "../pages/Admin/ConfiguracoesAdmin";

function AppRoutes() {

    return (

        <>

            <ScrollToTop />

            <Routes>

                {/* ROTAS PÚBLICAS */}

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/produtos"
                    element={<Produtos />}
                />

                <Route
                    path="/sobre"
                    element={<Sobre />}
                />

                <Route
                    path="/contato"
                    element={<Contato />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                {/* ROTAS ADMINISTRATIVAS PROTEGIDAS */}

                <Route element={<RotaProtegida />}>

                    <Route
                        path="/admin"
                        element={<Admin />}
                    />

                    <Route
                        path="/admin/produtos"
                        element={<ProdutosAdmin />}
                    />

                    <Route
                        path="/admin/categorias"
                        element={<CategoriasAdmin />}
                    />

                    <Route
                        path="/admin/configuracoes"
                        element={<ConfiguracoesAdmin />}
                    />

                </Route>

                {/* ROTA QUE NÃO EXISTE */}

                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/"
                            replace
                        />
                    }
                />

            </Routes>

        </>

    );

}

export default AppRoutes;