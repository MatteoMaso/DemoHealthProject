import axios from "axios";

async function checkHealth(url: string, attempts: number, delay: number) {
  for (let i = 0; i < attempts; i++) {
    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        console.log('Service is healthy!');
        return true;
      }
    } catch (error) {
      console.log(`Health check failed (attempt ${i + 1}/${attempts}): ${error}`);
    }
    if (i < attempts - 1) {
      console.log(`Waiting for ${delay / 1000} seconds before next attempt...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
  console.log('Service did not become healthy after maximum attempts.');
  return false;
}

export default checkHealth;