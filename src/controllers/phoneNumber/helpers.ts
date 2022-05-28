import {
  APIOutput,
  SocieteInfoCompanyAnswer,
  RechercheEntrepriseQueryAnswer
} from "../../types/Interfaces";
import SocieteInfo from "../../services/SocieteInfo";
import RechercheEntreprise from "../../services/RechercheEntreprise";

/**
 * Will search for the phone number by the registration number using the SocieteInfo API.
 * @param {string} registrationNumber
 * @returns {Promise<APIOutput>}
 */
export const searchByRegistrationNumber = (registrationNumber: string): Promise<APIOutput> => {
  return new Promise((resolve, reject) => {
    SocieteInfo.byRegistrationNumber(registrationNumber)
      .then(({ data }) => {
        if (data) {
          const answer: SocieteInfoCompanyAnswer = { ...data };
          const phones = answer.result?.contacts?.phones as [{ value: string }];
          resolve({ success: true, result: { phones } });
        } else resolve({ success: false });
      })
      .catch(err => {
        if (err.response) {
          const { status, data = {} }: { status: number, data: object } = err.response;
          if (status === 400 || status === 404) {
            resolve(
              {
                success: false,
                status: "unauthorized",
                error_provider: "SocieteInfo",
                ...data
              });
          } else reject(err);
        }
      })
  });
};

/**
 * Will first look for the registration number in the RechercheEntreprise API, then will look for the phone number in the SocieteInfo API.
 * @param query - The query to search for, the company name or the registration number.
 * @param postalCode - the postal code of the company
 * @returns {Promise<APIOutput>}
 */
export const searchByQuery = (query: string, postalCode?: string): Promise<APIOutput> => {
  return new Promise((resolve, reject) => {
    RechercheEntreprise.byQuery(query, postalCode)
      .then(({ data }) => {
        if (data) {
          const { total_results: totalResults, results }: RechercheEntrepriseQueryAnswer = data;
          if (totalResults === 0) resolve({ success: false });
          else if (totalResults === 1 && results && results[0].siren) {
            const { siren } = results[0];
            searchByRegistrationNumber(siren)
              .then(resolve)
              .catch(reject);
          } else if (totalResults > 1) {
            resolve({ success: false, status: "multiple_results", result: { hits: results } });
          }
        } else resolve({ success: false });
      })
      .catch(err => {
        if (err.response) {
          const { status, data = {} }: { status: number, data: object } = err.response;
          if (status === 400 || status === 404) {
            resolve(
              {
                success: false,
                status: "unauthorized",
                error_provider: "RechercheEntreprise",
                ...data
              });
          } else reject(err);
        }
      })
  });
};
