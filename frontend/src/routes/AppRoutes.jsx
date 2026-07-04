import { Routes, Route } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";

import Home from "../pages/Home/Home";
import Produtos from "../pages/Produtos/Produtos";
import Sobre from "../pages/Sobre/Sobre";
import Contato from "../pages/Contato/Contato";
import Login from "../pages/Login/Login";

function AppRoutes() {
    return (
        <>
            <ScrollToTop />

            <Routes>

                <Route path="/" element={<Home />} />
                <Route path="/produtos" element={<Produtos />} />
                <Route path="/sobre" element={<Sobre />} />
                <Route path="/contato" element={<Contato />} />
                <Route path="/login" element={<Login />} />

            </Routes>
        </>
    );
}

export default AppRoutes;