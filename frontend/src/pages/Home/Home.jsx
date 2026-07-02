import Navbar from "../../components/NavBar/Navbar";
import Hero from "../../components/Hero/Hero";
import Destaques from "../../components/Destaques/Destaques";
import Footer from "../../components/Footer/Footer";

function Home() {
    return (
        <>
            <Navbar />
            <Hero />
            <Destaques />
            <Footer />
        </>
    );
}

export default Home;