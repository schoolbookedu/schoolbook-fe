import React, { useState } from "react";
import { useQueries, useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFormValidation } from "../../validators";
import { queries, mutations } from "../../api";
import { useOverlayLoader } from "../../hooks";
import { OverlayLoader } from "../../loaders";
import { ErrorMessage } from "../error-message";
import countries from "../../data/countries.json";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./RegisterTab.css";

const tabs = [
  { id: 0, label: "Register" },
  { id: 1, label: "Login" },
];

export const loginFieldsToValidate = ["email", "password"];

export const registerFieldsToValidate = [
  "fullName",
  "email",
  "phoneNumber",
  "gender",
  "userType",
  "university",
  "department",
  "level",
  "password",
  "country",
  "subscribe",
];

const StudentLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { show, showing, hide } = useOverlayLoader();
  const { getUniversities, getDepartments } = queries;
  const { login, register } = mutations;

  const loginValidators = useFormValidation(loginFieldsToValidate);

  const registerValidators = useFormValidation(registerFieldsToValidate);

  const [activeTab, setActiveTab] = useState(0);

  const mutation = useMutation(login, {
    onMutate: () => show(),
    onSuccess: () => hide(),
    onError: () => hide(),
  });
  const regMutation = useMutation(register, {
    onMutate: () => show(),
    onSuccess: () => hide(),
    onError: () => hide(),
  });

  // TODO
  // const { data, isLoading, error } = useQuery("data", ()=>{});
  const {
    register: reactHookFormRegRegister,
    handleSubmit: handleRegSubmit,
    setValue,
    formState: { errors: regErrors },
  } = useForm({
    resolver: yupResolver(registerValidators),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      gender: "",
      userType: "Student",
      university: "",
      department: "",
      level: "",
      password: "",
      country: "Nigeria",
      subscribe: false,
    },
  });

  const {
    register: reactHookFormRegister,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginValidators),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  const onRegSubmit = (data) => {
    regMutation.mutate(data);
  };
  const universitiesAndDepartmentsQuery = useQueries({
    queries: [
      { queryKey: ["univerisities"], queryFn: getUniversities },
      { queryKey: ["departments"], queryFn: getDepartments },
    ],
  });

  if (
    universitiesAndDepartmentsQuery[0].isLoading ||
    universitiesAndDepartmentsQuery[1].isLoading
  ) {
    return <OverlayLoader showing={true} />;
  }

  if (
    universitiesAndDepartmentsQuery[0].isError ||
    universitiesAndDepartmentsQuery[1].isError
  ) {
    <OverlayLoader showing={false} />;
    return <>An error occurred</>;
  }

  const universities = universitiesAndDepartmentsQuery[0].data?.data?.resource;
  const departments = universitiesAndDepartmentsQuery[1].data?.data?.resource;

  const handleSubscribeChange = (event) => {
    const { checked } = event.target;
    setValue("subscribe", checked);
  };

  return (
    <>
      <div className="register">
        <div className="tabForm">
          <div className="registerTab">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={activeTab === tab.id ? "active" : ""}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {activeTab === 0 && (
            <form
              className="flex flex-col gap-3"
              onSubmit={handleRegSubmit(onRegSubmit)}
            >
              <input
                type="text"
                placeholder="Fullname e.g John Doe"
                className="border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700 focus:outline-none focus:border-blue-500 placeholder:text-sm"
                {...reactHookFormRegRegister("fullName")}
              />
              {regErrors.fullName && (
                <ErrorMessage message={regErrors.fullName.message} />
              )}

              <input
                type="email"
                placeholder="Email Address"
                className="border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700 focus:outline-none focus:border-blue-500 placeholder:text-sm"
                {...reactHookFormRegRegister("email")}
              />
              {regErrors.email && (
                <ErrorMessage message={regErrors.email.message} />
              )}

              <input
                type="tel"
                placeholder="Enter phone number"
                className="border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700 focus:outline-none focus:border-blue-500 placeholder:text-sm"
                {...reactHookFormRegRegister("phoneNumber")}
              />
              {regErrors.phoneNumber && (
                <ErrorMessage message={regErrors.phoneNumber.message} />
              )}

              <select
                className="border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700 focus:outline-none focus:border-blue-500 placeholder:text-sm"
                {...reactHookFormRegRegister("gender")}
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {regErrors.gender && (
                <ErrorMessage message={regErrors.gender.message} />
              )}

              <select
                className="border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700 focus:outline-none focus:border-blue-500 placeholder:text-sm"
                {...reactHookFormRegRegister("university")}
              >
                <option value="" disabled>
                  Select University
                </option>
                {universities.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>

              {regErrors.university && (
                <ErrorMessage message={regErrors.university.message} />
              )}

              <select
                {...reactHookFormRegRegister("department")}
                className="border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700 focus:outline-none focus:border-blue-500 placeholder:text-sm"
              >
                <option value="" disabled>
                  Select Department
                </option>
                {departments?.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>

              {regErrors?.department && (
                <ErrorMessage message={regErrors.department.message} />
              )}
              <select
                {...reactHookFormRegRegister("level")}
                className="border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700 focus:outline-none focus:border-blue-500 placeholder:text-sm"
              >
                <option value="" disabled>
                  Level
                </option>
                <option value="100">100 Level</option>
                <option value="200">200 Level</option>
                <option value="300">300 Level</option>
                <option value="400">400 Level</option>
              </select>
              {regErrors?.level && (
                <ErrorMessage message={regErrors.level.message} />
              )}
              <div className="password">
                <input
                  type={showPassword ? "text" : "password"} // Use "text" when showPassword is true, otherwise use "password"
                  className="border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700 focus:outline-none focus:border-blue-500 placeholder:text-sm"
                  {...reactHookFormRegRegister("password")}
                  placeholder="Password"
                />
                <div className="showPassword">
                  {showPassword ? (
                    <FaEyeSlash onClick={() => setShowPassword(false)} />
                  ) : (
                    <FaEye onClick={() => setShowPassword(true)} />
                  )}
                </div>
              </div>
              {regErrors?.password && (
                <ErrorMessage message={regErrors.password.message} />
              )}

              <select
                {...reactHookFormRegRegister("country")}
                className="border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700 focus:outline-none focus:border-blue-500 placeholder:text-sm"
              >
                <option value="" disabled>
                  Select Country
                </option>
                {countries?.map((item) => (
                  <option key={item.name} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>

              {regErrors?.country && (
                <ErrorMessage message={regErrors.country.message} />
              )}
              <div>
                {regErrors?.subscribe && (
                  <ErrorMessage message={regErrors.subscribe.message} />
                )}
                <div className="check">
                  <input
                    type="checkbox"
                    className="border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700 focus:outline-none focus:border-blue-500 placeholder:text-sm"
                    {...reactHookFormRegRegister("subscribe")}
                    onChange={handleSubscribeChange}
                  />

                  <label htmlFor="subscribe" className="text-xs">
                    By Registering you agree with the terms and conditions of
                    schoolbook
                  </label>
                </div>
              </div>
              <div className="formButton">
                <button
                  type="submit"
                  className="w-[100%] sm:w-[50%] bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  Register
                </button>{" "}
              </div>
            </form>
          )}
          {activeTab === 1 && (
            <>
              <form
                className="flex flex-col gap-3"
                onSubmit={handleSubmit(onSubmit)}
              >
                <input
                  type="email"
                  {...reactHookFormRegister("email")}
                  className="border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700 focus:outline-none focus:border-blue-500 placeholder:text-sm"
                  placeholder="Email Address"
                />
                {errors.email?.message && (
                  <ErrorMessage message={errors.email.message} />
                )}

                <div className="password">
                  <input
                    type={showPassword ? "text" : "password"} // Use "text" when showPassword is true, otherwise use "password"
                    className="border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700 focus:outline-none focus:border-blue-500 placeholder:text-sm"
                    {...reactHookFormRegRegister("password")}
                    placeholder="Password"
                  />
                  <div className="showPassword">
                    {showPassword ? (
                      <FaEyeSlash onClick={() => setShowPassword(false)} />
                    ) : (
                      <FaEye onClick={() => setShowPassword(true)} />
                    )}
                  </div>
                </div>
                {regErrors?.password && (
                  <ErrorMessage message={regErrors.password.message} />
                )}

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <button
                    type="submit"
                    className="w-[100%] sm:w-[50%] bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                  >
                    Login
                  </button>
                  <Link to="/pass-recover">Forgot&nbsp;password?</Link>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
      <OverlayLoader showing={showing} />
    </>
  );
};

export default StudentLogin;
