import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import { Department } from "../../../types/src";

const regions = {
  ARA: "Auvergne-Rhône-Alpes",
  BFC: "Bourgogne-Franche-Comté",
  BRE: "Bretagne",
  CVL: "Centre-Val-de-Loire",
  COR: "Corse",
  GES: "Grand-Est",
  GUA: "Guadeloupe",
  GUY: "Guyane",
  HDF: "Hauts-de-France",
  IDF: "Île-de-France",
  MAR: "Martinique",
  MAY: "Mayotte",
  NOR: "Normandie",
  NAQ: "Nouvelle-Aquitaine",
  OCC: "Occitanie",
  PDL: "Pays-De-La-Loire",
  PAC: "Provence-Alpes-Côte d'Azur",
  REU: "Réunion",
};

export default function RegionDetails() {
  const regionId = useParams<{ id: string }>().id;
  const [departments, setDepartments] = useState([]);

  const fetchDepartments = async (url: string, signal: AbortSignal) => {
    const response = await fetch(url, {
      signal,
    });
    if (response.ok) {
      const data = await response.json();
      setDepartments(data);
    } else {
      console.error(`Request error: ${response.status}`);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetchDepartments(
      `http://localhost:5000/region/${regionId}`,
      signal,
    ).catch((error) => {
      console.error(error);
    });

    return () => {
      controller.abort();
    };
  }, [regionId]);
  return (
    <Layout>
      <div>
        <h1 className="text-dark text-center text-3xl bold mt-3">
          Région {regions[regionId as keyof typeof regions]}
        </h1>
        <ul>
          {departments.map((department: Department) => (
            <li key={department.departement_code}>
              <a
                href={`/department/${department.departement_code}`}
                className="text-blue-500 hover:text-blue-800"
              >
                {department.departement_nom}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}
