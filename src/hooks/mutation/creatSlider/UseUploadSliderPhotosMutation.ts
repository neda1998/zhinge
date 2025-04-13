import { useMutation } from "react-query";
import Swal from "sweetalert2";
import { uploadSliderPhotos } from "../../../services/admin/creatSlider/uploadSliderPhotos";

const UseUploadSliderPhotosMutation = () => {
  return useMutation(
    async (formData: FormData) => {
      return await uploadSliderPhotos(formData);
    },
    {
      onSuccess: async (response) => {
        Swal.fire({
          title: "!موفق",
          text: response?.data?.message || "عملیات با موفقیت انجام شد",
          icon: "success",
          confirmButtonText: "باشه"
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

export default UseUploadSliderPhotosMutation;
