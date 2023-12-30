export interface Town {
    ville_id: number;
    ville_nom: string;
  }
export interface AuthProviderState  {
    isLoggedIn: boolean;
    setIsLoggedIn: (value: boolean) => void;
  };