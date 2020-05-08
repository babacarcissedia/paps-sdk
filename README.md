[![Coverage Status](https://coveralls.io/repos/github/bcdbuddy/node-paps/badge.svg?branch=master)](https://coveralls.io/github/bcdbuddy/node-paps?branch=master)
![](https://img.shields.io/bundlephobia/min/node-paps?style=plastic)
![Npm](https://img.shields.io/npm/l/node-paps)
![Npm version](https://img.shields.io/npm/v/node-paps)
![Npm downloads](https://img.shields.io/npm/dm/node-paps)
![Tag](https://img.shields.io/github/v/tag/bcdbuddy/node-paps)
![Test](https://img.shields.io/github/workflow/status/bcdbuddy/node-paps/integrate?style=plastic)
![Issues](https://img.shields.io/github/issues/bcdbuddy/node-paps)
![PR](https://img.shields.io/github/issues-pr/bcdbuddy/node-paps)
![License](https://img.shields.io/apm/l/node-paps)

# Paps API integration
Fully tested API integration of https://paps.sn with typescript

Gain some extra time by using this library if you're looking looking forward to integrate delivery system on your website.

## Usage

## Development
```bash
cp sample.env .env
// modify .env to match your credentials at developers.paps.sn

// lint
yarn lint

// build before pushing to make sure everything is working
yarn build

// run the tests
yarn test
```
### NodeJS
```typescript
const Paps = require('node-paps')
const dotenv = require('dotenv')
dotenv.config()
const { NODE_ENV, PAPS_API_KEY, PAPS_API_URL } = process.env
const IN_PRODUCTION = NODE_ENV === 'production'

const paps = new Paps({
  apiKey: PAPS_API_KEY,
  test: !IN_PRODUCTION,
  url: PAPS_API_URL
})
// use as you want
// paps.createPickup({...})
// paps.createPickupAndDelivery({...})
// paps.createDelivery({...})
// paps.viewTask({...})
// paps.viewTasks({...})
```

### Typescript
```typescript
import Paps from 'node-paps'
import dotenv from 'dotenv'
dotenv.config()
const { NODE_ENV, PAPS_API_KEY, PAPS_API_URL } = process.env
const IN_PRODUCTION = NODE_ENV === 'production'

const paps = new Paps({
  apiKey: PAPS_API_KEY,
  test: !IN_PRODUCTION,
  url: PAPS_API_URL
})
// use as you want
// paps.createPickup({...})
// paps.createPickupAndDelivery({...})
// paps.createDelivery({...})
// paps.viewTask({...})
// paps.viewTasks({...})
```

## Documentation
You want some doc ? Read the tests

## TODO
- tests: cover all use cases
- get the support team at paps.sn to clarify some API response
- use mock instead of hitting real endpoint

# [License](LICENSE)

## Contributors
- <a href="https://babacar-cisse-dia.com" alt="Babacar Cissé DIA">Babacar Cissé DIA</a>
[![](https://img.shields.io/twitter/follow/babacarcissedia?style=social)](https://twitter.com/babacarcissedia)

<img alt="Babacar Cissé DIA" src="https://github.com/bcdbuddy.png" width="100" height="100"/>
