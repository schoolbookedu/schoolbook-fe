import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/AuthProvider";
import "react-toastify/dist/ReactToastify.css";
import { showToast } from "./component/notifications";

// Create a custom React Query client using the Axios instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: (error) => {
        console.error("Error:", error);
        // Handle error state or display toast messages
        showToast(error.message);
      },
    },
    mutations: {
      onError: (error) => {
        console.error("Error:", error);
        showToast(error.message);
      },
      // Add any other default mutation options if needed
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <App />
      </AuthProvider>
      <ToastContainer />
    </QueryClientProvider>
  </React.StrictMode>
);
