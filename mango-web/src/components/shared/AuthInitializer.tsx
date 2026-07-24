import { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { getMeRequest } from "../../api/auth.api";
import { setCredentials, setUnauthenticated } from "../../redux/auth/authSlice";
import LoadingUI from "./LoadingUI";

export default function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    getMeRequest()
      .then((user) => dispatch(setCredentials({ user })))
      .catch(() => dispatch(setUnauthenticated()))
      .finally(() => setChecking(false));
  }, [dispatch]);

  if (checking) return <LoadingUI />;
  return <>{children}</>;
}