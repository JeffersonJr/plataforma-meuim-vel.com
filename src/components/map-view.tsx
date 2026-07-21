import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import type { Property } from "@/lib/mock-data";

type Props = {
  properties: Property[];
  selected: string | null;
  onSelect: (id: string | null) => void;
};

// Group properties into neighborhood clusters for Quinto Andar-style display
function buildClusters(properties: Property[]) {
  const map = new Map<string, { lat: number; lng: number; ids: string[]; label: string }>();
  properties.forEach((p) => {
    const key = p.neighborhood;
    if (!map.has(key)) {
      map.set(key, { lat: p.lat, lng: p.lng, ids: [], label: p.neighborhood });
    }
    map.get(key)!.ids.push(p.id);
  });
  return [...map.values()];
}

export function MapView({ properties, selected, onSelect }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markersRef = useRef<Map<string, any>>(new Map());

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;
    if (mapRef.current) return;

    import("leaflet").then((L) => {
      if (!containerRef.current || mapRef.current) return;

      const map = L.map(containerRef.current, {
        center: [-23.55, -46.633],
        zoom: 11,
        zoomControl: false,
        attributionControl: true,
      });

      L.control.zoom({ position: "bottomright" }).addTo(map);

      // Quinto Andar uses a light, clean map tile — CartoDB Positron is perfect
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
        {
          attribution:
            '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> © <a href="https://carto.com/">CARTO</a>',
          subdomains: "abcd",
          maxZoom: 19,
        },
      ).addTo(map);

      mapRef.current = map;

      // Build clusters
      const clusters = buildClusters(properties);

      clusters.forEach((cluster) => {
        const count = cluster.ids.length;
        const isSelected = cluster.ids.some((id) => id === selected);

        const size = count > 50 ? 56 : count > 20 ? 52 : count > 10 ? 48 : 44;

        const icon = L.divIcon({
          html: `
            <div class="cluster-pin" data-ids="${cluster.ids.join(",")}" style="width:${size}px;height:${size}px">
              <span class="cluster-count">${count}</span>
            </div>
          `,
          className: "",
          iconAnchor: [size / 2, size / 2],
          iconSize: [size, size],
        });

        const marker = L.marker([cluster.lat, cluster.lng], { icon })
          .addTo(map)
          .on("click", () => {
            // Select first property in cluster
            const firstId = cluster.ids[0];
            onSelect(firstId);
          });

        cluster.ids.forEach((id) => {
          markersRef.current.set(id, marker);
        });
      });

      // Add "Desenhar área de busca" button like Quinto Andar
      const DrawControl = L.Control.extend({
        options: { position: "bottomleft" },
        onAdd() {
          const btn = L.DomUtil.create("button", "");
          btn.innerHTML = `
            <div style="display:flex;align-items:center;gap:8px;background:white;border:none;border-radius:24px;padding:10px 20px;font-size:14px;font-weight:600;color:#111827;cursor:pointer;box-shadow:0 2px 12px rgba(0,0,0,0.15);">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M3 12 Q6 3 12 3 Q18 3 21 12 Q18 21 12 21 Q6 21 3 12Z"/><circle cx="12" cy="12" r="2"/></svg>
              Desenhar área de busca
            </div>
          `;
          btn.style.background = "none";
          btn.style.border = "none";
          btn.style.cursor = "pointer";
          return btn;
        },
      });
      new DrawControl().addTo(map);

      // Force recalculation to fix grey empty map bug in flex layouts
      setTimeout(() => {
        map.invalidateSize();
      }, 250);
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

  // Update selected state on cluster pins
  useEffect(() => {
    markersRef.current.forEach((marker, id) => {
      const el = marker.getElement()?.querySelector(".cluster-pin");
      if (el) {
        if (id === selected) {
          el.classList.add("selected");
        } else {
          el.classList.remove("selected");
        }
      }
    });
  }, [selected]);

  return <div ref={containerRef} className="absolute inset-0 z-0" />;
}
