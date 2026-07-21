import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Bath, BedDouble, Car, Heart, MapPin, Ruler, Play, ChevronLeft, ChevronRight, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Property } from "@/lib/mock-data";
import { formatBRL } from "@/lib/mock-data";
import { useAuth } from "@/lib/auth";
import { Badge } from "@/components/ui/badge";

export function PropertyCard({ property, className }: { property: Property; className?: string }) {
  const [idx, setIdx] = useState(0);
  const { isFavorite, toggleFavorite } = useAuth();
  const fav = isFavorite(property.id);

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
      {/* Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-secondary">
        <img
          src={property.images[idx]}
          alt={property.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Top row */}
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
          <div className="flex flex-wrap gap-1.5">
            {property.virtualTour && (
              <Badge className="border-0 bg-mint/90 text-[10px] font-bold text-white backdrop-blur">
                <Play className="mr-1 h-2.5 w-2.5" /> Tour Virtual
              </Badge>
            )}
            {property.petFriendly && (
              <Badge className="border-0 bg-white/90 text-[10px] font-medium text-ink shadow-soft backdrop-blur">
                🐾 Pet Friendly
              </Badge>
            )}
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFavorite(property.id);
            }}
            className={cn(
              "grid h-9 w-9 place-items-center rounded-full shadow-soft transition hover:scale-110",
              fav ? "bg-brand" : "bg-white/95",
            )}
            aria-label="Favoritar"
          >
            <Heart
              className={cn("h-4 w-4 transition", fav ? "fill-white text-white" : "text-ink")}
            />
          </button>
        </div>

        {/* Image carousel controls */}
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

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2.5 p-4">
        {/* Price */}
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-bold text-brand">{formatBRL(property.price)}</span>
            {property.mode === "rent" && (
              <span className="text-xs text-slate-token">/mês</span>
            )}
          </div>
          {property.condoFee && (
            <div className="text-[11px] text-slate-token">
              + Cond. {formatBRL(property.condoFee)}
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-semibold leading-snug text-ink">
          {property.title}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1 text-xs text-slate-token">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-mint" />
          <span className="truncate">{property.neighborhood}, {property.city}</span>
        </div>

        {/* Verified badge */}
        <div className="flex items-center gap-1 text-[11px] text-mint">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Verificado</span>
        </div>

        {/* Specs */}
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
