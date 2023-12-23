import { Airtable } from "./Airtable";
import {
  AIRTABLE_SIGNERS_BASE,
  AIRTABLE_SIGNERS_TABLE,
  AIRTABLE_SIGNERS_VIEW,
} from "./config";

export interface Signer {
  id: string;
  name: string;
  comment: string;
  category: string;
}

function fetchSignersView() {
  return Airtable.base(AIRTABLE_SIGNERS_BASE)(AIRTABLE_SIGNERS_TABLE).select({
    view: AIRTABLE_SIGNERS_VIEW,
  });
}

export function fetchSigners() {
  return new Promise<Signer[]>((resolve, reject) => {
    const signers: Signer[] = [];
    /*
    fetchSignersView().eachPage(
      (records, fetchNextPage) => {
        signers.push(
          ...records.map(record => ({
            id: record.id,
            name: record.get("Nom de l'organisation"),
            comment: record.get("Commentaires"),
            category: record.get("Nature de l'organisation") || "",
          }))
        );
        fetchNextPage();
      },
      err => {
        if (err) {
          reject(err);
        } else {
          resolve(signers);
        }
      }
    );*/
  });
}
