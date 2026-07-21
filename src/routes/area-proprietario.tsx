import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/area-proprietario")({
  loader: () => {
    throw redirect({
      to: "/area-meuimovel",
    });
  },
});
