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
  const loader = ref(false);

  const auth = async (payload, type) => {

    const stringUrl = type === 'singup' ? 'signUp' : 'signInWithPassword';

    error.value = ''
    loader.value = true

    try {
      let response = await Axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:${stringUrl}?key=${API_KEY}`,        

        {
          ...payload,
          returnSecureToken: true,
        }
      );

      console.log(response.data);

       userInfo.value = {
        token: response.data.idToken,
        email: response.data.email,
        userId: response.data.localId,
        refreshToken: response.data.refreshToken,
        expiresIn: response.data.expiresIn
      }

    } catch (err) {
      switch (err.response.data.error.message) {
        case 'EMAIL_EXISTS':
          error.value = 'Такой email уже есть!'
          break;
        case 'EMAIL_FOUND':
          error.value = 'Email не найден!'
          break;
        case 'INVALID_PASSWORD':
          error.value = 'Не верный пароль!'
          break;          
        case 'OPERATION_NOT_ALLOWED':
          error.value = 'Дейстивие не разрешено'
          break;
        default:
          error.value = 'Ошибка неизвестна'
          break;
      }

      throw error.value;
    } finally {
      loader.value = false;
    }
  };

  return { auth, userInfo, error, loader };
});
