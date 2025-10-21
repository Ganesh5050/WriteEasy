import { apiClient } from './api';

// Test API connection
export const testApiConnection = async () => {
  try {
    const response = await apiClient.healthCheck();
    console.log('✅ API Connection successful:', response);
    return true;
  } catch (error) {
    console.error('❌ API Connection failed:', error);
    return false;
  }
};

// Test authentication
export const testAuth = async () => {
  try {
    // Test registration
    const registerResult = await apiClient.register(
      'test@example.com',
      'password123',
      'Test User'
    );
    console.log('✅ Registration successful:', registerResult);
    
    // Test login
    const loginResult = await apiClient.login(
      'test@example.com',
      'password123'
    );
    console.log('✅ Login successful:', loginResult);
    
    return true;
  } catch (error) {
    console.error('❌ Auth test failed:', error);
    return false;
  }
};
