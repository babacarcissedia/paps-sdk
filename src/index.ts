import dotenv from 'dotenv'
import { IN_PRODUCTION, PAPS_API_KEY, PAPS_API_URL } from "../config";
import PapsRepository from "./PapsRepository";
dotenv.config()

const repository = new PapsRepository({
  apiKey: PAPS_API_KEY,
  test: !IN_PRODUCTION,
  url: PAPS_API_URL
})

// repository.createDelivery()
// repository.createPickup()
// repository.createPickupAndDelivery()
// repository.createMultipleTasks()
// repository.createTasksWithClientApp()
