import { useMutation } from "react-query";
import Swal from "sweetalert2";
import { creatAnnouncement, CreatAnnouncementBody } from "../../../services/admin/creatAnnouncement";

const UseCreatAnnouncementMutation = () => {
  return useMutation(
    async (data: CreatAnnouncementBody) => {
      return await creatAnnouncement(data);
    },
    {
      onSuccess: async (response) => {
        Swal.fire({
          title: "موفق",
          text: response?.data?.message,
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

export default UseCreatAnnouncementMutation;
