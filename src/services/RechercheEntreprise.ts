import "dotenv/config";
import axios from "axios";

const BASE_URL = "https://recherche-entreprises.api.gouv.fr"

/**
 * Service relative to the search of companies via the api-recherche-entreprises API.
 * Documentation: https://api.gouv.fr/documentation/api-recherche-entreprises
 */

class RechercheEntreprise {
  /**
   * Search for companies by their registration number.
   * @param registrationNumber The registration number of the company.
   * @returns {Promise<any>}
   */
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

  /**
   * Search for companies by their name and postal code.
   * @param query The name of the company.
   * @param postalCode The postal code of the company.
   * @returns {Promise<any>}
   */
  byQuery (query: string, postalCode?: string): Promise<any> {
    const params: {
      q: string,
      page: number,
      per_page: number,
      code_postal?: string
    } = {
      q: query,
      page: 1,
      per_page: 10
    }
    if (postalCode) params.code_postal = postalCode;

    return axios.get(`${BASE_URL}/search`, { params })
  }
}

export default new RechercheEntreprise();
