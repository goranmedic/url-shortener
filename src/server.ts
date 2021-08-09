require("dotenv").config();
import { application } from "./application";

application().then((server) => {
  server.listen(process.env.PORT, () => {
    console.info(`Listening at ${process.env.BASE_URL}:${process.env.PORT}`);
  });
});
