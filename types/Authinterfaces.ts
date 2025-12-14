export interface User {
  _id: string;
  name: string;
  email: string;
  image: string;
  mobile: string;
  role: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export interface Product {
  name: string;
  price: string;
  description: string;
  brand: string;
  image?: File | string;
}
