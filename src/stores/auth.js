import { ref } from "vue";
import { defineStore } from "pinia";
import { Axios } from "axios";

const API_KEY = "AIzaSyAS_BRgXKoue7kGxEIPc1XzV2idSmiKCnA";

export const useAuthStore = defineStore("auth", () => {
  const userInfo = ref({
    token: "",
    email: "",
    userId: "",
    refreshToken: "",
    expiresIn: "",
  });

  const error = ref('');

  const signup = async (payload) => {
    error.value = ''

    try {
      let response = await Axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,        

        {
          ...payload,
          returnSecureToken: true,
        }
      );

       userInfo.value = {
        token: response.data.idToken,
        email: response.data.email,
        userId: response.data.localId,
        refreshToken: response.data.refreshToken,
        expiresIn: response.data.expiresIn,
      },

      console.log("Data", response.data);
      
    } catch (err) {
      switch (err.response.data.error.message) {
        case 'EMAIL_EXISTS':
          error.value = 'Такой email уже есть!'
          break;
        case 'OPERATION_NOT_ALLOWED':
          error.value = 'Дейстивие не разрешено'
          break;
          default:
          error.value = 'Ошибка неизвестна'
          break;
      }
    }
  };

  return { signup, userInfo, error };
});
