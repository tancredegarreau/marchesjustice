import Airtable from 'airtable';

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
if (!AIRTABLE_API_KEY) {
  throw new Error("Missing env AIRTABLE_API_KEY");
}

Airtable.configure({
  apiKey: AIRTABLE_API_KEY
});

export { Airtable }
