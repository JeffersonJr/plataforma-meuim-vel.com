import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Bath, BedDouble, Car, Heart, MapPin, Ruler, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Property } from "@/lib/mock-data";
import { formatBRL } from "@/lib/mock-data";
import { useFavorites } from "@/lib/favorites";
import { Badge } from "@/components/ui/badge";

export function PropertyCard({ property, className }: { property: Property; className?: string }) {
  const [idx, setIdx] = useState(0);
  const { isFav, toggle } = useFavorites();
  const fav = isFav(property.id);

  const next = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIdx((i) => (i + 1) % property.images.length);
  };
  const prev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIdx((i) => (i - 1 + property.images.length) % property.images.length);
  };

  return (
    <Link
      to="/property/$id"
      params={{ id: property.id }}
      className={cn(
        "group card-hover flex flex-col overflow-hidden rounded-2xl border border-fog bg-white shadow-soft",
        className,
      )}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-secondary">
        <img
          src={property.images[idx]}
          alt={property.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
          <div className="flex flex-wrap gap-1.5">
            {property.tags.slice(0, 2).map((t) => (
              <Badge
                key={t}
                className="border-0 bg-white/95 text-[11px] font-medium text-ink shadow-soft"
              >
                {t === "Tour Virtual" && <Play className="mr-1 h-3 w-3 text-mint" />}
                {t}
              </Badge>
            ))}
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggle(property.id);
            }}
            className="grid h-9 w-9 place-items-center rounded-full bg-white/95 shadow-soft transition hover:scale-110"
            aria-label="Favoritar"
          >
            <Heart
              className={cn("h-4 w-4 transition", fav ? "fill-amber text-amber" : "text-ink")}
            />
          </button>
        </div>
        {property.images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 hidden h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-white/95 shadow-soft group-hover:grid"
              aria-label="Anterior"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 hidden h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-white/95 shadow-soft group-hover:grid"
              aria-label="Próxima"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <div className="absolute inset-x-0 bottom-2 flex justify-center gap-1">
              {property.images.map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    i === idx ? "w-5 bg-white" : "w-1.5 bg-white/60",
                  )}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-brand">{formatBRL(property.price)}</span>
            {property.mode === "rent" && (
              <span className="text-xs text-slate-token">/mês</span>
            )}
          </div>
          {(property.condoFee || property.iptu) && (
            <div className="text-[11px] text-slate-token">
              + Cond. {formatBRL(property.condoFee || 0)}
            </div>
          )}
        </div>
        <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-semibold leading-snug text-ink">
          {property.title}
        </h3>
        <div className="flex items-center gap-1 text-xs text-slate-token">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">
            {property.neighborhood}, {property.city}
          </span>
        </div>
        <div className="mt-auto flex items-center gap-3 border-t border-fog pt-3 text-xs text-slate-token">
          <span className="flex items-center gap-1"><BedDouble className="h-3.5 w-3.5" />{property.bedrooms}</span>
          <span className="flex items-center gap-1"><Bath className="h-3.5 w-3.5" />{property.bathrooms}</span>
          <span className="flex items-center gap-1"><Car className="h-3.5 w-3.5" />{property.parking}</span>
          <span className="ml-auto flex items-center gap-1"><Ruler className="h-3.5 w-3.5" />{property.area} m²</span>
        </div>
      </div>
    </Link>
  );
}
