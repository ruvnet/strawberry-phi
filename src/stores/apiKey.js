import { defineStore } from 'pinia'
import CryptoJS from 'crypto-js'

const STORAGE_KEY = 'strawberry_phi_api_key'

export const useApiKeyStore = defineStore('apiKey', {
  state: () => ({
    encryptedApiKey: localStorage.getItem(STORAGE_KEY) || null,
  }),
  actions: {
    async setApiKey(apiKey) {
      const encryptedApiKey = await this.encryptApiKey(apiKey)
      this.encryptedApiKey = encryptedApiKey
      localStorage.setItem(STORAGE_KEY, encryptedApiKey)
    },
    async getApiKey() {
      if (!this.encryptedApiKey) return null
      return await this.decryptApiKey(this.encryptedApiKey)
    },
    async encryptApiKey(apiKey) {
      const key = await this.getEncryptionKey()
      return CryptoJS.AES.encrypt(apiKey, key).toString()
    },
    async decryptApiKey(encryptedApiKey) {
      const key = await this.getEncryptionKey()
      const bytes = CryptoJS.AES.decrypt(encryptedApiKey, key)
      return bytes.toString(CryptoJS.enc.Utf8)
    },
    async getEncryptionKey() {
      // In a real-world scenario, you might want to use a more secure way to generate and store this key
      return 'strawberry_phi_secret_key'
    },
  },
})