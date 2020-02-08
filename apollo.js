import { HttpLink } from "apollo-link-http";
require("dotenv").config();

const link = new HttpLink({
  uri: `http://${IP_ADDRESS}:4000`,
});

const options = {
  link,
};

export default options;
