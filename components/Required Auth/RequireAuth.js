import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const RequireAuth = (WrappedComponent) => {
  const AuthComponent = (props) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [authChecked, setAuthChecked] = useState(false);
    const router = useRouter();
    
    useEffect(() => {
      const storedToken = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
      const checkAuthentication = async () => {
        if (!storedToken && router.pathname !== "/login" && router.pathname !== "/signup") {
          router.push("/login");
        } else {
          try {
            if (storedToken) {
              setAuthenticated(true);
            } else {
              throw new Error("Unauthorized: Token not found");
            }
          } catch (error) {
            localStorage.removeItem("token");
            setAuthenticated(false);
            router.push("/login");
          } finally {
            setAuthChecked(true);
          }
        }
      };
      checkAuthentication();
    }, []);

    return authChecked ? (
      authenticated ? (
        <WrappedComponent {...props} />
      ) : null
    ) : null;
  };

  return AuthComponent;
};

export default RequireAuth;
