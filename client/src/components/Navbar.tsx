import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import BurgerMenu from "./icons/BurgerMenu";
import Close from "./icons/Close";
export default function Navbar() {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState<boolean>(false);
  const { isLoggedIn } = useAuth() as { isLoggedIn: boolean };
  const { setIsLoggedIn } = useAuth();

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        setIsLoggedIn(false);
        <Navigate to="/" />;
      } else {
        console.error("Échec de la déconnexion");
      }
    } catch (error) {
      console.error("Erreur lors de la déconnexion", error);
    }
  };

  const handleNavBarToggle = () => {
    const navbar = document.getElementById("navbar-default");
    if (navbar?.classList.contains("hidden")) {
      navbar?.classList.remove("hidden");
      setIsBurgerMenuOpen(true);
    } else {
      navbar?.classList.add("hidden");
      setIsBurgerMenuOpen(false);
    }
  };

  return (
    <nav className="bg-primary border-dark">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-6">
        <Link to="/">
          <img src="/france.png" className="h-8" alt="France Logo" />
        </Link>
        <Link to="/">
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            FranceData
          </span>
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-dark rounded-lg md:hidden focus:outline-none"
          aria-controls="navbar-default"
          aria-expanded="false"
          onClick={handleNavBarToggle}
        >
          {" "}
          {isBurgerMenuOpen ? <Close /> : <BurgerMenu />}
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col items-end p-4 md:p-0 md:flex-row md:space-x-8 rtl:space-x-reverse">
            <li>
              {isLoggedIn ? (
                <Link
                  to="/login"
                  className="block py-2 px-3 text-dark hover:text-light"
                  aria-current="page"
                  onClick={handleLogout}
                >
                  Déconnexion
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="block py-2 px-3 text-dark hover:text-light"
                  aria-current="page"
                >
                  Connexion
                </Link>
              )}
            </li>
            {!isLoggedIn && (
              <li>
                <Link
                  to="/register"
                  className="block py-2 px-3 text-dark hover:text-light"
                  aria-current="page"
                >
                  Inscription
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
