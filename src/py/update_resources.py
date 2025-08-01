import json
import requests

data = {"timestamp": "Updated automatically"}

with open("./src/data/resources.json", "w") as f:
    json.dump(data, f, indent=2)
