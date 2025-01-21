import { Profile } from "./document";

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: Profile;
  user_id: string;
  error?: string;
}
