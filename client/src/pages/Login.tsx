export default function Login() {
  return <>
  <h1>Formulaire de connexion</h1>
  <form>
    <input type="text" placeholder="Username" />
    <label htmlFor="username">Username</label>

    <input type="password" placeholder="Password" />
    <label htmlFor="password">Password</label>

    <button type="submit">Valider</button>
  </form>
  </>
}
