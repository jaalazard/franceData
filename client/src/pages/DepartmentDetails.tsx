import { useEffect, useState } from "react";
import { Department } from "../../../types/src";
import { useParams } from "react-router-dom";

export default function DepartmentDetails() {
    const departmentId = useParams<{ id: string }>().id;
    
    const [department, setDepartment] = useState<Department | undefined>();

    const fetchDepartment = async (url: string, signal: AbortSignal) => {
        const response = await fetch(url, {
          signal,
        });
        if (response.ok) {
          const data = await response.json();
          console.log('coucou', data[0]);
          
          setDepartment(data);
        } else {
          console.error(`Request error: ${response.status}`);
        }
      };
    
      useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
    
        const fetchDepartmentdata = async () => {
          await fetchDepartment(`http://localhost:5000/departement/${departmentId}`, signal);
        };
        fetchDepartmentdata();
        return () => {
          controller.abort();
        };
      }, []);
  return (
    <div>
      <h1>{department?.departement_nom}</h1>
    </div>
  );
}
