import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";

// 1. Interfața pentru utilizator
export interface User {
  name: string;
  avatarUrl?: string | null;
}

// 2. Interfața pentru Props
interface AvatarCircleProps {
  user: User;
}

// Funcție utilitară pentru generarea inițialelor
const getInitials = (name: string): string => {
  if (!name) return "?";
  
  const words = name.trim().split(/\s+/);
  if (words.length === 1) {
    return words[0].substring(0, 2).toUpperCase();
  }
  
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
};

export const AvatarCircle = ({ user }: AvatarCircleProps) => {
  const initials = getInitials(user.name);

  return (
    <Avatar className="size-9">
      <AvatarImage src={user.avatarUrl ?? undefined} alt={user.name} />
      <AvatarFallback className="bg-primary text-primary-foreground text-xs font-medium">
        {initials}
      </AvatarFallback>
    </Avatar>
  );
};