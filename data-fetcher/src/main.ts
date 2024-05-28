import axios, { AxiosError } from "axios";
import dotenv from "dotenv";
import { observationSchema } from "./observations.dto";
import { z } from "zod";
import checkHealth from "./helper/checkApiHealth";

// Load environment variables from .env file
dotenv.config();

const MAX_MESSAGES = 20;
const MAX_HEALTH_CHECK_ATTEMPTS = 5;
const HEALTH_CHECK_DELAY_MS = 10000; // 10 seconds

type observationType = z.infer<typeof observationSchema>;

async function fetchData(url: string): Promise<observationType[]> {
  let data: observationType[] = [];

  const response = await axios.get(url);
  
  if (response.status !== 200) {
    console.log('Error fetching data:', response);
    return data;
  }

  data = response.data.map((message: any) =>
    observationSchema.parse(message)
  );

  return data;
}

async function processMessage(data: observationType[], url: string) {
  // TODO: ensure all observation has the same client_id

  const client = {
    id: data[0].client_id,
    birthdayDate: data[0].date_birthdate,
    gender: data[0].gender,
    ethnicity: data[0].ethnicity,
  };

  const message = {
    client,
    observations: data.map((observation) => ({
      dateTesting: observation.date_testing,
      creatine: {
        value: observation.creatine,
        unit: observation.creatine_unit,
      },
      chloride: {
        value: observation.chloride,
        unit: observation.chloride_unit,
      },
      fastingGlucose: {
        value: observation.fasting_glucose,
        unit: observation.fasting_glucose_unit,
      },
      potassium: {
        value: observation.potassium,
        unit: observation.potassium_unit
      },
      sodium: {
        value: observation.sodium,
        unit: observation.sodium_unit,
      },
      totalCalcium: {
        value: observation.total_calcium,
        unit: observation.total_calcium_unit,
      },
      totalProtein: {
        value: observation.total_protein,
        unit: observation.total_protein_unit,
      },
    })),
  };

  try {
    const response = await axios.post(url, message);
    if(response.status !== 201) {
      console.log('Error processing message:', response);
    }
  } catch (error) {
    console.log('Error processing message', error);
  }
}

async function main() {

  const FETCH_PATIENT_API_URL = process.env.FETCH_PATIENT_API_URL;
  const MAIN_INTERNAL_API_URL = process.env.MAIN_INTERNAL_API_URL;

  if (!FETCH_PATIENT_API_URL) {
    console.error('FETCH_PATIENT_API_URL is not defined');
    process.exit(1);
  }

  if (!MAIN_INTERNAL_API_URL) {
    console.error('OBSERVATION_URI is not defined');
    process.exit(1);
  }

  // Health check (ideally this is done at the infrastructure level)
  // const healthCheck = await axios.get('http://localhost:3000/health');
  const healty = await checkHealth(
    MAIN_INTERNAL_API_URL + '/health',
    MAX_HEALTH_CHECK_ATTEMPTS,
    HEALTH_CHECK_DELAY_MS
  );


  // Fetch data from external API, process and send to main-app
  // Iterate for MAX_MESSAGES times
  // In a real-world scenario, this would be an infinite loop
  // or a queue consumer
  for (let i = 0; i < MAX_MESSAGES; i++) {
    console.log("Fetched observation:", i);

    try {
      const data = await fetchData(FETCH_PATIENT_API_URL);
      await processMessage(data, MAIN_INTERNAL_API_URL + '/observation');  
    } catch (error) {
      console.error('Error fetching and processing data:', error);
      // In a real-world scenario, we would handle this error
      // and retry fetching or processing the data.
      // Worst case, we should put the message into a Dead-Letter-Queue.
    }
  }
  
  process.exit(0);
}

main();