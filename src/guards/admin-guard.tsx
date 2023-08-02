import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { ReactNode, useEffect, useState } from "react";
import { firebaseApp } from "../configs/firebase";
import { Navigate, useNavigate } from "react-router-dom";
import DashboardLayout from "../pages/dashboard/dashboard-layout";
import { useAppDispatch, useAppSelector } from "../redux-toolkit/hook";
import { selecteAuthState } from "../redux-toolkit/auth/auth-slice";
import { getCurrentAccountThunk } from "../redux-toolkit/auth/auth_thunk";
import { CircularProgress } from "@mui/material";

type AdminGuardPropType = {
  children: React.ReactNode;
};
const AdminGuard = (props: AdminGuardPropType) => {
  const auth = getAuth(firebaseApp);
  const navigate = useNavigate();
  const { account, isAuthLoading } = useAppSelector(selecteAuthState);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(getCurrentAccountThunk(user.uid));
      } else {
        navigate("/login");
      }
    });

    return () => {
      console.log("unsubscribe");
      return unsubscribe();
    };
  }, []);

  if (isAuthLoading === true) return <CircularProgress />;

  if (account?.role !== "admin") {
    return <Navigate to="../permisstion-denied" />;
  }
  return <>{props.children}</>;
};

export default AdminGuard;
