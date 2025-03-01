
import { removeAccessToken } from '/js/helpers/accessTokenManager.js';

export function setUserData(userData) {
  const castedUserData = JSON.stringify(userData);
  localStorage.setItem("user", castedUserData);
  localStorage.setItem("user-role", userData.role);
}


export function logoutUser() {
    removeAccessToken()
    localStorage.removeItem("user");
    localStorage.removeItem("user-role");
  }

export function getUserData() {
  const jsonString = localStorage.getItem("user");
  const jsonObject = JSON.parse(jsonString);
  return jsonObject;
}

export function getUserRole() {
  return localStorage.getItem("user-role");
}


