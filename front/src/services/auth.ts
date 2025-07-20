import axios from "axios";

export async function registerUser(data) {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/register/",
      data
    );

    console.log("Registration successful:", response.data);
  } catch (error) {
    console.error(
      "Error registering user:",
      error.response?.data || error.message
    );
  }
}

export async function loginUser(data) {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/login/",
      data,
      {
        withCredentials: true,
      }
    );

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
    const response = await axios.get("http://localhost:8000/api/user/", {
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
    const response = await axios.post("http://localhost:8000/api/logout/", {
      withCredentials: true,
    });

    console.log("Loged out:", response.data);
  } catch (error) {
    console.error("Error logging out:", error.response?.data || error.message);
  }
};
