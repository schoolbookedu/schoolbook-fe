import * as Yup from "yup";

const FormFieldValidationMap = {
  fullName: {
    rule: Yup.string().required("Full name is required"),
  },
  email: {
    rule: Yup.string().email("Invalid email").required("Email is required"),
  },
  phoneNumber: {
    rule: Yup.string()
      .min(11, "Phone number must not be less than 11")
      .required("Phone number is required"),
  },
  courseTitle: {
    rule: Yup.string()
      .min(3, "Course title must not be less than 3 characters")
      .required("Course title is required"),
  },
  courseCode: {
    rule: Yup.string().required("Course code is required"),
  },
  courseObjectives: {
    rule: Yup.string().required("Course objectives is required"),
  },
  gender: {
    rule: Yup.string().required("Gender is required"),
  },
  userType: {
    rule: Yup.string().required("User type is required"),
  },
  university: {
    rule: Yup.string().required("University is required"),
  },
  department: {
    rule: Yup.string().required("Department is required"),
  },
  country: {
    rule: Yup.string().required("Country is required"),
  },
  level: {
    rule: Yup.string().required("Level is required"),
  },
  subscribe: {
    rule: Yup.boolean()
      .test("is-true", "Subscription must be true", (value) => value === true)
      .required("Subscription is required"),
  },
  bankVerificationNumber: {
    rule: Yup.string()
      .required("BVN is required")
      .matches(/^[0-9]+$/, "Must be only digits")
      .test(
        "bvn",
        "Must be exactly 11 characters",
        (val) => val?.length === 11
      ),
  },
  password: {
    rule: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#.\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
  },
  newPassword: {
    rule: Yup.string()
      .required("New password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#.\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
  },
  confirmPassword: {
    rule: Yup.string()
      .required("Confirm password is required")
      .oneOf(
        [Yup.ref("newPassword"), null],
        "Confrim Password  must match with New Password"
      ),
  },
  passwordResetToken: {
    rule: Yup.string().required("Password Reset Token is required"),
  },
  oldPassword: {
    rule: Yup.string()
      .required("Old password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#.\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
  },
  firstName: {
    rule: Yup.string()
      .required("First name is required")
      .min(2, "Must be at least 2 characters"),
  },
  lastName: {
    rule: Yup.string()
      .required("Last name is required")
      .min(2, "Must be at least 2 characters"),
  },
  state: {
    rule: Yup.string().required("State is required"),
  },
  street: {
    rule: Yup.string().required("Street is required"),
  },
  houseNumber: {
    rule: Yup.string().required("House number is required"),
  },
  dateOfBirth: {
    rule: Yup.date().required("Date of birth is required"),
  },
  zipCode: {
    rule: Yup.string().required("Zip code is required"),
  },
  city: {
    rule: Yup.string().required("City is required"),
  },
};

export const useFormValidation = (fields) => {
  const rules = {};

  fields.forEach((field) => {
    const validationRule = FormFieldValidationMap[field]?.rule;
    rules[field] = validationRule;
  });

  return Yup.object().shape({
    ...rules,
  });
};
