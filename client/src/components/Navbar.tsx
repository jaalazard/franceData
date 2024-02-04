import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import BurgerMenu from "./icons/BurgerMenu";
import Close from "./icons/Close";
export default function Navbar() {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState<boolean>(false);
  const [isTitleHovered, setIsTitleHovered] = useState<boolean>(false);
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

  const handleTitleHover = () => {
    setIsTitleHovered(isTitleHovered ? false : true);
  };

  return (
    <nav className="bg-primary border-dark">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-6">
        <Link to="/">
          <img
            src="/france.png"
            className={!isBurgerMenuOpen ? "h-8" : "hidden"}
            alt="France Logo"
          />
        </Link>
        <Link to="/">
          <div
            className={
              !isBurgerMenuOpen
                ? "self-center text-2xl font-semibold whitespace-nowrap"
                : "hidden"
            }
            onMouseEnter={handleTitleHover}
            onMouseLeave={handleTitleHover}
          >
            <span className={isTitleHovered ? "text-blue-700" : "text-dark"}>
              Fra
            </span>
            <span className={isTitleHovered ? "text-white" : "text-dark"}>
              nce
            </span>
            <span className={isTitleHovered ? "text-red-700" : "text-dark"}>
              Data
            </span>
          </div>
        </Link>
        <button
          type="button"
          className="border border-dark inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-dark rounded-lg md:hidden focus:outline-none"
          aria-controls="navbar-default"
          aria-expanded="false"
          onClick={handleNavBarToggle}
        >
          {isBurgerMenuOpen ? <Close /> : <BurgerMenu />}
        </button>
        <div
          className={`md:flex ${isBurgerMenuOpen ? "block" : "hidden"}`}
          id="navbar-default"
        >
          <ul className="font-bold flex flex-row md:flex-row md:space-x-8 rtl:space-x-reverse">
            {!isLoggedIn ? (
              <li>
                <Link
                  to="/register"
                  className="block py-2 px-3 text-dark hover:text-light"
                >
                  Inscription
                </Link>
              </li>
            ) : (
              <li>
                <Link
                  to="/profile"
                  className="block py-2 px-3 text-dark hover:text-light"
                >
                  Mon compte
                </Link>
              </li>
            )}
            <li>
              {isLoggedIn ? (
                <button
                  className="block py-2 px-3 text-dark hover:text-light"
                  onClick={handleLogout}
                >
                  Déconnexion
                </button>
              ) : (
                <Link
                  to="/login"
                  className="block py-2 px-3 text-dark hover:text-light"
                >
                  Connexion
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
