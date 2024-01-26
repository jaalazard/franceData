export interface AuthProviderState {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

export interface User {
  id: string;
  email: string;
  password: string;
}

export interface Region {
  region_id: number;
  region_code: string;
  region_nom: string;
}
export interface Department {
  departement_id: number;
  departement_code: string;
  departement_nom: string;
  departement_region: string;
}

export interface Town {
  ville_id: number;
  ville_departement?: string | null;
  ville_slug?: string | null;
  ville_nom?: string | null;
  ville_nom_simple?: string | null;
  ville_nom_reel?: string | null;
  ville_nom_soundex?: string | null;
  ville_nom_metaphone?: string | null;
  ville_code_postal?: string | null;
  ville_commune?: string | null;
  ville_code_commune: string;
  ville_arrondissement?: number | null;
  ville_canton?: string | null;
  ville_amdi?: number | null;
  ville_population_2010?: number | null;
  ville_population_1999?: number | null;
  ville_population_2012?: number | null;
  ville_densite_2010?: number | null;
  ville_surface?: number | null;
  ville_longitude_deg?: number | null;
  ville_latitude_deg?: number | null;
  ville_longitude_grd?: string | null;
  ville_latitude_grd?: string | null;
  ville_longitude_dms?: string | null;
  ville_latitude_dms?: string | null;
  ville_zmin?: number | null;
  ville_zmax?: number | null;
}
