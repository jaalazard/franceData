import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { AuthProviderState } from "../../types/src";

const AuthProviderContext = createContext<AuthProviderState | undefined>(
  undefined
);

export function AuthProvider({
  children,
  ...props
}: {
  children: React.ReactNode;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    (async () => {
      const res = await fetch("http://localhost:5000/auth/check", {
        credentials: "include",
        headers: {
          "Cache-Control": "no-cache",
        },
        signal: abortController.signal,
      });
      const data = await res.json();
      setIsLoggedIn(data.isLoggedIn);
    })();
  }, []);

  const value = useMemo(
    () => ({
      isLoggedIn,
      setIsLoggedIn,
    }),
    [isLoggedIn, setIsLoggedIn]
  );

  return (
    <AuthProviderContext.Provider value={value} {...props}>
      {children}
    </AuthProviderContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthProviderContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
