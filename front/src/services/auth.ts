import api from "./axiosInstance";

export async function registerUser(data) {
  try {
    const response = await api.post("register/", data);

    console.log("Registration successful:", response.data);
    return response;
  } catch (error) {
    console.error("Error registering user:", error.response || error.message);
    return error.response?.data[0];
  }
}

export async function loginUser(data) {
  try {
    const response = await api.post("login/", data, {
      withCredentials: true,
    });

    console.log("Logined successfuly:", response.data);
    return response;
  } catch (error) {
    console.error(
      "Error registering user:",
      error.response?.data || error.message
    );
    return error.response?.data;
  }
}

export const getUser = async () => {
  try {
    const response = await api.get("user/", {
      withCredentials: true,
    });

    console.log("Got user successfuly:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error getting user:", error.response?.data || error.message);
    return {};
  }
};

export const logOut = async () => {
  try {
    const response = await api.post("logout/", {
      withCredentials: true,
    });

    console.log("Loged out:", response.data);
  } catch (error) {
    console.error("Error logging out:", error.response?.data || error.message);
  }
};

export const updateToken = async (data) => {
  try {
    const response = await api.post("token/refresh/", data, {
      withCredentials: true,
    });
    let info = await response.json();

    if (response.status === 200) {
      console.log("Token updated successfuly:", response.data);
    } else {
      logOut();
    }
  } catch (error) {
    console.error(
      "Error updating token:",
      error.response?.data || error.message
    );
  }
};
