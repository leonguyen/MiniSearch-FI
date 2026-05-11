import express from "express";
import MiniSearch from "minisearch";

const app = express();

const miniSearch = new MiniSearch({
  fields: ["title", "content"],
  storeFields: ["title"]
});

miniSearch.addAll([
  {
    id: 1,
    title: "Hello Fly.io",
    content: "MiniSearch deployment example"
  }
]);

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "MiniSearch running on Fly.io"
  });
});

app.get("/search", (req, res) => {
  const q = req.query.q || "";
  const results = miniSearch.search(q);
  res.json(results);
});

const port = process.env.PORT || 3000;

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on ${port}`);
});