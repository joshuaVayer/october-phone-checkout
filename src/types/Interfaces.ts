import { Request } from "express";

export interface RequestWithQuery extends Request {
  query: {
    postalCode?: string;
    companyName?: string;
    registrationNumber?: string;
  },
}

export interface SerpApiGoogleAnswer {
  knowledge_graph?: {
    title?: string;
    téléphone?: string;
  };
}

export interface SocieteInfoCompanyAnswer {
  success: boolean;
  result?: {
    contacts?: {
      phones?: object[];
    };
  };
}
export interface RechercheEntrepriseQueryAnswer {
  total_results: number;
  results?: {
    siren?: string;
  }[];
}
export interface APIOutput {
  success: boolean;
  hint?: string;
  result?: {
    phones?: object[];
    hits?: object[];
  };
  status?: string;
  error_provider?: string;
}
