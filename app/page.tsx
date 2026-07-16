import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Historia from "@/components/Historia";
import Especiales from "@/components/Especiales";
import TornDivider from "@/components/TornDivider";
import Menu from "@/components/Menu";
import Galeria from "@/components/Galeria";
import Info from "@/components/Info";
import Reservaciones from "@/components/Reservaciones";
import Footer from "@/components/Footer";
import { OrderProvider } from "@/components/order/OrderContext";
import OrderBar from "@/components/order/OrderBar";

export default function Home() {
  return (
    <>
      <div className="grain" aria-hidden="true" />
      <Header />
      <main>
        <Hero />
        <Historia />
        {/* Both priced sections share one running total, so the provider spans
            them and the bar lives inside it. */}
        <OrderProvider>
          <Especiales />
          <TornDivider />
          <Menu />
          <OrderBar />
        </OrderProvider>
        <Galeria />
        <Info />
        <Reservaciones />
      </main>
      <Footer />
    </>
  );
}
