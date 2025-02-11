import * as Yup from "yup";

//signup user
export const validationSchemaSignup = () =>
  Yup.object({
    full_name: Yup.string().required("لطفا نام کاربری خود را وارد کنید"),
    phone: Yup.string()
      .max(11, "شماره تلفن نمیتواند بیش از ۱۱ رقم باشد")
      .required("لطفا شماره تلفن خود را وارد کنید"),
    password: Yup.string().required("فیلد اجباری است"),
  });

//signin user
  export const validationSchemaSignin = () =>
  Yup.object({
    phone: Yup.string()
      .max(11, "شماره تلفن نمیتواند بیش از ۱۱ رقم باشد")
      .required("لطفا شماره تلفن خود را وارد کنید"),
  });