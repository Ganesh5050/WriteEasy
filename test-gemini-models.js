const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI('AIzaSyDyvCdWAqAkhW80xi5Ug_X9tF1NPGbiJOY');

(async () => {
  try {
    console.log('📋 Fetching available Gemini models...\n');
    
    // Try to generate content with different model names
    const modelsToTry = [
      'gemini-pro',
      'gemini-1.5-flash',
      'gemini-1.5-pro',
      'gemini-1.0-pro'
    ];
    
    for (const modelName of modelsToTry) {
      try {
        console.log(`Testing: ${modelName}...`);
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent('Hi');
        const response = await result.response;
        const text = response.text();
        console.log(`✅ ${modelName} WORKS! Response: "${text.substring(0, 50)}..."\n`);
        break; // Found a working model!
      } catch (err) {
        console.log(`❌ ${modelName} failed: ${err.message.substring(0, 100)}\n`);
      }
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
})();

