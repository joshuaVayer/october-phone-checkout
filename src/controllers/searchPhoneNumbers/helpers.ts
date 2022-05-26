import SocieteInfo from "../../services/SocieteInfo";
import { SocieteInfoCompanyAnswer, SearchResultByRegistrationNumber } from "../../types/Interfaces";

/**
 * Will search for the phone number by the registration number using the SocieteInfo API.
 * @param {string} registrationNumber
 * @returns {Promise<SearchResultByRegistrationNumber>}
 */
export const searchByRegistrationNumber = (registrationNumber: string): Promise<SearchResultByRegistrationNumber> => {
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
