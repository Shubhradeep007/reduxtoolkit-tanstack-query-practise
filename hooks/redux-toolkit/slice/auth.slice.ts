import Api from "@/api/api";
import { AuthState } from "@/types/Authinterfaces";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const intialState: AuthState = {
  user: null,
  isAuthenticated: false,
  status: "idle",
  error: null,
};

export const RegisterUser = createAsyncThunk(
  "auth/register",
  async (data: FormData, { rejectWithValue }) => {
    try {
      const userCreate = await Api.post("/register", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return userCreate.data;
    } catch (error: any) {
      console.log("error form thunk", error);
      return rejectWithValue(
        error.message || "Error occurred while registering user"
      );
    }
  }
);

export const LoginUser = createAsyncThunk(
  "auth/login",
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const userLogin = await Api.post("/login", data);
      return userLogin.data;
    } catch (error: any) {
      console.log("error form thunk", error);
      return rejectWithValue(
        error.message || "Error occurred while logging in user"
      );
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await Api.get("/user/dashboard");
      // The API returns data in an array: { data: [user] }
      return response.data.data[0];
    } catch (error: any) {
      console.log("error fetching user profile", error);
      return rejectWithValue(
        error.message || "Error occurred while fetching user profile"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: intialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(RegisterUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(RegisterUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(RegisterUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(LoginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(LoginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(LoginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
