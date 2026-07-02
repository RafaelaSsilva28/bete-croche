import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Produtos from "../pages/Produtos/Produtos";
import ProdutoDetalhe from "../pages/Produtos/ProdutoDetalhe";
import Sobre from "../pages/Sobre/Sobre";
import Contato from "../pages/Contato/Contato";
import Login from "../pages/Login/Login";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Home />} />

                <Route path="/produtos" element={<Produtos />} />
                <Route path="/produtos/:id" element={<ProdutoDetalhe />}
/>

                <Route path="/sobre" element={<Sobre />} />

                <Route path="/contato" element={<Contato />} />

                <Route path="/login" element={<Login />} />

            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;