import * as faker from 'faker'
import { mock } from "jest-mock-extended";
import Paps, { ICreatePickUpResponse, ICreatePickUpResponseContent, IPackageSize } from "../src/Paps";
import { FIXTURE_CREATE_PICKUP_RESPONSE } from "./__data__/createPickup";
import {
  FIXTURE_GET_QUOTE_FOR_LARGE, FIXTURE_GET_QUOTE_FOR_MEDIUM, FIXTURE_GET_QUOTE_FOR_SMALL, FIXTURE_GET_QUOTE_FOR_XLARGE
} from "./__data__/quotes";
import dotenv from 'dotenv'
dotenv.config()

const PAPS_API_KEY = String(process.env.PAPS_API_KEY)

const options = {
  apiKey: PAPS_API_KEY, url: 'https://api.paps.sn/api/v1/:method', test: true
}
import moment = require("moment");

const now = Date.now()
const DAY = 1000 * 60 * 60 * 24
const randomDatetime = () => faker.date.between(new Date(now + 10 * DAY), new Date(now + 30 * DAY)).toISOString()
const randomDate = () => randomDatetime().split('T')[0]
let paps = new Paps(options)
// let papsMock

describe('PapsRepository', () => {

  // beforeAll(() => {
  //   papsMock = mock<Paps>()
  //   papsMock.createPickup.mockReturnValue(FIXTURE_CREATE_PICKUP_RESPONSE)
  //   // mockReset(repository)
  // })


  describe('getUrl', () => {
    const {test, ...withoutTest} = options
    const paps = new Paps(withoutTest)
    it('should return url with matching method', () => {
      const method = 'some-method'
      const url = paps.getUrl({ method })
      expect(url).toEqual(`https://api.paps.sn/api/v1/some-method?apiKey=${options.apiKey}`)
    })
    it('should return url with matching method with query string', () => {
      const method = 'some-method'
      const url = paps.getUrl({ method, test: true })
      expect(url).toEqual(`https://api.paps.sn/api/v1/some-method?apiKey=${options.apiKey}&test=true`)
    })
    it('should handle multiple query string', () => {
      const method = 'some-method'
      const url = paps.getUrl({ method, test: false, page: 2, apiKey: 'ABC123' })
      expect(url).toEqual('https://api.paps.sn/api/v1/some-method?apiKey=ABC123&page=2&test=false')
    })
  })

  const createRandomPickup = (options = {}): Promise<ICreatePickUpResponse> => {
    return paps.createPickup({
      jobPickupName: 'dieuli samay daleu',
      jobDescription: 'soo deimei beu souniou keur ngeu inddil meu samay plastique',
      jobPickupAddress: 'scat urbam',
      jobPickupDatetime: randomDate(),
      jobPickupPhone: faker.phone.phoneNumber('#########'), ...options
    })
  }
  describe('createPickup', () => {
    it('should create task for requested job', async () => {
      const apiResponse = await createRandomPickup()
      expect(apiResponse.status).toEqual(200)
      const apiResponseData: ICreatePickUpResponseContent = apiResponse.data
      console.log({ apiResponseData })
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

  // TODO
  describe('createDelivery(payload)', () => {
  })

  // TODO
  describe('createPickupAndDelivery(payload)', () => {
  })

  // TODO
  describe('createMultipleTasks(payload)', () => {
  })

  // TODO
  describe('createTasksWithClientApp(payload)', () => {
  })

  // TODO
  describe('viewTasks(payload)', () => {
    it('selectBy=month should return all task of a particular month', async () => {
      // TODO: need a way to remove/cancel previous tasks somehow for this test to be completely isolated
      const date = moment().add('2 days')
      await createRandomPickup({ date: date.format('YYYY-MM-DD') })
      const apiResponseData = await paps.viewTasks({
        date: date.format('YYYY-MM'), selectBy: 'month'
      })
      console.log({ apiResponseData })
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

  // TODO
  describe('viewTask()', () => {
    it('should', async () => {
      const date = moment().add('2 days')
      const pickupResponse = await createRandomPickup({ date: date.format('YYYY-MM-DD') })
      const pickup = pickupResponse.data
      const apiResponseData = await paps.viewTask(pickup.job_id)
      console.log({ apiResponseData })
    })
  })

  // TODO
  describe('cancelTask()', () => {
  })

  describe('getQuotes({ origin, destination, packageSize })', () => {
    const getQuoteForPackage = async ({ packageSize, origin, destination }) => {
      const apiResponse = await paps.getQuotes({ origin, destination, packageSize })
      console.log(JSON.stringify({ apiResponse }, null, 2))
      expect(apiResponse).toHaveProperty('code')
      expect(apiResponse).toHaveProperty('message')
      expect(apiResponse).toHaveProperty('data')
      expect(apiResponse.code).toEqual("200")
      const apiResponseData = apiResponse.data
      expect(apiResponseData).toHaveProperty('legs')
      expect(apiResponseData).toHaveProperty('total_distance')
      expect(apiResponseData).toHaveProperty('quote')
      expect(apiResponseData).toHaveProperty('normal_quote')
      expect(apiResponseData).toHaveProperty('package_size')
      expect(apiResponseData).toHaveProperty('coupon_quote')
      expect(apiResponseData).toHaveProperty('delivery_type')
      expect(apiResponseData.package_size).toEqual(packageSize)
      expect(apiResponseData.legs.length).toBeGreaterThan(0)
      expect(apiResponseData.legs[0]).toHaveProperty('distance')
      expect(apiResponseData.legs[0]).toHaveProperty('duration')
      expect(apiResponseData.legs[0]).toHaveProperty('start_address')
      expect(apiResponseData.legs[0]).toHaveProperty('end_address')
      expect(apiResponseData.legs[0]).toHaveProperty('start_location')
      expect(apiResponseData.legs[0]).toHaveProperty('end_location')
    }
    // const packageSizes: IPackageSize[] = ['small', 'medium', 'large', 'xlarge']
    it('packageSize=small should return quote', async () => {
      // TODO: use mock instead papsMock.getQuotes.mockReturnValue(FIXTURE_GET_QUOTE_FOR_SMALL)
      await getQuoteForPackage({ packageSize: 'small', origin: 'Dakar plateau', destination: 'soumbedioune'})
    })
    it('packageSize=medium should return quote', async () => {
      // TODO: use mock instead papsMock.getQuotes.mockReturnValue(FIXTURE_GET_QUOTE_FOR_MEDIUM)
      await getQuoteForPackage({ packageSize: 'medium', origin: 'Thies', destination: 'louga'})
    })
    it('packageSize=large should return quote', async () => {
      // TODO: use mock instead papsMock.getQuotes.mockReturnValue(FIXTURE_GET_QUOTE_FOR_LARGE)
      await getQuoteForPackage({ packageSize: 'large', origin: 'parcelles unité 11', destination: 'liberté 6'})
    })
    it('packageSize=xlarge should return quote', async () => {
      // TODO: use mock instead papsMock.getQuotes.mockReturnValue(FIXTURE_GET_QUOTE_FOR_XLARGE)
      await getQuoteForPackage({ packageSize: 'xlarge', origin: 'sacre coeur 3', destination: 'liberté 6'})
    })
  })
})
