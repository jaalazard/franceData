import Layout from "./components/Layout";
import FranceMap from "./components/FranceMap";

export default function Home() {
  return (
    <>
      <Layout>
        <h1 className="text-center text-3xl my-8">Sélectionnez une région</h1>
        <FranceMap />
      </Layout>
    </>
  );
}
