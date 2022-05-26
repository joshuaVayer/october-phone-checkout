import RechercheEntreprise from "../services/RechercheEntreprise";

/**
 * Will first check the registration number using a RegexPattern then will query the official API.
 * @param {string} registrationNumber - The registration number of the company.
 * @returns {Promise<boolean>} - The result of the query.
 */
export const isValidRegistrationNumber = async (registrationNumber: string): Promise<boolean> => {
  const matchRegex = /(\d{9}|\d{3}[ ]\d{3}[ ]\d{3})/g.test(registrationNumber);
  if (!matchRegex) return false;

  // Check using the official french API
  const checkViaApi = await RechercheEntreprise.byRegistrationNumber(registrationNumber)
    .then(({ data }) => {
      console.log(data.total_results === 1);

      if (data && data.total_results) return data.total_results === 1;
      else return false;
    })
    .catch(() => false);

  return checkViaApi;
};
