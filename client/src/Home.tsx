import "./main.css";
import Navbar from "./components/Navbar";
import FranceMap from "./components/FranceMap";

export default function Home() {

  return (
    <>
      <Navbar />
      <h1 className="text-center text-3xl my-8">Sélectionnez une région</h1>
      <FranceMap />
    </>
  );
}
