import { Request } from "express";

export interface SearchRequest extends Request {
  query: {
    company: string;
    registrationNumber: string;
    location?: string;
    providers: {
      google?: {
        knowledge_graph?: {
          téléphone?: string;
        };
      };
    };
  },
}

export interface SerpApiGoogleAnswer {
  knowledge_graph?: {
    title?: string;
    téléphone?: string;
  };
}
