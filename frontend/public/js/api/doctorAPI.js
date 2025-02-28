import axiosInstance from "./index.js";

export async function getDoctors() {
  return await axiosInstance.get("/",  {
    withCredentials: true,
  });
}

export async function getDoctorByExperties(expertise) {
  try {
    const response = await axiosInstance.post("/admin/doctor", expertise, {
      withCredentials: true,
    });
    return response.data
  } catch (error) {
    console.log("error: ", error)
    // Rethrow the error to be caught by a higher-level error handler
    throw new Error(
      error.response?.data?.message || "An error occurred during fetching location"
    );
  }
}


