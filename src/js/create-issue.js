const fs = require("fs");
const file = "resources.json";
const data = JSON.parse(fs.readFileSync(file, "utf8"));

data.push({
  title: "New Resource",
  url: "https://example.com",
  description: "Automatically added"
});

fs.writeFileSync(file, JSON.stringify(data, null, 2));
