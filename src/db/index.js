import Datastore from "nedb";
import path from "path";

const data = new Datastore({
  filename: path.resolve(__dirname, "../../data/data.db"),
  autoload: true,
});

const jeopardy = new Datastore({
  filename: path.resolve(__dirname, "../../data/jeopardy.db"),
  autoload: true,
});

const test = new Datastore({
  filename: path.resolve(__dirname, "../../data/test.db"),
  autoload: true,
});

export default { data, jeopardy, test };
