import { getServerData } from "@/lib/server-utils";
import { PlayersClient } from "./PlayersClient";

export default async function PlayersPage() {
  const initialData = await getServerData();

  return <PlayersClient initialData={initialData} />;
}
