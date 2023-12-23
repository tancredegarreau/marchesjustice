if (!process.env.AIRTABLE_API_KEY) {
  throw new Error("Missing env AIRTABLE_API_KEY");
}
export const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;

if (!process.env.AIRTABLE_EVENTS_BASE) {
  throw new Error("Missing env AIRTABLE_EVENTS_BASE");
}
export const AIRTABLE_EVENTS_BASE = process.env.AIRTABLE_EVENTS_BASE;

if (!process.env.AIRTABLE_EVENTS_TABLE) {
  throw new Error("Missing env AIRTABLE_EVENTS_TABLE");
}
export const AIRTABLE_EVENTS_TABLE = process.env.AIRTABLE_EVENTS_TABLE;

if (!process.env.AIRTABLE_SIGNERS_BASE) {
  throw new Error("Missing env AIRTABLE_SIGNERS_BASE");
}
export const AIRTABLE_SIGNERS_BASE = process.env.AIRTABLE_SIGNERS_BASE;

if (!process.env.AIRTABLE_SIGNERS_TABLE) {
  throw new Error("Missing env AIRTABLE_SIGNERS_TABLE");
}
export const AIRTABLE_SIGNERS_TABLE = process.env.AIRTABLE_SIGNERS_TABLE;

if (!process.env.AIRTABLE_SIGNERS_VIEW) {
  throw new Error("Missing env AIRTABLE_SIGNERS_VIEW");
}
export const AIRTABLE_SIGNERS_VIEW = process.env.AIRTABLE_SIGNERS_VIEW;
