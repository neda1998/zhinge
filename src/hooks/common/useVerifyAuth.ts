import { useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "../../services/utils/axios";

const useVerifyAuth = (): void => {
  const [cookies, _, removeCookies] = useCookies(["token", "role"]);

  useEffect(() => {
    if (cookies.token) {
      const verifyUser = async () => {
        axios.defaults.headers.common["Authorization"] = `Bearer ${cookies.token}`;
        try {
          // const data = await getUserInfo();
          // onSetUser(data);
        } catch (error: any) {
          if (error?.response?.status === 401) {
            delete axios.defaults.headers.common["Authorization"];
            removeCookies("token", { path: "/" });
            removeCookies("role", { path: "/" });
          }
        }
      };
      verifyUser();
    } else {
      // delete axios.defaults.headers.common["Authorization"];
      // removeCookies("token", { path: "/" });
      // removeUser();
    }
  }, [cookies.token, removeCookies]);
};

export default useVerifyAuth;
