declare module "google-search-results-nodejs" {
  export class GoogleSearch {
    constructor(apiKey: string);
    json(options: any, callback: (err: any, data: any) => void): void;
  }
}
