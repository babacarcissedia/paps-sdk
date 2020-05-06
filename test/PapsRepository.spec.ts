import PapsRepository from "../src/PapsRepository";
const options = {
  apiKey: 'ABC123',
  url: 'https://example.domain',
  test: true
}
let repository

describe('PapsRepository', () => {
  beforeEach(() => {
    repository = new PapsRepository(options)
  })

  describe('getUrl', () => {
  })
  describe('createPickup', () => {
  })
  describe('createDelivery', () => {
  })
  describe('createPickupAndDelivery', () => {
  })
  describe('createMultipleTasks', () => {
  })
  describe('createTasksWithClientApp', () => {
  })
  describe('viewAllTasksDetails', () => {
  })
  describe('viewTask', () => {
  })
  describe('cancelTask', () => {
  })
})

const createPickupUrl = repository.getUrl({ method: 'createPickup' })
expect(createPickupUrl).toEqual(`${options.url}?test=true`)
