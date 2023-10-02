import { React, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { ErrorMessage } from "../error-message";
import { mutations } from "../../api";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema, useFormValidation } from "../../validators";
import "../Register/RegisterTab.css";
import "./FPass.css";
import { useOverlayLoader } from "../../hooks";
import { OverlayLoader } from "../../loaders";


const FPass = () => {
  const { forgotPassword } = mutations;
  const { show, showing, hide } = useOverlayLoader();

  const forgotPasswordToValidate = [
    "email"
  ];

  const loginSchema = useFormValidation(forgotPasswordToValidate);

  const mutation = useMutation(forgotPassword,
    {
      onMutate: () => show(),
      onSuccess: () => hide(),
      onError: () => hide(),
    });

  const {
    register: reactHookFormForgotRegister,
    handleSubmit: handleFormSubmit,
    formState: { errors: regErrors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
    },
  });

  const ForgotSubmit = (data) => {
    mutation.mutate(data);
    console.log("Forgot Password", data);
  };

  return (
    <div className="register">
      <h2>Password Recovery</h2>
      <p>Enter Code Sent to your Email</p>
      <div className="tabForm">
        <form  onSubmit={handleFormSubmit(ForgotSubmit)}>
        <input
                type="email"
                placeholder="Email Address"
                className="border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700 focus:outline-none focus:border-blue-500 placeholder:text-sm"
                {...reactHookFormForgotRegister("email")}
              />
              {regErrors.email && (
                <ErrorMessage message={regErrors.email.message} />
              )}
              <div className="formButton">
                <button
                  type="submit"
                  className="w-[100%] sm:w-[50%] bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-5"
                >
                  Continue
                </button>
              </div>
        </form>
      </div>
      <OverlayLoader showing={showing} />
    </div>
  );
};

export default FPass;
