import axiosInstance from "./index.js";

export async function getDoctors() {
  return await axiosInstance.get("/",  {
    withCredentials: true,
  });
}

export async function getDoctorByExperties(expertiseId) {
  try {
    
    const response = await axiosInstance.get(`/protected/doctor/expertise/${expertiseId}`, {
      withCredentials: true,
    });
    return response.data
  } catch (error) {
    console.log("error: ", error)
    // Rethrow the error to be caught by a higher-level error handler
    throw new Error(
      error.response?.data?.message || "An error occurred during fetching doctors by expertise"
    );
  }
}


export async function docsAvailbleAppointments(docId) {
  try {
    const response = await axiosInstance.get(`/protected/doctor/${docId}/availableAppointments`, {
      withCredentials: true,
    });
    return response.data
  } catch (error) {
    console.log("error: ", error)
    // Rethrow the error to be caught by a higher-level error handler
    throw new Error(
      error.response?.data?.message || "An error occurred during fetching doctors availble ppointments"
    );
  }
}



