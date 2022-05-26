import { Request } from "express";

export interface SearchRequest extends Request {
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

export interface SearchResultByRegistrationNumber {
  success: boolean;
  result?: {
    phones?: object[];
  };
  status?: string;
  error_provider?: string;
}
