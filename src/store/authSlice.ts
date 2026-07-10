import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type RegisteredUser = {
  email: string;
  password: string;
};

export type AuthState = {
  users: RegisteredUser[];
  currentUser: { email: string } | null;
  pendingEmail: string | null;
  pendingOtp: string | null;
  hasHydrated: boolean;
};

const USERS_STORAGE_KEY = "onedao:users";
const SESSION_STORAGE_KEY = "onedao:session";

function loadUsers(): RegisteredUser[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(USERS_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as RegisteredUser[]) : [];
  } catch {
    return [];
  }
}

function saveUsers(users: RegisteredUser[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

function loadSession(): { email: string } | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(SESSION_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as { email: string }) : null;
  } catch {
    return null;
  }
}

function saveSession(session: { email: string } | null) {
  if (typeof window === "undefined") return;
  if (session) {
    window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
  } else {
    window.localStorage.removeItem(SESSION_STORAGE_KEY);
  }
}

export function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

const initialState: AuthState = {
  users: [],
  currentUser: null,
  pendingEmail: null,
  pendingOtp: null,
  hasHydrated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    hydrate(state) {
      state.users = loadUsers();
      state.currentUser = loadSession();
      state.hasHydrated = true;
    },
    registerUser(state, action: PayloadAction<{ email: string; password: string; otp: string }>) {
      const { email, password, otp } = action.payload;
      const existingIndex = state.users.findIndex((user) => user.email === email);
      const nextUser: RegisteredUser = { email, password };
      if (existingIndex >= 0) {
        state.users[existingIndex] = nextUser;
      } else {
        state.users.push(nextUser);
      }
      state.pendingEmail = email;
      state.pendingOtp = otp;
      saveUsers(state.users);
    },
    verifyOtp(state) {
      state.pendingEmail = null;
      state.pendingOtp = null;
    },
    loginSuccess(state, action: PayloadAction<{ email: string }>) {
      state.currentUser = action.payload;
      saveSession(action.payload);
    },
    logout(state) {
      state.currentUser = null;
      saveSession(null);
    },
  },
});

export const { hydrate, registerUser, verifyOtp, loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
