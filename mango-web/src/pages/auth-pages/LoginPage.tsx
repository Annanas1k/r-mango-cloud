// pages/LoginPage.tsx
import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import type { CredentialResponse } from "@react-oauth/google";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { googleLoginRequest } from "../../api/auth.api";
import { setCredentials } from "../../redux/auth/authSlice";
import { selectStartPage } from "@/redux/settings/settingsSlice";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const startPage = useAppSelector(selectStartPage);

  const handleGoogleSuccess = async (
    credentialResponse: CredentialResponse,
  ) => {
    if (!credentialResponse.credential) {
      setError("Nu am primit token de la Google");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await googleLoginRequest(credentialResponse.credential);
      dispatch(setCredentials({ user: data.user }));
      navigate(`/cloud/${startPage}`);
    } catch (err) {
      console.error(err);
      setError("Autentificare eșuată. Încearcă din nou.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h1>Autentificare</h1>

      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={() => setError("Login Google eșuat")}
      />

      {loading && <p>Se autentifică...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
