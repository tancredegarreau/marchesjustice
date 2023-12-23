import { Airtable } from "./Airtable";
import {
  AIRTABLE_API_KEY,
  AIRTABLE_EVENTS_BASE,
  AIRTABLE_EVENTS_TABLE,
} from "./config";

export interface MapFilter {
  id: string;
  name: string;
}

export interface EventMap {
  id: string;
  position: [number, number];
  data: Partial<{
    title: string;
    subtitle: string;
    date: string;
    address: string;
    description: string;
    postalCode: string;
    color: string;
    socials: Partial<{
      share: string;
      x: string;
      whatsapp: string;
      facebook: string;
      telegram: string;
      messenger: string;
      email: string;
    }>;
  }>;
}

interface View {
  id: string;
  name: string;
}

interface Table {
  id: string;
  views: View[];
}

export async function fetchMapFilters(): Promise<MapFilter[]> {
  const res = await fetch(
    `https://api.airtable.com/v0/meta/bases/${AIRTABLE_EVENTS_BASE}/tables`,
    {
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      },
    }
  );
  const { tables } = (await res.json()) as { tables: Table[] };
  return tables.find(({ id }) => id === AIRTABLE_EVENTS_TABLE)?.views ?? [];
}

function fetchEventsView(view: string) {
  return Airtable.base(AIRTABLE_EVENTS_BASE)(AIRTABLE_EVENTS_TABLE).select({
    view,
  });
}

export function fetchEvents(view: string) {
  return new Promise<EventMap[]>((resolve, reject) => {
    const events: EventMap[] = [];
    fetchEventsView(view).eachPage(
      (records, fetchNextPage) => {
        events.push(
          ...records
            .map((record) => {
              const position = [
                parseFloat(record.get("Latitude")),
                parseFloat(record.get("Longitude")),
              ] as [number, number];

              if (position.some((p) => isNaN(p))) {
                console.warn(
                  `${record.get(
                    "Ville"
                  )} as some invalid position: [${record.get(
                    "Latitude"
                  )}, ${record.get("Longitude")}]`
                );
                return null;
              }

              return {
                id: record.id,
                position,
                data: {
                  title: record.get("Titre"),
                  subtitle: record.get("Sous-titre"),
                  date: record.get("Date"),
                  address: record.get("Adresse"),
                  description: record.get("Infos"),
                  postalCode: record.get("Code postal"),
                  color: record.get("Couleur carto"),
                  socials: {
                    share: record.get("URL_share"),
                    x: record.get("URL_x"),
                    whatsapp: record.get("URL_whatsapp"),
                    facebook: record.get("URL_facebook"),
                    telegram: record.get("URL_telegram"),
                    messenger: record.get("URL_messenger"),
                    email: record.get("URL_email"),
                  },
                },
              };
            })
            .filter((r) => !!r)
        );
        fetchNextPage();
      },
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(events);
        }
      }
    );
  });
}
