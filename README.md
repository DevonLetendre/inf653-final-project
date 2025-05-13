# Node.js REST API for US States

## 📘 Project Overview
A Node.js REST API for U.S. States data built with **Express** and **MongoDB**.  
It serves state-related information like capitals, populations, and fun facts stored in MongoDB,  
combined with core data from a local `statesData.json` file.

---

## 🔗 Deployment Links
- **[HTML Homepage](https://peat-shrub-harmonica.glitch.me)**
- **[API Example - KS Fun Fact](https://peat-shrub-harmonica.glitch.me/states/KS/funfact)**

---

## 📡 API Endpoints

### ✅ GET Requests
| Endpoint                           | Description                                                         |
|-----------------------------------|---------------------------------------------------------------------|
| `/states/`                        | Returns all state data (merged from JSON and MongoDB)              |
| `/states/?contig=true`           | Returns only contiguous states (excluding AK and HI)               |
| `/states/?contig=false`          | Returns only non-contiguous states (AK and HI)                     |
| `/states/:state`                 | Returns all data for the given state code (e.g., `KS`, `NY`)       |
| `/states/:state/funfact`         | Returns a random fun fact for the state                            |
| `/states/:state/capital`         | `{ "state": "Kansas", "capital": "Topeka" }`                        |
| `/states/:state/nickname`        | `{ "state": "Kansas", "nickname": "The Sunflower State" }`         |
| `/states/:state/population`      | `{ "state": "Kansas", "population": "2,913,000" }`                  |
| `/states/:state/admission`       | `{ "state": "Kansas", "admitted": "January 29, 1861" }`            |

### ➕ POST Request
| Endpoint                           | Description                                                         |
|-----------------------------------|---------------------------------------------------------------------|
| `/states/:state/funfact`         | Adds one or more fun facts (array) to the given state in MongoDB   |

### 🔄 PATCH Request
| Endpoint                           | Description                                                         |
|-----------------------------------|---------------------------------------------------------------------|
| `/states/:state/funfact`         | Updates a specific fun fact at a given index                       |

### 🗑️ DELETE Request
| Endpoint                           | Description                                                         |
|-----------------------------------|---------------------------------------------------------------------|
| `/states/:state/funfact`         | Deletes a specific fun fact at a given index                       |

---

## 🧪 Testing
Use [Postman](https://www.postman.com/downloads/), Thunder Client (VS Code extension), or any HTTP client to test endpoints.

---

## 📁 Example POST Body
```json
{
  "funfacts": [
    "Kansas has more wheat than any other state.",
    "The state motto is 'To the Stars Through Difficulties'."
  ]
}
