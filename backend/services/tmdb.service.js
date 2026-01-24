import axios from "axios";
import { ENV_VARS } from "../config/envVars.js";

export const fetchFromTMDB = async (url) => {
    // URL ke aakhir mein API Key add kar rahe hain
    const separator = url.includes('?') ? '&' : '?';
    const finalUrl = `${url}${separator}api_key=${ENV_VARS.TMDB_API_KEY}`;

    const response = await axios.get(finalUrl);

    if (response.status !== 200) {
        throw new Error("Failed to fetch data from TMDB: " + response.statusText);
    }

    return response.data;
};