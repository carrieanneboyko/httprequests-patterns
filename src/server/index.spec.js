import axios from "axios"; // we'll learn more about Axios later.
import launchServer from "./index";
import db from "../db/index";
import {dbService} from '../db/jeopardy/index';
import mockData from "../mockdata/categories_clues";
import dotenv from "dotenv";
import path from 'path';
dotenv.config({ path: path.join(__dirname, "../../.env") });

const TEST_URL = "http://localhost";
const TEST_PORT = process.env.TEST_PORT;
const server = launchServer(TEST_PORT);
const testDb = dbService(db.test);


process.on("uncaughtException", (...stuff) => {
  console.warn("Uncaught exception!");
  server.close();
  console.log(`closing server because of ${JSON.stringify(stuff)}`);
});

describe("/src/server/index.js", () => {
  beforeAll(async () => {
    testDb.drop();
    return;
  });
  afterAll(() => {
    // we returned the server object from launchServer so that we can close it;
    testDb.drop();
    server.close();
    return;
  });
  // Let's test our endpoints
  describe("get /hello-world", () => {
    it("gets hello world", async () => {
      const result = await axios.get(`${TEST_URL}:${TEST_PORT}/hello-world`);
      expect(result.data).toBe("Hello World!");
    });
  });
  describe("post /hello-world", () => {
    it("posts hello world", async () => {
      const result = await axios.post(`${TEST_URL}:${TEST_PORT}/hello-world`);
      expect(result.data).toBe("Hello World From Post!");
    });
  });
  describe("get /jeopardy/:identifier", () => {
    it("gets a category from jeopardy", async () => {
      // This WILL access db.jeopardy, not db.test
      const firstDip = await axios.get(
        `${TEST_URL}:${TEST_PORT}/jeopardy/11512`,
        { params: { test: true } }
      );
      expect(firstDip.data).toEqual({
        ...mockData[0],
        cache: "miss",
        _id: firstDip.data._id,
      });
    });
    it("grabs from the cache on a second dip.", async () => {
      // This WILL access db.jeopardy, not db.test
      const secondDip = await axios.get(
        `${TEST_URL}:${TEST_PORT}/jeopardy/11512`,
        { params: { test: true } }
      );
      expect(secondDip.data).toEqual({
        ...mockData[0],
        cache: undefined,
        _id: secondDip.data._id,
      });
    });
  });
});
