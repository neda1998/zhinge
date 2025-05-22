import { useMutation } from "react-query";
import Swal from "sweetalert2";
import { creatAnnouncement, CreatAnnouncementBody } from "../../../services/admin/creatAnnouncement";
import { useCookies } from "react-cookie"; 

const UseCreatAnnouncementAdminMutation = () => {
  const [cookies, setCookies] = useCookies(["accessToken", "Uid"]); 
  
  return useMutation(
    async (data: CreatAnnouncementBody) => {
      return await creatAnnouncement(data, cookies.accessToken); 
    },
    {
      onSuccess: async (response) => {
        const uid = response?.Uid || response?.data?.Uid;
        if (uid) {
          setCookies("Uid", uid, { path: "/" });
        }
        Swal.fire({
          title: "موفق",
          text: response?.data?.message || response?.message,
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

// No changes needed if mutation receives the correct data

export default UseCreatAnnouncementAdminMutation;
