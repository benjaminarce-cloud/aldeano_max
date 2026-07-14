import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Historia from "@/components/Historia";
import TornDivider from "@/components/TornDivider";
import Menu from "@/components/Menu";
import Galeria from "@/components/Galeria";
import Info from "@/components/Info";
import Reservaciones from "@/components/Reservaciones";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <div className="grain" aria-hidden="true" />
      <Header />
      <main>
        <Hero />
        <Historia />
        <TornDivider />
        <Menu />
        <Galeria />
        <Info />
        <Reservaciones />
      </main>
      <Footer />
    </>
  );
}
