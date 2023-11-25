import { Airtable } from './Airtable';

export interface Signer {
  id: string;
  name: string;
  comment: string;
  category: string;
}

function fetchSignersView() {
  return Airtable.base("appLHMr3i9YOUvrTX")("tbl0KX4UNgfVGDhB3").select({
    view: "viworFnUfDXUlmBm5",
  });
}

export function fetchSigners() {
  return new Promise<Signer[]>((resolve, reject) => {
    const signers: Signer[] = [];
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
    );
  });
}
