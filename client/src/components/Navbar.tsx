import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function Navbar() {
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

  return (
    <nav className="bg-primary border-dark">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-6">
        <Link to="/">
          <img src="france.png" className="h-8" alt="France Logo" />
        </Link>
        <Link to="/">
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            FranceData
          </span>
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-dark rounded-lg md:hidden hover:bg-dark focus:outline-none focus:ring-2 focus:ring-dark"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-dark md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
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
