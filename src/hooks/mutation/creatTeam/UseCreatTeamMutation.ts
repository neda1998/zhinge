import { useMutation } from "react-query";
import Swal from "sweetalert2";
import { creatTeam } from "../../../services/admin/creatTeam";

const UseCreatTeamMutation = () => {
  return useMutation(
    async (data) => {
      return await creatTeam(data);
    },
    {
      onSuccess: async (response) => {
        Swal.fire({
          title: "موفق",
          text: response?.data?.message || "با موفقیت ایجاد شد",
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

export default UseCreatTeamMutation;
