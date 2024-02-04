import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Alert from "../components/icons/Alert";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const { setIsLoggedIn } = useAuth();
  const [errors, setErrors] = useState<string[]>([]);

  const handleRegisterSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const res = await fetch("http://localhost:5000/auth/register", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    if (data.isLoggedIn) {
      setIsLoggedIn(true);
      navigate("/");
    }
    if (data.errors) {
      setErrors(data.errors);
    }
  };

  return (
    <Layout>
      <section className="bg-light">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
          <Link
            to="/"
            className="flex items-center mb-6 text-2xl font-semibold text-dark"
          >
            <img className="w-8 h-8 mr-2" src="france.png" alt="France" />
            FranceData
          </Link>
          {errors.map((error) => (
          <div key={error} className="text-red-500 flex">
            <Alert /> {error}
          </div>
        ))}
          <div className="w-full bg-light shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 rounded-lg md:space-y-6 sm:p-8 bg-primary">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-dark md:text-2xl ">
                S'inscrire
              </h1>
              <form
                onSubmit={handleRegisterSubmit}
                className="space-y-4 md:space-y-6"
                action="#"
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-dark "
                  >
                    Votre email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                    className="focus:outline-none bg-light border border-dark text-dark sm:text-sm rounded-lg block w-full p-2.5"
                    placeholder="prenom.nom@exemple.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-dark "
                  >
                    Votre mot de passe
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                    className="focus:outline-none bg-light border border-dark text-dark sm:text-sm rounded-lg block w-full p-2.5"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block text-sm font-medium text-dark "
                  >
                    Confirmez votre mot de passe
                  </label>
                  <input
                    type="password"
                    name="confirm-password"
                    id="confirm-password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(event) => {
                      setConfirmPassword(event.target.value);
                    }}
                    className="focus:outline-none bg-light border border-dark text-dark sm:text-sm rounded-lg block w-full p-2.5"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-dark focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-light hover:text-primary"
                >
                  Valider
                </button>
                <p className="text-sm font-light text-dark">
                  Vous avez déjà un compte ?{" "}
                  <Link to="/login" className="font-medium hover:underline">
                    Se connecter
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
