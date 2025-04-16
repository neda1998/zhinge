import { useMutation } from "react-query";
import Swal from "sweetalert2";
import { updateTeam } from "../../../services/admin/updateTeam";

const UseUpdateTeamMutation = () => {
  return useMutation(
    async (data: any) => {
      return await updateTeam(data);
    },
    {
      onSuccess: async (response) => {
        Swal.fire({
          title: "موفق",
          text: response?.data?.message || "اسلایدر با موفقیت به روز رسانی شد",
          icon: "success",
          confirmButtonText: "باشه",
        });
      },
      onError: async (error: any) => {
        Swal.fire({
          title: "خطا",
          text: error.response?.data?.message || "خطایی رخ داده است",
          icon: "error",
          confirmButtonText: "باشه",
        });
      },
    }
  );
};

export default UseUpdateTeamMutation;
