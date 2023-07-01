import * as yup from "yup";

export const registerSchema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: yup
    .string()
    .min(11, "Phone number must not be less than 11")
    .required("Phone number is required"),
  gender: yup.string().required("Gender is required"),
  userType: yup.string().required("User type is required"),
  university: yup.string().required("University is required"),
  department: yup.string().required("Department is required"),
  password: yup
    .string()
    .min(4, "Password must be at least 4 characters")
    .required("Password is required"),
  country: yup.string().required("Country is required"),
  subscribe: yup
    .boolean()
    .test("is-true", "Subscription must be true", (value) => value === true)
    .required("Subscription is required"),
});
