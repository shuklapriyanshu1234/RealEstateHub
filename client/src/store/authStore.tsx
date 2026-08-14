import Cookies from "js-cookie";
import { create } from "zustand";
import { JwtPayload, jwtDecode } from "jwt-decode";

type State = {
  user: {
    _id: string;
    role: string;
  } | null;
};

type Actions = {
  setUser(jwt: string): void;
  logOut(): void;
};

export const useAuthStore = create<State & Actions>((set) => {
  const userCookie = Cookies.get("user") || null;
  const user = userCookie ? JSON.parse(userCookie) : null;

  return {
    user,
    setUser: (jwt: string) =>
      set((state) => {
        const decoded = jwtDecode<JwtPayload & { _id: string; role: string }>(jwt);

        const user = {
          _id: decoded._id,
          role: decoded.role,
        };

        Cookies.set("user", JSON.stringify(user), {
          sameSite: "Lax",
          expires: 30 / (24 * 60),
        });

        // NEW: store the actual JWT so the server can authenticate requests
        Cookies.set("access-token", jwt, {
          sameSite: "Lax",
          expires: 30 / (24 * 60),
        });

        return { ...state, user };
      }),
    logOut: () =>
      set((state) => {
        Cookies.remove("user");
        Cookies.remove("access-token");
        state.user = null;

        return { ...state };
      }),
  };
});
