import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthService } from "../api";

const useAuth = () => {
  const [user, setUser] = useState<string | null>(
    localStorage.getItem("at-token")
  );
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const onAuthChange = async (auth: string | null) => {
    if (!auth) {
      setUser(null);
      setIsLoading(false);
      return true;
    }

    setIsLoading(false);
    setUser(auth);
    localStorage.setItem("at-token", auth);
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await AuthService.login(email, password);
      if (res.data.access_token) {
        localStorage.setItem("at-token", res.data.access_token);
        setUser(res.data.access_token);
        setIsLoading(false);
        navigate("/dashboard");
        queryClient.invalidateQueries();
      } else {
        toast.error("Invalid Credentials", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setIsLoading(false);
      }
    } catch (error) {
      toast.error("Invalid Credentials", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      const res = await AuthService.logout();
      if (res.data) {
        localStorage.removeItem("at-token");
        setUser(null);
        setIsLoading(false);
        navigate("/");
        queryClient.invalidateQueries();
      } else {
        toast.error("Invalid Credentials", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setIsLoading(false);
      }
    } catch (error) {
      toast.error("Invalid Credentials", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const auth = localStorage.getItem("at-token");
    onAuthChange(auth);
  }, []);

  return { login, isLoading, user, logout };
};

export default useAuth;
