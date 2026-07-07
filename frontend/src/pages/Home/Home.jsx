import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import Destaques from "../../components/Destaques/Destaques";
import Footer from "../../components/Footer/Footer";
import Diferenciais from "../../components/Diferenciais/Diferenciais";
import Depoimentos from "../../components/Depoimentos/Depoimentos";
import ChamadaWhatsapp from "../../components/ChamadaWhatsapp/ChamadaWhatsapp";
import SobreHome from "../../components/sobre-home/SobreHome.jsx";
function Home() {
    return (
        <>
            <Navbar />
            <Hero />
            <SobreHome />
            <Diferenciais />
            <Destaques />
            <Depoimentos />
                <ChamadaWhatsapp />

            <Footer />
        </>
    );
}

export default Home;