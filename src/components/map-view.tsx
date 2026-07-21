import { useEffect, useRef } from "react";
import type { Property } from "@/lib/mock-data";
import { formatBRL } from "@/lib/mock-data";

type Props = {
  properties: Property[];
  selected: string | null;
  onSelect: (id: string | null) => void;
};

declare global {
  // Leaflet types available via @types/leaflet
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interface Window { L: any }
}

export function MapView({ properties, selected, onSelect }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markersRef = useRef<Map<string, any>>(new Map());

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;
    if (mapRef.current) return; // already initialized

    // Dynamically import leaflet to avoid SSR issues
    import("leaflet").then((L) => {
      if (!containerRef.current || mapRef.current) return;

      const map = L.map(containerRef.current, {
        center: [-23.55, -46.633],
        zoom: 11,
        zoomControl: false,
      });

      L.control.zoom({ position: "bottomright" }).addTo(map);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      mapRef.current = map;

      // Add markers
      properties.forEach((p) => {
        const icon = L.divIcon({
          html: `<div class="price-pin">${formatShort(p.price)}</div>`,
          className: "",
          iconAnchor: [30, 16],
        });

        const marker = L.marker([p.lat, p.lng], { icon })
          .addTo(map)
          .on("click", () => onSelect(p.id))
          .on("mouseover", () => onSelect(p.id));

        markersRef.current.set(p.id, marker);
      });
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        markersRef.current.clear();
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update marker active state
  useEffect(() => {
    markersRef.current.forEach((marker, id) => {
      const el = marker.getElement()?.querySelector(".price-pin");
      if (el) {
        if (id === selected) {
          el.classList.add("active");
        } else {
          el.classList.remove("active");
        }
      }
    });
  }, [selected]);

  return <div ref={containerRef} className="h-full w-full" />;
}

function formatShort(n: number) {
  if (n >= 1_000_000) return `R$ ${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1000) return `R$ ${Math.round(n / 1000)}k`;
  return `R$ ${n}`;
}
