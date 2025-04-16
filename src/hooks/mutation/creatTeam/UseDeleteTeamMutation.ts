import { useMutation, useQueryClient } from "react-query";
import Swal from "sweetalert2";
import { deleteTeam } from "../../../services/admin/deleteTeam";

const UseDeleteTeamMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({id}: {id: number}) => {
      return await deleteTeam(id);
    }
      ,

    {
      onSettled: async () => {
        queryClient.invalidateQueries("getAllTeam");
      },
      onSuccess: async (response) => {
        Swal.fire({
          title: "موفق",
          text: response?.data?.message || "حذف با موفقیت انجام شد",
          icon: "success",
          confirmButtonText: "باشه",
        });
      },
      onError: async (error: any) => {
        Swal.fire({
          title: "!خطا",
          text: error.response?.data?.message || "خطایی رخ داده است",
          icon: "error",
          confirmButtonText: "باشه"
        });
      },
    }
  );
};

export default UseDeleteTeamMutation;
