import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET = (async ({ site }) => {
  const base = new URL(import.meta.env.BASE_URL, site);
  const entries = await getCollection("docs");

  return new Response(
    JSON.stringify(
      {
        base: base.href,
        documents: entries
          .filter(({ id }) => id !== "index")
          .map((entry) => ({
            id: entry.id,
            title: entry.data.title,
            url: new URL(`${entry.id}/`, base).href,
          })),
      },
      null,
      2,
    ),
    {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    },
  );
}) satisfies APIRoute;
