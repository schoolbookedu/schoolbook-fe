import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(4, "Password must be at least 4 characters")
    .required("Password is required"),
});

// const loginSchema = yup.object().shape({
//   fullName: yup.string().required("Full name is required"),
//   email: yup.string().email("Invalid email").required("Email is required"),
//   phoneNumber: yup.string().required("Phone number is required"),
//   gender: yup.string().required("Gender is required"),
// });
