import { React, useState } from "react";
import "../Register/RegisterTab.css";
import "./FPass.css";
import { useMutation } from "@tanstack/react-query";
import { mutations } from "../../api";

const FPass = () => {
  const { forgotPassword } = mutations;
  const [email, setEmail] = useState("");

  const mutation = useMutation(forgotPassword);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    mutation.mutate({ email });

    if (mutation.isLoading) {
      return <div>Creating user...</div>;
    }

    if (mutation.isError) {
      return <div>Error creating user</div>;
    }

    if (mutation.isSuccess) {
      return <div>User created successfully!</div>;
    }
  };

  return (
    <div className="register">
      <h2>Password Recovery</h2>
      <p>Enter Code Sent to your Email</p>
      <div className="tabForm">
        <form onSubmit={handleFormSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="formButton">
            <input type="submit" value="Continue" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default FPass;
