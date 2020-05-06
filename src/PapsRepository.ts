import axios from 'axios'
import { PAPS_API_KEY, PAPS_API_CODE, PAPS_API_URL } from "@/config";
import { URLSearchParams } from "url";

export enum PapsOrderStatus {
  ASSIGNED=0,
  STARTED=1,
  SUCCESSFUL=2,
  FAILED=3,
  IN_PROGRESS=4,
  ACCEPTED=7,
  UNASSIGNED=6,
  DECLINED=8,
  CANCELLED=9,
  DELETED=1,
}

export const PAPS_MESSAGES = {
  [PapsOrderStatus.ASSIGNED]: `La tâche a été confiée à un agent.`,
  [PapsOrderStatus.STARTED]: `La tâche a été démarré et l'agent est sur le chemin.`,
  [PapsOrderStatus.SUCCESSFUL]: `La tâche a été achevée avec succès.`,
  [PapsOrderStatus.FAILED]: `La tâche a été soldée par un échec.`,
  [PapsOrderStatus.IN_PROGRESS]: `La tâche est en cours d'exécution et l'agent a atteint la destination.`,
  [PapsOrderStatus.ACCEPTED]: `La tâche a été acceptée par l'agent qui lui est attribué.`,
  [PapsOrderStatus.UNASSIGNED]: `La tâche n'a pas été affecté à un agent.`,
  [PapsOrderStatus.DECLINED]: `La tâche a été refusée par l'agent qui lui est attribué.`,
  [PapsOrderStatus.CANCELLED]: `La tâche a été annulée par l'agent qui est accepté par lui.`,
  [PapsOrderStatus.DELETED]: `	Lorsque la tâche est supprimée de notre système d'informations`,
}

export type IJobVehicleType = 'Scooter' | 'Minivan' | 'Van' | 'Camion'

export interface ICreatePickUpRequest {
  jobPickupName: string, // Nom du contact chez qui le ramassage doit être effectué
  jobPickupPhone: string, // PhoneNumber: Numéro de téléphone du contact de la personne chez qui le ramassage doit être effectué
  jobPickupAddress: string, // Geoplace Adresse du contact chez qui le ramassage doit être effectué
  jobPickupDatetime: string, // Heure/date à laquelle la course doit être prise en charge
  jobDescription: string, // Description de la commande pour une meilleure prise en charge
  jobVehicleType?: IJobVehicleType // Type de véhicule sélectionné pour effectuer le pickup
}

export interface ICreatePickUpResponse {}

export type IJobPackageType = 'S' | 'M' | 'L' | 'XL'

export interface ICreateDeliveryRequest {
  customerUsername: string, // Nom du contact chez qui la livraison doit être effectuée
  customerPhone: string, // type=PhoneNumber	Numéro de téléphone du contact de la personne chez qui la livraison doit être effectuée
  jobPickupPhone: string, // type=PhoneNumber	Numéro de téléphone du contact de la personne chez qui le ramassage a été déjà effectué
  customerAddress: string, //	type=Geoplace	Adresse du contact chez qui la livraison doit être effectuée
  jobDeliveryDatetime: string, // type=Datetime	Heure/date à laquelle la course doit être prise en charge
  jobDescription: string,	// Description de la commande pour une meilleure prise en charge
  jobPackageType?: IJobPackageType, // (optionnel)	One of "S" | "M" | "L" | "XL"	Type de colis à livrer: S correspond à max 5kg et transportable en scooter, M à max 30 kg et transportable en Mini Van, L à max 60 kg et transportable en Van et XL à max 100kg et transportable en Van
  jobAmountToReceive?: string // (optionnel)	Number	Montant (cash) à collecter auprès du destinataire du colis
}

export interface IPapsResponse<T> {
  message: string, // "The task has been created.",
  status: number, // 200,
  data: T
}

export interface ITaskResponseContent {
  fleet_id: number, // 12201,
  fleet_name: string, // "Bassène",
  fleet_latitude: number // 14.71723,
}
export interface ITaskResponse extends IPapsResponse<ITaskResponseContent> {

}

export interface ICreateDeliveryResponseContent {
  "job_id": string, // 22726428,
  "job_hash": string, // "26a453fdc6dd79eda5a0fb994a16614f",
  "customer_address": string, // "Ouest Foire, Dakar, Sénégal",
  "job_token": string, // "2272642815403757852833068",
  "tracking_link": string, // "https://k7ggd.app.goo.gl/SGP49G",
  "pickupAddressNotFound": boolean, // false,
  "deliveryAddressNotFound": boolean, // false
}

export interface ICreateDeliveryResponse extends IPapsResponse<ICreateDeliveryResponseContent>{
}

export interface ICreatePickupAndDeliveryRequest {
  jobPickupAddress: string, //	type=Geoplace	Nom du contact chez qui le ramassage doit être effectué
  jobPickupPhone: string, //	type=PhoneNumber	Numéro de téléphone de l'expediteur
  customerPhone: string, //	type=PhoneNumber	Numéro de téléphone du destinataire
  jobPickupDatetime: string, //	type=Datetime	Heure/date à laquelle la course doit être prise en charge
  jobDeliveryDatetime: string, //	type=Datetime	Heure/date à laquelle la course est terminée
  customerAddress: string, //	type=Geoplace	Adresse du destinataire
  customerUsername: string, //	type=String	Nom du destinataire
  jobVehicleType?: IJobVehicleType, // Type de véhicule sélectionné pour effectuer le pickup
  jobPackageType?: IJobPackageType, // Type de colis à livrer: S correspond à max 5kg et transportable en scooter, M à max 30 kg et transportable en Mini Van, L à max 60 kg et transportable en Van et XL à max 100kg et transportable en Van
  jobAmountToReceive?: number // type=Number Montant (cash) à collecter auprès du destinataire du colis
}

export interface ICreatePickupAndDeliveryResponse {

}

/**
 * Tableau d'objet de pickups. Chaque objet contient les informations d'un pickup (ramassage)
 */
export interface IPickup {
  address: string, //	type=Geoplace	Adresse du pickup
  time: string, //	type=Datetime	Date et heure à laquelle le pickup doit être fait
  phone: string, //	type=PhoneNumber	Numéro de téléphone de la personne à contacter pour le pickup
  name: string, //	type=String	Nom du contact chez qui le pickup doit être effectué
  job_description: string, //	type=String	Description du colis à ramasser
  email: string, //	type=String	Email de la personne pour le pickup
}

/**
 * Tableau d'objet de delivery. Chaque objet contient les informations d'un delivery (livraison)
 */
export interface IDelivery {
  address: string, // type=Geoplace	Adresse du delivery
  time: string, // type=Datetime	Date et heure à laquelle le delivery doit être fait
  phone: string, // type=PhoneNumber	Numéro de téléphone de la personne à contacter pour le delivery
  name: string, // type=String	Nom du contact chez qui le delivery doit être effectué
  job_description: string, // type=String	Description du colis à ramasser
  email: string, // type=String	Email de la personne pour le delivery
}

export interface ICreateMultipleTasksRequest {
  pickups: IPickup[],
  deliveries: IDelivery[]
}

export interface ICreateTasksWithClientAppRequest extends ICreateMultipleTasksRequest{
  email: string // type=String	Email du compte qui a accès à l'application client Monespace
}

export interface ICreateMultipleTasksResponseContent {
  deliveries: ICreateDeliveryResponse[],
  pickups: ICreatePickUpResponse[],
}
export interface ICreateMultipleTasksResponse extends IPapsResponse<ICreateMultipleTasksResponseContent>{
}

export interface IPapsRepositoryOptions {
  url: string,
  apiKey: string,
  test?: boolean
}

const headers = {
  'content-type': 'application/json',
  'accept': 'application/json',
}

export default class PapsRepository {
  private readonly options: any;
  constructor (options: IPapsRepositoryOptions) {
    const defaultOptions = {
      apiKey: '',
      test: true
    }
    this.options = Object.assign({}, defaultOptions, options)
  }

  getUrl (options) {
    const { method, ...queries } = options
    const { apiKey, ...rootQueries } = this.options
    const url = PAPS_API_URL
      .replace(':method', method)
      .replace(':apiKey', apiKey)
    const urlSearchParams = new URLSearchParams(url)
    const allQueries = Object.assign({}, rootQueries, queries)
    Object.keys(allQueries).forEach(key => {
      urlSearchParams.append(key, allQueries[key])
    })
    return urlSearchParams.toString()
  }


  createPickup (payload: ICreatePickUpRequest): Promise<ICreatePickUpResponse> {
    return new Promise((resolve, reject) => {
      axios({
        url: this.getUrl({ method: 'createPick' }),
        method: 'POST',
        data: payload,
        headers: {
          'content-type': 'application/json',
          'accept': 'application/json',
        }
      })
        .then(response => resolve(response.data))
        .catch(error => reject(error))
    })
  }


  createDelivery (payload: ICreateDeliveryRequest): Promise<ICreateDeliveryResponse> {
    return new Promise((resolve, reject) => {
      axios({
        url: this.getUrl({ method: 'createDelivery' }),
        method: 'POST',
        data: payload,
        headers: {
          'content-type': 'application/json',
          'accept': 'application/json',
        }
      })
        .then(response => resolve(response.data))
        .catch(error => reject(error))
    })
  }


  createPickupAndDelivery (payload: ICreatePickupAndDeliveryRequest): Promise<ICreatePickupAndDeliveryResponse> {
    return new Promise((resolve, reject) => {
      axios({
        url: this.getUrl({ method: 'createPickupAndDelivery' }),
        method: 'POST',
        data: payload,
        headers: {
          'content-type': 'application/json',
          'accept': 'application/json',
        }
      })
        .then(response => resolve(response.data))
        .catch(error => reject(error))
    })
  }


  createMultipleTasks (payload: ICreateMultipleTasksRequest): Promise<ICreateMultipleTasksResponse> {
    return new Promise((resolve, reject) => {
      axios({
        url: this.getUrl({ method: 'createMultipleTasks' }),
        method: 'POST',
        data: payload,
        headers: {
          'content-type': 'application/json',
          'accept': 'application/json',
        }
      })
        .then(response => resolve(response.data))
        .catch(error => reject(error))
    })
  }


  createTasksWithClientApp (payload: ICreateMultipleTasksRequest): Promise<ICreateMultipleTasksResponse> {
    return new Promise((resolve, reject) => {
      axios({
        url: this.getUrl({ method: 'createTasksWithClientApp' }),
        method: 'POST',
        data: payload,
        headers
      })
        .then(response => resolve(response.data))
        .catch(error => reject(error))
    })
  }

  viewAllTasksDetails (options): Promise<ITaskResponse[]> {

    return new Promise((resolve, reject) => {
      axios({
        url: this.getUrl({ method: 'viewAllTasksDetails' }),
        method: 'GET',
        headers
      })
    })
  }

  viewTask (taskId: number): Promise<ITaskResponse> {
    return new Promise((resolve, reject) => {
      axios({
        url: this.getUrl({ method: 'viewTask' }),
        method: 'GET',
        headers
      })
    })
  }

  cancelTask () {

  }
}
