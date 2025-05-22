import { useMutation } from "react-query";
import Swal from "sweetalert2";
import { useCreateAnnounce } from "../../../services/userPanel/createAnnounce";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const useCreateAnnounceMutation = () => {
  const createAnnounceCall = useCreateAnnounce();
  const [cookies, setCookie] = useCookies(["Uid"]);
  const route = useNavigate()
  return useMutation(
    async (data: { accessToken: string; [key: string]: any }) => {
      return await createAnnounceCall(data);
    },
    {
      onSuccess: async function(response) {
        const uid = response?.newA?.Uid || response?.data?.newA?.Uid;
        if (uid) {
          setCookie("Uid", uid, { path: "/" });
          setTimeout(() => {
            route("/propertyImage", { replace: true });
          }, 0);
        }
        Swal.fire({
          title: "موفق",
          text: response?.newA?.message ||
                response?.data?.message ||
                "آگهی با موفقیت ثبت شد",
          icon: "success",
          confirmButtonText: "باشه",
        });
      },
      onError: async (error: any) => {
        Swal.fire({
          title: "!خطا",
          text: error.response?.data?.message ||
                "خطایی رخ داده است.",
          icon: "error",
          confirmButtonText: "باشه",
        });
      },
    }
  );
};

export default useCreateAnnounceMutation;
