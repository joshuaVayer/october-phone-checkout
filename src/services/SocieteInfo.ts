import "dotenv/config";
import axios from "axios";

/**
 * Service relative to the search of companies via the Societe Info API.
 * Documentation: https://societeinfo.com/api-doc/
 */

class SocieteInfo {
  byRegistrationNumber (registrationNumber: string): Promise<any> {
    return axios.get(
      `https://societeinfo.com/app/rest/api/v2/company.json/${registrationNumber}`,
      { params: { key: process.env.SOCIETE_INFO_API_KEY || "DEMO" } }
    )
  }
}

export default new SocieteInfo();
