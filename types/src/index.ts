export interface AuthProviderState {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
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
