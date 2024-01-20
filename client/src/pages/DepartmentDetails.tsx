import { useEffect, useState } from "react";
import { Department, Town } from "../../../types/src";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import ArrowUpAndDown from "../components/icons/ArrowupAndDown";

export default function DepartmentDetails() {
  const departmentId = useParams<{ id: string }>().id;

  const [department, setDepartment] = useState<Department | undefined>();
  const [towns, setTowns] = useState<Town[] | undefined>();
  const [cityNameOrder, setCityNameOrder] = useState<string>("asc");
  const [postalCodeOrder, setPostalCodeOrder] = useState<string>("asc");
  const [populationOrder, setPopulationOrder] = useState<string>("asc");
  const [superficyOrder, setSuperficyOrder] = useState<string>("asc");

  const fetchDepartment = async (url: string, signal: AbortSignal) => {
    const response = await fetch(url, {
      signal,
    });
    if (response.ok) {
      const data = await response.json();
      setDepartment(data[0][0]);
    } else {
      console.error(`Request error: ${response.status}`);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchDepartmentData = async () => {
      await fetchDepartment(
        `http://localhost:5000/departement/${departmentId}`,
        signal
      );
    };
    fetchDepartmentData();
    return () => {
      controller.abort();
    };
  }, [departmentId]);

  const fetchTowns = async (url: string, signal: AbortSignal) => {
    const response = await fetch(url, {
      signal,
    });
    if (response.ok) {
      const data = await response.json();
      setTowns(data[0]);
    } else {
      console.error(`Request error: ${response.status}`);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchTownsData = async () => {
      await fetchTowns(
        `http://localhost:5000/departement/${departmentId}/towns`,
        signal
      );
    };
    fetchTownsData();
    return () => {
      controller.abort();
    };
  }, [departmentId]);

  const handleCityNameOrderChange = () => {
    cityNameOrder === "asc"
      ? setTowns(towns.slice().reverse())
      : setTowns(towns.slice().reverse());
    setCityNameOrder(cityNameOrder === "asc" ? "desc" : "asc");
  };

  const handlePostalCodeOrderChange = () => {
    postalCodeOrder === "asc"
      ? setTowns(
          towns.sort(
            (a, b) =>
              parseInt(a.ville_code_postal) - parseInt(b.ville_code_postal)
          )
        )
      : setTowns(
          towns.sort(
            (a, b) =>
              parseInt(b.ville_code_postal) - parseInt(a.ville_code_postal)
          )
        );
    setPostalCodeOrder(postalCodeOrder === "asc" ? "desc" : "asc");
  };

  const handlePopulationOrderChange = () => {
    populationOrder === "asc"
      ? setTowns(
          towns.sort(
            (a, b) => a.ville_population_2012 - b.ville_population_2012
          )
        )
      : setTowns(
          towns.sort(
            (a, b) => b.ville_population_2012 - a.ville_population_2012
          )
        );
    setPopulationOrder(populationOrder === "asc" ? "desc" : "asc");
  };

  const handleSuperficyOrderChange = () => {
    superficyOrder === "asc"
      ? setTowns(towns.sort((a, b) => a.ville_surface - b.ville_surface))
      : setTowns(towns.sort((a, b) => b.ville_surface - a.ville_surface));
    setSuperficyOrder(superficyOrder === "asc" ? "desc" : "asc");
  };

  return (
    <Layout>
      <h1 className="text-dark text-center text-3xl font-bold mt-8 mb-4">
        {department?.departement_nom}
      </h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="mx-auto text-sm text-center text-dark">
          <thead className="text-xs text-gray-700 uppercase">
            <tr>
              <th scope="col" className="px-6 py-3 bg-gray-50">
                Commune
                <button onClick={handleCityNameOrderChange} className="ml-4">
                  <ArrowUpAndDown />
                </button>
              </th>
              <th scope="col" className="px-6 py-3">
                Code Postal
                <button onClick={handlePostalCodeOrderChange} className="ml-4">
                  <ArrowUpAndDown />
                </button>
              </th>
              <th scope="col" className="px-6 py-3 bg-gray-50">
                Population
                <button onClick={handlePopulationOrderChange} className="ml-4">
                  <ArrowUpAndDown />
                </button>
              </th>
              <th scope="col" className="px-6 py-3">
                Superficie
                <button onClick={handleSuperficyOrderChange} className="ml-4">
                  <ArrowUpAndDown />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {towns?.map((town, index) => (
              <tr key={index} className="border-b border-gray-200 ">
                <th
                  scope="row"
                  className="text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 "
                >
                  {town.ville_nom_reel}
                </th>
                <td className="text-center px-6 py-4">
                  {town.ville_code_postal}
                </td>
                <td className="text-center px-6 py-4 bg-gray-50">
                  {town.ville_population_2012}
                </td>
                <td className="text-center px-6 py-4">{town.ville_surface}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
