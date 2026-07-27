// components/auth/LoginDialog.tsx
import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import type { CredentialResponse } from "@react-oauth/google";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAppDispatch } from "@/redux/hooks";
import { setCredentials } from "@/redux/auth/authSlice";
import { googleLoginRequest } from "@/api/auth.api";

interface LoginDialogProps {
  trigger: React.ReactNode; // orice element care deschide dialogul (ex: butonul "Sign in")
}

export function LoginDialog({ trigger }: LoginDialogProps) {
  const { t } = useTranslation('login');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    if (!credentialResponse.credential) {
      setError(t("login.errorNoToken"));
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await googleLoginRequest(credentialResponse.credential);
      dispatch(setCredentials({ user: data.user }));
      setOpen(false);
      navigate("/cloud/home");
    } catch (err) {
      console.error(err);
      setError(t("login.error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger >{trigger}</DialogTrigger>

      <DialogContent className="sm:max-w-sm">
        <DialogHeader className="items-center text-center">
          <div className="mb-2 text-3xl">🥭</div>
          <DialogTitle>{t("login.title")}</DialogTitle>
          <DialogDescription>{t("login.description")}</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-3 py-2">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setError(t("login.error"))}
            theme="outline"
            shape="pill"
            width={280}
          />

          {loading && (
            <p className="text-sm text-muted-foreground">{t("login.loading")}</p>
          )}
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>

        <p className="text-center text-xs text-muted-foreground">
          {t("login.terms")}
        </p>
      </DialogContent>
    </Dialog>
  );
}