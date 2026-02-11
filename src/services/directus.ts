import { createDirectus, rest } from "@directus/sdk";
const directus = createDirectus(
  `${process.env.NEXT_PUBLIC_BASE_URL!}/api/base`,
).with(rest());

export default directus;
