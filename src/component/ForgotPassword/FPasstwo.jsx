import { React, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { OverlayLoader } from "../../loaders";
import "../Register/RegisterTab.css";
import "./FPass.css";
import { mutations } from "../../api";
import { useMutation } from "@tanstack/react-query";
import { useFormValidation } from "../../validators";
import { ErrorMessage } from "../error-message";
import { useOverlayLoader } from "../../hooks";
const passwordResetFieldToValidate = [
  "passwordResetToken",
  "newPassword",
  "confirmPassword",
];

const FPasstwo = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const validateSchema = useFormValidation(passwordResetFieldToValidate);
  const { show, showing, hide } = useOverlayLoader();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validateSchema),
    defaultValues: {
      passwordResetToken: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { ResetPassword } = mutations;
  const mutation = useMutation(ResetPassword, {
    onMutate: () => show(),
    onSuccess: () => hide(),
    onError: () => hide(),
  });

  const NewPassword = (data) => {
    mutation.mutate(data);
    navigate("/");
  };
  return (
    <div className="register">
      <h2>Password Recovery</h2>
      <div className="tabForm">
        <form onSubmit={handleSubmit(NewPassword)}>
          <input
            type="text"
            className="border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700 focus:outline-none focus:border-blue-500 placeholder:text-sm"
            placeholder="Code"
            {...register("passwordResetToken")}
          />
          {errors.passwordResetToken && (
            <ErrorMessage message={errors.passwordResetToken.message} />
          )}
          <div className="w-full flex flex-row relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700 focus:outline-none focus:border-blue-500 placeholder:text-sm"
              placeholder="Enter New Password"
              {...register("newPassword")}
            />
            <div className="showPassword absolute right-4 top-3">
              {showPassword ? (
                <FaEyeSlash onClick={() => setShowPassword(false)} />
              ) : (
                <FaEye onClick={() => setShowPassword(true)} />
              )}
            </div>
          </div>
          {errors.newPassword && (
            <ErrorMessage message={errors.newPassword.message} />
          )}
          <div className="w-full flex flex-row relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700 focus:outline-none focus:border-blue-500 placeholder:text-sm"
              placeholder="Confirm New Password"
              {...register("confirmPassword")}
            />
            <div className="showPassword absolute right-4 top-3">
              {showConfirmPassword ? (
                <FaEyeSlash onClick={() => setShowConfirmPassword(false)} />
              ) : (
                <FaEye onClick={() => setShowConfirmPassword(true)} />
              )}
            </div>
          </div>
          {errors.confirmPassword && (
            <ErrorMessage message={errors.confirmPassword.message} />
          )}
          <div className="flex flex-row justify-center px-0 md:px-10">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-10 rounded"
            >
              Submit
            </button>
          </div>
        </form>
        <OverlayLoader showing={showing} />
      </div>
    </div>
  );
};

export default FPasstwo;
