import { useQuery } from "react-query";
import { uploadLogo } from "../../../../services/admin/uploadLogo";

const UseUploadLogoQuery = () => {
  return useQuery("uploadLogo", uploadLogo, {
    refetchOnWindowFocus: false,
    onError: (error: any) => {
      console.error("Error fetching visits:", error);
    },
  });
};

export default UseUploadLogoQuery;

 