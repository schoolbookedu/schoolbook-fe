<<<<<<< Updated upstream
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
import { useNavigate } from 'react-router-dom';

const forgotPasswordFieldToValidate = ["email"];
=======
import { React, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { ErrorMessage } from "../error-message";
import { mutations } from "../../api";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../validators";
import "../Register/RegisterTab.css";
import "./FPass.css";
import { useOverlayLoader } from "../../hooks";

>>>>>>> Stashed changes

const FPass = () => {
  const { forgotPassword } = mutations;
  const { show, showing, hide } = useOverlayLoader();

<<<<<<< Updated upstream
  const validateSchema = useFormValidation(forgotPasswordFieldToValidate);

  const mutation = useMutation(forgotPassword, {
    onMutate: () => show(),
    onSuccess: () => {
      hide();
      alert('Password recovery successful, check your email for code'); 
      navigate('/new-pass'); 
    },
    onError: () => {
      hide();
      alert('Password recovery failed'); 
    },
  });

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validateSchema),
=======
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
>>>>>>> Stashed changes
    defaultValues: {
      email: "",
    },
  });

<<<<<<< Updated upstream
  const onSubmit = (data) => {
    console.log({ data });
    mutation.mutate(data);
=======
  const ForgotSubmit = (data) => {
    mutation.mutate(data);
    console.log("Forgot Password", data);
>>>>>>> Stashed changes
  };

  return (
    <div className="register">
      <h2>Password Recovery</h2>
      <p>Enter Code Sent to your Email</p>
      <div className="tabForm">
<<<<<<< Updated upstream
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="email"
            placeholder="Enter your email"
            className="border border-gray-300 rounded-md py-2 px-3 mb-6 text-sm text-gray-700 focus:outline-none focus:border-blue-500 placeholder:text-sm"
            {...register("email")}
          />

          {errors.email && <ErrorMessage message={errors.email.message} />}
          <div className="formButton">
            <input type="submit" value="Continue" />
          </div>
=======
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
>>>>>>> Stashed changes
        </form>
      </div>
      <OverlayLoader showing={showing} />
    </div>
  );
};

export default FPass;
