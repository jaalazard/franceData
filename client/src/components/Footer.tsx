import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-dark text-light rounded-lg shadow m-4">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm sm:text-center">
          © 2024{" "}
          <Link to="/" className="hover:underline">
            FranceData
          </Link>
          . Tous droits réservés.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium sm:mt-0">
          <li>
            <Link to="#" className="hover:underline me-4 md:me-6">
              À propos
            </Link>
          </li>
          <li>
            <Link to="#" className="hover:underline">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
