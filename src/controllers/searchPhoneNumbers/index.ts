import { Response } from "express";
import { SearchRequest } from "../../types/Interfaces";

import { searchByRegistrationNumber } from "./helpers";

// import SerpApiGoogle from "../services/SerpApi/Google";

// --------------
// HELPERS
// --------------
// const hasKnowledgeGraph = (gAnswer: SerpApiGoogleAnswer): boolean =>
//   !!gAnswer.knowledge_graph;

// const handleGoogleResponse = (gAnswer: SerpApiGoogleAnswer, req: SearchRequest): void => {
//   if (hasKnowledgeGraph(gAnswer)) req.query.providers.google = gAnswer;
// };

// --------------
// MAIN
// --------------
const searchPhoneNumbers = async (req: SearchRequest, res: Response) => {
  const { registrationNumber } = req.query;

  try {
    // In case we have a registration number we will only use this info as it is the most accurate
    if (registrationNumber) {
      return searchByRegistrationNumber(registrationNumber)
        .then(result => {
          const { success } = result;
          const jsonRes = {
            status: success ? "success" : "not_found",
            search_strategy: "registration_number",
            ...result
          }
          return res.status(success ? 200 : 400).json(jsonRes);
        }).catch(err => {
          res.status(500).send({ status: "error", message: err.data || err.message });
        });
    }
  } catch (_e) {
    const err = (_e as Error).message;
    return res.status(500).send({ status: "error", message: err });
  }

  res.status(400).send({ status: "not_found", message: "Try providing more details" });
};

export default searchPhoneNumbers;
