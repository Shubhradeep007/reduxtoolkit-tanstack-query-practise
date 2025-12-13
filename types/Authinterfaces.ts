export interface AuthState {
  user: null;
  isAuthenticated: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export interface Product {
  name: string;
  price: string;
  description: string;
  brand: string;
  image?: File;
}
