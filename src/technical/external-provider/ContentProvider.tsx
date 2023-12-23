import * as React from "react";
import { PropsWithChildren, useCallback, useEffect, useState } from "react";
import { ExternalContext, ExternalData, initialState } from "./content";

declare global {
  interface Window {
    __SIGNERS_CACHE__: ExternalData["signers"];
    __FILTERS_CACHE__: ExternalData["filters"];
    __EVENTS_CACHE__: ExternalData["events"];
  }
}

export const ExternalProvider = ({ children }: PropsWithChildren<{}>) => {
  const [signers, setSigners] = useState(
    (typeof window !== "undefined" && window.__SIGNERS_CACHE__) ||
      initialState.signers
  );
  const [filters, setFilters] = useState(
    (typeof window !== "undefined" && window.__FILTERS_CACHE__) ||
      initialState.filters
  );
  const [events, setEvents] = useState(
    (typeof window !== "undefined" && window.__EVENTS_CACHE__) ||
      initialState.events
  );

  const [activeFilter, _setActiveFilter] = useState<string>();
  const setActiveFilter = useCallback(
    async (view: string) => {
      _setActiveFilter(view);

      const Events = await import("../airtable/events");
      const sEvents = await Events.fetchEvents(view);
      setEvents((e) => {
        const state = {
          ...e,
          [view]: sEvents,
        };
        window.__EVENTS_CACHE__ = state;
        return state;
      });
    },
    [_setActiveFilter, setEvents]
  );

  useEffect(() => {
    const fetchSigners = async () => {
      const Signers = await import("../airtable/signers");
      const sSigners = await Signers.fetchSigners();
      setSigners(sSigners);
      window.__SIGNERS_CACHE__ = sSigners;
    };

    const fetchEvents = async () => {
      const Events = await import("../airtable/events");
      const sFilters = await Events.fetchMapFilters();
      setFilters(sFilters);
      window.__FILTERS_CACHE__ = sFilters;

      const all = sFilters[0]?.id;
      if (all) {
        await setActiveFilter(all);
      }
    };

    Promise.all([fetchSigners(), fetchEvents()]);
  }, [setSigners, setEvents, setActiveFilter]);

  return (
    <ExternalContext.Provider
      value={{
        signers,
        events,
        filters,
        activeFilter,
        setActiveFilter,
      }}
    >
      {children}
    </ExternalContext.Provider>
  );
};
