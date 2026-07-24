// components/user/UserProfileCard.tsx
import { useTranslation } from "react-i18next";
import { Mail, ShieldCheck, User as UserIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Button } from "../ui/button";
import { logoutRequest } from "@/api/auth.api";
import { logout } from "@/redux/auth/authSlice";
import { useNavigate } from "react-router";

export function UserProfileCard() {
  const { t } = useTranslation('profile');
  const user = useAppSelector((state) => state.auth.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
  if (!user) return null;

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

    const handleLogout = async () => {
    await logoutRequest();   // șterge cookie-ul httpOnly din backend
    dispatch(logout());      // curăță userul din Redux
    navigate("/");           // înapoi pe landing page
  };

  return (
    <Card className="max-w-md">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={user.avatarUrl ?? undefined} alt={user.name} />
          <AvatarFallback className="bg-primary text-primary-foreground text-lg">
            {initials}
          </AvatarFallback>
        </Avatar>

        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-foreground">{user.name}</h2>
          <Badge variant="secondary" className="gap-1">
            <ShieldCheck className="size-3" />
            {t("profile.verified")}
          </Badge>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="space-y-3 pt-4 text-sm">
        <InfoRow icon={Mail} label={t("profile.email")} value={user.email} />
        <InfoRow icon={UserIcon} label={t("profile.userId")} value={user.id} mono />
      </CardContent>
      <Button onClick={handleLogout}>Log Out</Button>
    </Card>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
  mono = false,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="flex items-center gap-2 text-muted-foreground">
        <Icon className="size-4" />
        {label}
      </span>
      <span
        className={
          mono
            ? "truncate font-mono text-xs text-foreground"
            : "truncate text-foreground"
        }
        title={value}
      >
        {value}
      </span>
    </div>
  );
}