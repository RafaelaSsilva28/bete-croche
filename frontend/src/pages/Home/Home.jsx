import Navbar from "../../components/NavBar/Navbar";
import Hero from "../../components/Hero/Hero";
import Destaques from "../../components/Destaques/Destaques";
import Footer from "../../components/Footer/Footer";
import SobreHome from "../../components/SobreHome/SobreHome";
import Diferenciais from "../../components/Diferenciais/Diferenciais";
import Depoimentos from "../../components/Depoimentos/Depoimentos";
import ChamadaWhatsapp from "../../components/ChamadaWhatsapp/ChamadaWhatsapp";
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