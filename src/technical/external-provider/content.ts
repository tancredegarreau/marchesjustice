import { createContext, useContext } from "react";
import { Signer } from "../airtable/signers";
import { EventMap, MapFilter } from "../airtable/events";

export interface ExternalData {
  signers: Signer[];
  filters: MapFilter[];
  events: Record<string, EventMap[]>;
  activeFilter?: MapFilter["id"];
  setActiveFilter: (view: MapFilter["id"]) => Promise<void>;
}

export const initialState: ExternalData = {
  signers: [],
  filters: [],
  events: {},
  setActiveFilter: () => {
    throw new Error("ExternalContext is not initialized");
  },
};

export const ExternalContext = createContext<ExternalData>(initialState);

export const useExternal = () => useContext(ExternalContext);
