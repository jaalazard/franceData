import { useParams } from "react-router-dom";

const regions = {
    ARA: 'Auvergne-Rhône-Alpes',
    BFC: 'Bourgogne-Franche-Comté',
    BRE: 'Bretagne',
    CVL: 'Centre-Val-de-Loire',
    COR: 'Corse',
    GES: 'Grand-Est',
    GUA: 'Guadeloupe',
    GUY: 'Guyane',
    HDF: 'Hauts-de-France',
    IDF: 'Île-de-France',
    MAR: 'Martinique',
    MAY: 'Mayotte',
    NOR: 'Normandie',
    NAQ: 'Nouvelle-Aquitaine',
    OCC: 'Occitanie',
    PDL: 'Pays-De-La-Loire',
    PAC: 'Provence-Alpes-Côte d\'Azur',
    REU: 'Réunion',
};

const numberOfDepartments = async (region: string) => {
    const response = await fetch(`http://localhost:5000/regions/${id}/departements`);
    const data = await response.json();
    return data.length;
}

export default function RegionDetails() {
    const id = useParams<{ id: string }>().id;
    return (
        <div>
        <h1 className="text-dark text-center text-3xl bold mt-3">Région {regions[id as keyof typeof regions]}</h1>
        </div>
    );  
}