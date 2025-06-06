import { SuinsClient } from "@mysten/suins"
import { getFullnodeUrl, SuiClient } from "@mysten/sui/client"

const client = new SuiClient({ url: getFullnodeUrl("testnet") })
const suinsClient = new SuinsClient({
  client,
  network: "testnet",
})

export { suinsClient }
