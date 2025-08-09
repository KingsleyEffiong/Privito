import axiosInstance from "./axiosInstance";

interface Credentials {
  email: string;
  password: string;
}

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface AuthResponse {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  tokens: {
    access: string;
    refresh: string;
  };
  redirect: string;
}

const loginEndpoints = {
  login: "/login/",
};

const signupEndpoints = {
  signup: "/signup/",
};

export const login = async (credentials: Credentials): Promise<AuthResponse> => {
  const { data } = await axiosInstance.post(loginEndpoints.login, credentials);

  const userDataResponse = data.data;

  return {
    user: {
      id: userDataResponse.id,
      firstName: userDataResponse.first_name,
      lastName: userDataResponse.last_name,
      email: userDataResponse.email,
    },
    tokens: userDataResponse.tokens,
    redirect: data.redirect_url,
  };
};

export const signup = async (userData: UserData): Promise<AuthResponse | null> => {
  try {
    const { data } = await axiosInstance.post(signupEndpoints.signup, {
      user: userData,
    });

    if (!data || !data.user_data || !data.user_data.tokens) {
      throw new Error("Received invalid data structure from server.");
    }

    const userDataResponse = data.user_data;

    return {
      user: {
        id: userDataResponse.id,
        firstName: userDataResponse.first_name,
        lastName: userDataResponse.last_name,
        email: userDataResponse.email,
      },
      tokens: userDataResponse.tokens,
      redirect: data.redirect_url,
    };
  } catch (error: any) {
    console.error("Signup API call failed:", error?.response?.data || error.message);
    return null;
  }
};

export const refreshAccessToken = async (refreshToken: string): Promise<string> => {
  const { data } = await axiosInstance.post("/refresh", { refreshToken });
  return data.accessToken;
};
