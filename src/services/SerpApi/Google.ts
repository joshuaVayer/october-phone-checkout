import "dotenv/config";
import SerpApi from "google-search-results-nodejs";

const search = new SerpApi.GoogleSearch(process.env.GOOGLE_SEARCH_API_KEY || "");

class SerpApiGoogle {
  lookup ({ q, location }: { q: string, location?: string }): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        search.json(
          {
            q,
            gl: "FR",
            location: location || ""
          },
          resolve
        );
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default new SerpApiGoogle();
