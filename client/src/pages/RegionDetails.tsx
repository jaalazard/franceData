import { Link, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import { Department, Region } from "../../../types/src";

export default function RegionDetails() {
  const regionId = useParams<{ id: string }>().id;
  const [region, setRegion] = useState<Region | undefined>();
  const [departments, setDepartments] = useState<Department[]>([]);

  const fetchRegion = async (url: string, signal: AbortSignal) => {
    const response = await fetch(url, {
      signal,
    });
    if (response.ok) {
      const data = await response.json();
      setRegion(data[0]);
    } else {
      console.error(`Request error: ${response.status}`);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchRegiondata = async () => {
      await fetchRegion(`http://localhost:5000/region/${regionId}`, signal);
    };
    fetchRegiondata();
    return () => {
      controller.abort();
    };
  }, []);

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
      `http://localhost:5000/region/${regionId}/departements`,
      signal
    ).catch((error) => {
      console.error(error);
    });

    return () => {
      controller.abort();
    };
  }, [regionId]);

  return (
    <Layout>
      <h1 className="text-dark text-center text-2xl font-bold mt-8 mb-4 text-nowrap">
        {region?.region_nom}
      </h1>
      <div className="flex items-center justify-center">
        <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 p-1">
          {departments.map((department: Department) => (
            <div key={department.departement_code} className="max-w-lg rounded-xl overflow-hidden shadow-xl hover:scale-105 transition duration-700">
              <Link to={`/departement/${department.departement_code}`}>
                <img
                  className="w-full"
                  src="https://medias.caravelis.com/proxy_caravelis/xml/oi/TFO225648159187/TFO225648159187-17a/medias/jpg/espalion_w2000.jpg"
                  alt={department.departement_nom}
                />
                <div className="font-bold text-xl p-2 text-center">
                  {department.departement_nom}
                </div>
              </Link>
            </div> 
          ))}
        </div>
      </div>
    </Layout>
  );
}
