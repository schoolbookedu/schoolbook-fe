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

const FPass = () => {
  const { forgotPassword } = mutations;
  const { show, showing, hide } = useOverlayLoader();

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
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data) => {
    console.log({ data });
    mutation.mutate(data);
  };

  return (
    <div className="register">
      <h2>Password Recovery</h2>
      <p>Enter Code Sent to your Email</p>
      <div className="tabForm">
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
        </form>
      </div>
      <OverlayLoader showing={showing} />
    </div>
  );
};

export default FPass;
