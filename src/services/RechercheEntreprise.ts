import "dotenv/config";
import axios from "axios";

const BASE_URL = "https://recherche-entreprises.api.gouv.fr"

/**
 * Service relative to the search of companies with the api-recherche-entreprises API.
 * Documentation: https://api.gouv.fr/documentation/api-recherche-entreprises
 */

class RechercheEntreprise {
  byRegistrationNumber (registrationNumber: string): Promise<any> {
    return axios.get(
      `${BASE_URL}/search`,
      {
        params:
          {
            q: registrationNumber,
            page: 1,
            per_page: 1
          }
      }
    )
  }
}

export default new RechercheEntreprise();
