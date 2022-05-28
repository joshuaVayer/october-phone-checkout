import { Response } from "express";
import { RequestWithQuery, APIOutput } from "../../types/Interfaces";
import { searchByRegistrationNumber, searchByQuery } from "./helpers";

// --------------
// MAIN
// --------------
const searchPhoneNumbers = (req: RequestWithQuery, res: Response) => {
  const { registrationNumber, companyName, postalCode } = req.query;

  try {
    // In case we have a registration number we will only use this info as it is the most accurate
    if (registrationNumber) {
      return searchByRegistrationNumber(registrationNumber)
        .then(result => {
          const { success }: APIOutput = result;
          const jsonRes = {
            status: success ? "success" : "not_found",
            search_strategy: "registration_number",
            ...result
          }
          return res.status(success ? 200 : 400).json(jsonRes);
        }).catch(err => {
          return res.status(500).send({ status: "error", message: err.data || err.message });
        });
    } else if (companyName) {
      // Company name search will first try to retrieve the registration number from the RechercheEntreprise API,
      // then will use the SocieteInfo API to get the phone number.
      return searchByQuery(companyName, postalCode)
        .then(result => {
          const { success } = result;
          let jsonRes: APIOutput = { success };

          // We want the hint property to be at the top of the response and not under the hits list.
          if (result.status === "multiple_results" && !postalCode) {
            jsonRes.hint = "Try adding a postal code to your query with the `postalCode` parameter";
          }
          jsonRes = Object.assign(jsonRes, {
            status: success ? "success" : "not_found",
            search_strategy: `company_name${postalCode ? "_&_postal_code" : ""}`,
            ...result
          });

          return res.status(success ? 200 : 400).json(jsonRes);
        }).catch(err => {
          return res.status(500).send({ status: "error", message: err.data || err.message });
        });
    }
  } catch (_e) {
    const err = (_e as Error).message;
    return res.status(500).send({ status: "error", message: err });
  }

  res.status(400).send({ status: "error", message: "No minimum requirements found" });
};

export default searchPhoneNumbers;
