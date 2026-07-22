export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatarUrl: string | null;
}

export interface AuthState {
  user: UserProfile | null;
  accessToken: string | null;
  status: "idle" | "loading" | "authenticated" | "unauthenticated";
}

export interface GoogleLoginResponse {
  user: UserProfile;
  accessToken: string;
}