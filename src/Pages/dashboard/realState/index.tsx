import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import Button from "../../../components/ui/atoms/Button";
import LayoutProfile from "../../../components/profile/LayoutProfile";
import InputState from "../../../components/ui/atoms/input/inputState";
import ComboBox from "../../../components/common/Combo";
import useCreateAnnounceMutation from "../../../hooks/mutation/userPanel/useCreateAnnounceMutation";

export default function Realstate() {
  const navigate = useNavigate();
  const { mutate } = useCreateAnnounceMutation();

  const formik = useFormik({
    initialValues: {
      loan: "",
      province: "",
      city: "",
      zone: "",
      address: "",
      propertyType: "",
      usage: "",
      documentType: "",
      location: "",
    },
    onSubmit: (values) => {
      const payload = {
        loan: undefined,
        type: values.propertyType,
        region: `${values.province} ${values.city} ${values.zone}`,
        address: values.address,
        location: values.location,
        usage: values.usage,
        document_type: values.documentType,
        land_metrage: undefined,
        useful_metrage: undefined,
        floor_number: undefined,
        floor: undefined,
        Unit_in_floor: undefined,
        year_of_build: undefined,
        full_name: undefined,
        price: undefined,
        room_number: undefined,
        features: undefined,
      };
      mutate(payload, {
        onSuccess: () => {
          navigate("/dashboard/detailsPropertyDashboard", {
            replace: true,
            state: { variant: "notheader" },
          });
        },
      });
    },
  });

  return (
    <LayoutProfile>
      <div className="w-full flex flex-col items-center justify-center my-16">
        <div className="flex flex-col items-center gap-4 mobile:gap-2">
          <h1 className="text-[1.5rem] mobile:text-[18px]">ثبت آگهی جدید</h1>
          <span className="h-[2px] w-[70%] bg-[#09A380]"></span>
        </div>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col items-center justify-center w-full gap-5">
          <div className="grid lg:grid-cols-2 lg:gap-10 w-full">
            <InputState
              label="استان"
              placeholder="کردستان"
              name="province"
              value={formik.values.province}
              onChange={formik.handleChange}
            />
            <InputState
              label="شهرستان"
              placeholder="سنندج"
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
            />
            <ComboBox
              label="منطقه"
              options={["منطقه 1", "منطقه 2"]}
              name="zone"
              value={formik.values.zone}
              onChange={(val) =>
                formik.setFieldValue("zone", val)
              }
            />
            <InputState
              label="آدرس ملک"
              placeholder="خیابان اوراز"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
            />
            <ComboBox
              label="نوع ملک"
              options={["ویلایی", "مسکونی"]}
              name="propertyType"
              value={formik.values.propertyType}
              onChange={(val) =>
                formik.setFieldValue("propertyType", val)
              }
            />
            <ComboBox
              label="نوع کاربری"
              options={["مسکونی", "تجاری"]}
              name="usage"
              value={formik.values.usage}
              onChange={(val) =>
                formik.setFieldValue("usage", val)
              }
            />
            <ComboBox
              label="نوع مالکیت"
              options={["قولنامه", "سند رسمی"]}
              name="documentType"
              value={formik.values.documentType}
              onChange={(val) =>
                formik.setFieldValue("documentType", val)
              }
            />
            <ComboBox
              label="موقعیت ملک"
              options={["جنوبی", "شمالي"]}
              name="location"
              value={formik.values.location}
              onChange={(val) =>
                formik.setFieldValue("location", val)
              }
            />
          </div>
        </div>
        <div className="w-[90%] flex items-center justify-end">
          <Button
            submit="true"
            width="110px"
            height="50px"
            bgcolor="#09A380"
            borderradius="30px"
            color="white"
            type="submit"
          >
            <p className="text-[1rem] font-bold">ثبت</p>
          </Button>
        </div>
      </form>
    </LayoutProfile>
  );
}
