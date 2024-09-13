import React, { createContext, useContext, useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';

const ApiKeyContext = createContext();

const STORAGE_KEY = 'strawberry_phi_api_key';

export const ApiKeyProvider = ({ children }) => {
  const [apiKey, setApiKey] = useState(null);
  const [isApiKeySaved, setIsApiKeySaved] = useState(false);

  useEffect(() => {
    const storedKey = localStorage.getItem(STORAGE_KEY);
    if (storedKey) {
      decryptApiKey(storedKey).then((decryptedKey) => {
        setApiKey(decryptedKey);
        setIsApiKeySaved(true);
      });
    }
  }, []);

  const encryptApiKey = async (key) => {
    const encryptionKey = await getEncryptionKey();
    return CryptoJS.AES.encrypt(key, encryptionKey).toString();
  };

  const decryptApiKey = async (encryptedKey) => {
    const encryptionKey = await getEncryptionKey();
    const bytes = CryptoJS.AES.decrypt(encryptedKey, encryptionKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  const getEncryptionKey = async () => {
    // In a real-world scenario, you might want to use a more secure way to generate and store this key
    return 'strawberry_phi_secret_key';
  };

  const setAndEncryptApiKey = async (key) => {
    const encryptedKey = await encryptApiKey(key);
    localStorage.setItem(STORAGE_KEY, encryptedKey);
    setApiKey(key);
    setIsApiKeySaved(true);
  };

  const removeApiKey = () => {
    localStorage.removeItem(STORAGE_KEY);
    setApiKey(null);
    setIsApiKeySaved(false);
  };

  return (
    <ApiKeyContext.Provider value={{ apiKey, setApiKey: setAndEncryptApiKey, isApiKeySaved, removeApiKey }}>
      {children}
    </ApiKeyContext.Provider>
  );
};

export const useApiKey = () => {
  const context = useContext(ApiKeyContext);
  if (!context) {
    throw new Error('useApiKey must be used within an ApiKeyProvider');
  }
  return context;
};