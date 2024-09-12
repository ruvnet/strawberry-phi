<template>
  <v-container>
    <h1 class="text-h4 mb-4">Settings</h1>
    <v-card class="mb-4">
      <v-card-title>API Key Management</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="apiKey"
          label="OpenAI API Key"
          :type="showApiKey ? 'text' : 'password'"
          :append-icon="showApiKey ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append="showApiKey = !showApiKey"
        ></v-text-field>
        <v-btn color="primary" @click="saveApiKey" :loading="isSaving">Save API Key</v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { ref } from 'vue'
import { useApiKeyStore } from '../stores/apiKey'

export default {
  name: 'Settings',
  setup() {
    const apiKeyStore = useApiKeyStore()
    const apiKey = ref('')
    const showApiKey = ref(false)
    const isSaving = ref(false)

    const saveApiKey = async () => {
      isSaving.value = true
      await apiKeyStore.setApiKey(apiKey.value)
      isSaving.value = false
    }

    return {
      apiKey,
      showApiKey,
      isSaving,
      saveApiKey
    }
  }
}
</script>