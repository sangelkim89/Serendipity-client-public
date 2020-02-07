import { HttpLink } from "apollo-link-http";

const link = new HttpLink({
  uri: "http://localhost:4000",
});

const options = {
  link,
};

export default options;
