import { React } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { mutations } from "../../api";
import { OverlayLoader } from "../../loaders";
import { useOverlayLoader } from "../../hooks";
import { useFormValidation } from "../../validators";
import { ErrorMessage } from "../error-message";
import "../Register/RegisterTab.css";
import "./FPass.css";
import {useNavigate} from 'react-router-dom'
const forgotPasswordFieldToValidate = ["email"];

const FPass = () => {
  const { forgotPassword } = mutations;
  const { show, showing, hide } = useOverlayLoader();

  const validateSchema = useFormValidation(forgotPasswordFieldToValidate);

  const mutation = useMutation(forgotPassword, {
    onMutate: () => show(),
    onSuccess: () => hide(),
    onError: () => hide(),
  });

  const navigate = useNavigate()



  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validateSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data) => {
    console.log({ data });
    mutation.mutate(data);
    navigate ('/new-pass');
  };

  //  handleFormSubmit = async (e) => {
  //   e.preventDefault();

  //   mutation.mutate({ email });

  //   if (mutation.isLoading) {
  //     return <div>Creating user...</div>;
  //   }

  //   if (mutation.isError) {
  //     return <div>Error creating user</div>;
  //   }

  //   if (mutation.isSuccess) {
  //     return <div>User created successfully!</div>;
  //   }
  // };

  return (
    <div className="register">
      <h2>Password Recovery</h2>
      <p>Enter Code Sent to your Email</p>
      <div className="tabForm">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="email"
            placeholder="Enter your email"
            className="border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700 focus:outline-none focus:border-blue-500 placeholder:text-sm"
            {...register("email")}
          />

          {errors.email && <ErrorMessage message={errors.email.message} />}
          <div className="formButton">
            <input type="submit" value="Continue" />
          </div>
        </form>
      </div>
      <OverlayLoader showing={showing} />
    </div>
  );
};

export default FPass;

// import React, { useState } from "react";
// import { useQueries, useMutation } from "@tanstack/react-query";
// import { Link } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { loginSchema, registerSchema } from "../../validators";
// import { queries, mutations } from "../../api";
// import { useOverlayLoader } from "../../hooks";
// import { OverlayLoader } from "../../loaders";
// import { ErrorMessage } from "../error-message";
// import countries from "../../data/countries.json";
// import { FaEye, FaEyeSlash } from "react-icons/fa";

// const tabs = [
//   { id: 0, label: "Register" },
//   { id: 1, label: "Login" },
// ];

// const FPass = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const { show, showing, hide } = useOverlayLoader();
//   const { getUniversities, getDepartments } = queries;
//   const { login, register } = mutations;

//   const [activeTab, setActiveTab] = useState(0);

//   const mutation = useMutation(login, {
//     onMutate: () => show(),
//     onSuccess: () => hide(),
//     onError: () => hide(),
//   });
//   const regMutation = useMutation(register, {
//     onMutate: () => show(),
//     onSuccess: () => hide(),
//     onError: () => hide(),
//   });

//   // TODO
//   // const { data, isLoading, error } = useQuery("data", ()=>{});
//   const {
//     register: reactHookFormRegRegister,
//     handleSubmit: handleRegSubmit,
//     setValue,
//     formState: { errors: regErrors },
//   } = useForm({
//     resolver: yupResolver(registerSchema),
//     defaultValues: {
//       fullName: "",
//       email: "",
//       phoneNumber: "",
//       gender: "",
//       userType: "Student",
//       university: "",
//       department: "",
//       level: "",
//       password: "",
//       country: "Nigeria",
//       subscribe: false,
//     },
//   });

//   const {
//     register: reactHookFormRegister,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(loginSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });

//   const onSubmit = (data) => {
//     mutation.mutate(data);
//   };

//   const onRegSubmit = (data) => {
//     regMutation.mutate(data);
//   };
//   const universitiesAndDepartmentsQuery = useQueries({
//     queries: [
//       { queryKey: ["univerisities"], queryFn: getUniversities },
//       { queryKey: ["departments"], queryFn: getDepartments },
//     ],
//   });

//   if (
//     universitiesAndDepartmentsQuery[0].isLoading ||
//     universitiesAndDepartmentsQuery[1].isLoading
//   ) {
//     <OverlayLoader showing={true} />;
//     return null;
//   }

//   if (
//     universitiesAndDepartmentsQuery[0].isError ||
//     universitiesAndDepartmentsQuery[1].isError
//   ) {
//     <OverlayLoader showing={false} />;
//     return <>An error occurred</>;
//   }

//   const universities = universitiesAndDepartmentsQuery[0].data?.data?.resource;
//   const departments = universitiesAndDepartmentsQuery[1].data?.data?.resource;

//   const handleSubscribeChange = (event) => {
//     const { checked } = event.target;
//     setValue("subscribe", checked);
//   };

//   return (
//             <>
//               <form
//                 className="flex flex-col gap-3"
//                 onSubmit={handleSubmit(onSubmit)}
//               >
//                 <input
//                   type="email"
//                   {...reactHookFormRegister("email")}
//                   className="border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700 focus:outline-none focus:border-blue-500 placeholder:text-sm"
//                   placeholder="Email Address"
//                 />
//                 {errors.email?.message && (
//                   <ErrorMessage message={errors.email.message} />
//                 )}

//                 <div className="flex flex-col sm:flex-row justify-center gap-4">
//                   <button
//                     type="submit"
//                     className="w-[100%] sm:w-[50%] bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
//                   >
//                     Continue
//                   </button>
//                 </div>
//               </form>
//             </>

//   );
// };

// export default FPass;
