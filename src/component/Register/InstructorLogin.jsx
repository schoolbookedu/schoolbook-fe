import React, { useState } from "react";
import { useQueries, useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { queries, mutations } from "../../api";

import "./RegisterTab.css";

const tabs = [
  { id: 0, label: "Register" },
  { id: 1, label: "Login" },
];

const InstructorLogin = () => {
  const { getUniversities, getDepartments } = queries;
  const { login, register } = mutations;

  const [activeTab, setActiveTab] = useState(0);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [university, setUniversity] = useState("");
  const [department, setDepartment] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    gender: "",
    userType: "Instructor",
    university,
    department,
    password: "",
    country: "",
    subscribe: "",
  });

  const mutation = useMutation(login);
  const regMutation = useMutation(register);
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
    return <></>;
  }

  if (
    universitiesAndDepartmentsQuery[0].isError ||
    universitiesAndDepartmentsQuery[1].isError
  ) {
    return <>Error fetching data</>;
  }

  const universities = universitiesAndDepartmentsQuery[0].data?.data?.resource;
  const departments = universitiesAndDepartmentsQuery[1].data?.data?.resource;

  //Signup
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      university: name === "universities" ? value : formData.university,
      department: name === "departments" ? value : formData.department,
    });
  };

  const handleRegSubmit = (e) => {
    e.preventDefault();

    const updatedFormData = {
      ...formData,
      university: university,
      department: department,
    };
    regMutation.mutate(updatedFormData);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    mutation.mutate({ email, password });

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
          <form onSubmit={handleRegSubmit}>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Fullname"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number"
            />
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option className="drop" value="">
                Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <select
              name="university"
              value={university}
              onChange={(event) => setUniversity(event.target.value)}
            >
              <option>Select University</option>
              {universities.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>

            <select
              name="department"
              value={department}
              onChange={(event) => setDepartment(event.target.value)}
            >
              <option>Select Department</option>
              {departments.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
            />
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Country"
            />
            <div className="check">
              <input
                type="checkbox"
                name="subscribe"
                value={formData.subscribe}
                onChange={handleChange}
              />
              <label>
                By Registering you agree with the terms and conditions of
                schoolbook
              </label>
            </div>
            <div className="formButton">
              <input type="submit" value="Register" />
            </div>
          </form>
        )}
        {activeTab === 1 && (
          <>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                name="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
              <input
                type="password"
                placeholder="Password"
                id="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                autoComplete="current-password"
              />
              <div className="loginButton">
                <input type="submit" value="Login" />
                <Link to="/pass-recover">Forgot&nbsp;password?</Link>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default InstructorLogin;
