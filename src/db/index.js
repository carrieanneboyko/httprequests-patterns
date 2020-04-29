import Datastore from "nedb";
import path from "path";

const jeopardy = new Datastore({
  filename: path.resolve(__dirname, "../../data/jeopardy.db"),
  autoload: true,
});

const test = new Datastore({
  filename: path.resolve(__dirname, "../../data/test.db"),
  autoload: true,
});

export default { jeopardy, test };
