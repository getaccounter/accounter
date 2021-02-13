import { PORT } from "./env";
import server from "./server";

server.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})