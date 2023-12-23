import * as Airtable from "airtable";
import { AIRTABLE_API_KEY } from "./config";

Airtable.configure({
  apiKey: AIRTABLE_API_KEY,
});

export { Airtable };
