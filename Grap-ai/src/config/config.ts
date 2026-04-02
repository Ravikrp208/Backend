import { MistralAI } from '@langchain/mistralai';
import dotenv from 'dotenv';

dotenv.config();

export const config = {
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY || '',
    MistralAI_API_KEY: process.env.MISTRALAI_API_KEY || '', 
    CHERE_API_KEY: process.env.CHERE_API_KEY || '',     


}
export default config;
  
