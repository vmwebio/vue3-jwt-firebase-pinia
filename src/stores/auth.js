import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { axios } from 'axios';

const API_KEY = 'AIzaSyAS_BRgXKoue7kGxEIPc1XzV2idSmiKCnA';

export const useAuthStore = defineStore('auth', () => {
  const signup = async (payload) => {
    try {
      let response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${API_KEY}`, {
        ...payload,
        returnSecureToken: true
      });

    } catch {

    }
  }
  
  }

  return { }



})
