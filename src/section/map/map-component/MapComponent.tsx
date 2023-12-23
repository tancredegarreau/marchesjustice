import * as React from "react";
import { forwardRef, useCallback, useState } from "react";
import styled from "styled-components";
import { MapContainer as LeafletMap, TileLayer } from "react-leaflet";
import "./style.css";
import { Icon } from "leaflet";
import MarkerClusterGroup from "@changey/react-leaflet-markercluster";
import * as moment from "moment";
import "moment/locale/fr";
import { EventMap, MapFilter } from "../../../technical/airtable/events";
import {
  BACKGROUND,
  PRIMARY,
  TEXT_DARK,
  TEXT_LIGHT,
} from "../../../constant/Colors";
import { MapDrawer } from "./drawer/MapDrawer";
import { MapMarker } from "./MapMarker";

moment.locale("fr");

const MapContainer = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  user-select: none;
`;

const Filters = styled.div`
  position: absolute;
  top: 92px;
  left: 10px;
  display: flex;
  gap: 8px;
  flex-direction: column;
  z-index: 999;
`;

const FilterButton = styled.span<{ selected: boolean }>`
  font-size: 12px;
  font-weight: bold;
  border-radius: 12px;
  padding: 4px 8px;
  cursor: pointer;
  max-width: fit-content;

  ${({ selected }) =>
    selected
      ? `
    background: ${PRIMARY};
    color: ${TEXT_DARK};
  `
      : `
    background: ${BACKGROUND};
    color: ${TEXT_LIGHT};
  `}
`;

interface Cluster {
  getChildCount: () => number;
}

const createClusterCustomIcon = (cluster: Cluster) =>
  new Icon({
    iconUrl: require("../../../assets/images/marker_multiple3.svg").default,
    iconRetinaUrl: require("../../../assets/images/marker_multiple3.svg")
      .default,
    iconSize: [40, 50],
    iconAnchor: [20, 50],
  });

export interface Props {
  filters: MapFilter[];
  events: EventMap[];
  activeFilter?: MapFilter["id"];
  setActiveFilter: (filter: MapFilter["id"]) => unknown;
}

export const MapComponent = forwardRef<typeof LeafletMap, Props>(
  ({ events, filters, activeFilter, setActiveFilter }, ref) => {
    const [showDrawer, setShowDrawer] = useState(false);
    const [drawerData, setDrawerData] = useState<EventMap["data"]>();
    const closeDrawer = useCallback(
      () => setShowDrawer(false),
      [setShowDrawer]
    );
    const openDrawer = useCallback(
      (data: EventMap["data"]) => {
        setDrawerData(data);
        setShowDrawer(true);
      },
      [setDrawerData, setShowDrawer]
    );

    return (
      <>
        <MapContainer>
          <LeafletMap
            ref={ref}
            center={[46.698481, 2.549047]}
            zoom={5}
            minZoom={4}
            scrollWheelZoom={false}
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
              subdomains="abcd"
            />
            <MarkerClusterGroup
              maxClusterRadius={30}
              iconCreateFunction={createClusterCustomIcon}
              showCoverageOnHover={false}
            >
              {events.map((marker) => (
                <MapMarker
                  key={marker.id}
                  position={marker.position}
                  eventHandlers={{
                    click: () => openDrawer(marker.data),
                  }}
                  colorHex={marker.data.color ?? PRIMARY}
                />
              ))}
            </MarkerClusterGroup>
          </LeafletMap>

          {filters.length > 1 && (
            <Filters>
              {filters.map((filter) => (
                <FilterButton
                  key={filter.id}
                  selected={filter.id === activeFilter}
                  onClick={() => setActiveFilter(filter.id)}
                >
                  {filter.name}
                </FilterButton>
              ))}
            </Filters>
          )}
        </MapContainer>
        {drawerData && (
          <MapDrawer
            open={showDrawer}
            onClose={closeDrawer}
            data={drawerData}
          />
        )}
      </>
    );
  }
);
