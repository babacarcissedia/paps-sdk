# Paps API integration
Fully tested API integration of https://paps.sn with typescript

This is an scaffold. Can set you up if you're looking forward to integrate delivery system on your website.

## Usage
```bash
cp sample.env .env
// modify .env to match your credentials at developers.paps.sn
```

```typescript
import dotenv from 'dotenv'
import { IN_PRODUCTION, PAPS_API_KEY, PAPS_API_URL } from "../config";
import PapsRepository from "./PapsRepository";
dotenv.config()

const repository = new PapsRepository({
  apiKey: PAPS_API_KEY,
  test: !IN_PRODUCTION,
  url: PAPS_API_URL
})

repository.createDelivery()
repository.createPickup()
repository.createPickupAndDelivery()
repository.createMultipleTasks()
repository.createTasksWithClientApp()

```

## TODO
- tests: cover all use cases
- get the support team at paps.sn to clarify some API response

# [License](LICENSE)

## Contributors
- <a href="https://babacar-cisse-dia.com" alt="Babacar Cissé DIA">Babacar Cissé DIA</a>

<img alt="Babacar Cissé DIA" src="https://github.com/bcdbuddy.png" width="100" height="100"/>
