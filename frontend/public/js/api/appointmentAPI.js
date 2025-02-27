import axiosInstance from "./index.js";

export async function getUserFutureAppointments(userId) {
    try{
         return await axiosInstance.get("/protected/appointment",  {
      withCredentials: true,
    });
    return response.data
}catch (error) {
  console.log("error: ", error)
  // Rethrow the error to be caught by a higher-level error handler
  throw new Error(
    error.response?.data?.message || "An error occurred during fetching users's future appointments"
  );
}
}
  

  export async function createAppintment(appointment) {
    try{
    return await axiosInstance.post("/protected/appointment/",  {
      withCredentials: true,
    });
    return response.data
    } catch (error) {
      console.log("error: ", error)
      // Rethrow the error to be caught by a higher-level error handler
      throw new Error(
        error.response?.data?.message || "An error occurred during creating an appointments"
      );
    }
  }


  export async function cancelAppoinment(appointmentId) {
    try {
      const response = await axiosInstance.delete(`/protected/appoinment/${appointmentId}`, appointmentId, {
        withCredentials: true,
      });
      return response.data
    } catch (error) {
      console.log("error: ", error)
      // Rethrow the error to be caught by a higher-level error handler
      throw new Error(
        error.response?.data?.message || "An error occurred during appoinment canceling"
      );
    }
  }

  export async function getDoctorFutureAppointments(docId) {
    try {
      const response = await axiosInstance.post(`/protected/appointment/${userId}/${docrId}`,docId, {
        withCredentials: true,
      });
      return response.data
    } catch (error) {
      console.log("error: ", error)
      // Rethrow the error to be caught by a higher-level error handler
      throw new Error(
        error.response?.data?.message || "An error occurred during fetching doctor's future appointments"
      );
    }
  }