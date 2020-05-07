//
import * as faker from 'faker'
import PapsRepository, { ICreatePickUpResponse, ICreatePickUpResponseContent } from "../src/PapsRepository";

const options = {
  apiKey: 'uq3n4a8n89ixk71ugwbcezfwn4ev9y6f33v2lguwn18mogf8jqis', url: 'https://api.paps.sn/api/v1/:method', test: true
}
import moment = require("moment");

const now = Date.now()
const DAY = 1000 * 60 * 60 * 24
const randomDatetime = () => faker.date.between(new Date(now + 10 * DAY), new Date(now + 30 * DAY)).toISOString()
const randomDate = () => randomDatetime().split('T')[0]
const repository = new PapsRepository(options)

describe('PapsRepository', () => {

  describe('getUrl', () => {
    it('should return url with matching method', () => {
      const method = 'some-method'
      const url = repository.getUrl({ method })
      expect(url).toEqual(`https://api.paps.sn/api/v1/some-method?apiKey=${options.apiKey}`)
    })
    it('should return url with matching method with query string', () => {
      const method = 'some-method'
      const url = repository.getUrl({ method, test: true })
      expect(url).toEqual(`https://api.paps.sn/api/v1/some-method?apiKey=${options.apiKey}&test=true`)
    })
    it('should handle multiple query string', () => {
      const method = 'some-method'
      const url = repository.getUrl({ method, test: false, page: 2, apiKey: 'ABC123' })
      expect(url).toEqual('https://api.paps.sn/api/v1/some-method?apiKey=ABC123&page=2&test=false')
    })
  })

  const createRandomPickup = (options = {}) => {
    return repository.createPickup({
      jobPickupName: 'dieuli samay daleu',
      jobDescription: 'soo deimei beu souniou keur ngeu inddil meu samay plastique',
      jobPickupAddress: 'souniou keur',
      jobPickupDatetime: randomDate(),
      jobPickupPhone: faker.phone.phoneNumber('#########'), ...options
    })
  }
  describe('createPickup', () => {
    it('should create task for requested job', async () => {
      const apiResponse: ICreatePickUpResponse = await createRandomPickup()
      expect(apiResponse.status).toEqual(200)
      const apiResponseData: ICreatePickUpResponseContent = apiResponse.data
      expect(apiResponseData).toHaveProperty('job_id')
      expect(apiResponseData).toHaveProperty('job_hash')
      expect(apiResponseData).toHaveProperty('job_pickup_name')
      expect(apiResponseData).toHaveProperty('job_pickup_address')
      expect(apiResponseData).toHaveProperty('job_token')
      expect(apiResponseData).toHaveProperty('tracking_link')
      expect(apiResponseData).toHaveProperty('order_id')
      expect(apiResponseData).toHaveProperty('pickupOrderId')
      expect(apiResponseData).toHaveProperty('pickupAddressNotFound')
      expect(apiResponseData).toHaveProperty('deliveryAddressNotFound')
    })
  })

  describe('createDelivery(payload)', () => {
  })
  describe('createPickupAndDelivery(payload)', () => {
  })
  describe('createMultipleTasks(payload)', () => {
  })
  describe('createTasksWithClientApp(payload)', () => {
  })
  describe('viewAllTasksDetails(payload)', () => {
    it('selectBy=month should return all task of a particular month', async () => {
      // TODO: need a way to remove/cancel previous tasks somehow for this test to be completely isolated
      const date = moment().add('2 days')
      await createRandomPickup({ date: date.format('YYYY-MM-DD') })
      const apiResponseData = await repository.viewAllTasksDetails({
        date: date.format('YYYY-MM'), selectBy: 'month'
      })
      expect(apiResponseData.length).toEqual(2)
        for (const result of apiResponseData) {
          expect(result).toHaveProperty('job_amount_to_receive')
          expect(result).toHaveProperty('job_package_type')
          expect(result).toHaveProperty('job_rate')
          expect(result).toHaveProperty('creation_datetime')
          expect(result).toHaveProperty('completed_datetime')
          expect(result).toHaveProperty('customer_username')
          expect(result).toHaveProperty('job_description')
          expect(result).toHaveProperty('job_pickup_address')
          expect(result).toHaveProperty('job_address')
          expect(result).toHaveProperty('job_pickup_name')
          expect(result).toHaveProperty('job_state')
          expect(result).toHaveProperty('job_status')
          expect(result).toHaveProperty('job_hash')
          expect(result).toHaveProperty('job_token')
          expect(result).toHaveProperty('fleet_name')
          expect(result).toHaveProperty('job_type')
          expect(result).toHaveProperty('job_amount_received')
          expect(result).toHaveProperty('job_comment')
          expect(result).toHaveProperty('job_id')
          expect(result).toHaveProperty('order_id')
          expect(result).toHaveProperty('job_date_utc')
          expect(result).toHaveProperty('last_updated_at')
        }
    })
  })
  describe('viewTask', () => {
  })
  describe('cancelTask', () => {
  })
})
