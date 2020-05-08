export declare enum PapsOrderStatus {
    ASSIGNED = 0,
    STARTED = 1,
    SUCCESSFUL = 2,
    FAILED = 3,
    IN_PROGRESS = 4,
    ACCEPTED = 7,
    UNASSIGNED = 6,
    DECLINED = 8,
    CANCELLED = 9,
    DELETED = 1
}
export declare const PAPS_MESSAGES: {
    0: string;
    1: string;
    2: string;
    3: string;
    4: string;
    7: string;
    6: string;
    8: string;
    9: string;
};
export declare type IJobVehicleType = 'Scooter' | 'Minivan' | 'Van' | 'Camion';
export interface ICreatePickUpRequest {
    jobPickupName: string;
    jobPickupPhone: string;
    jobPickupAddress: string;
    jobPickupDatetime: string;
    jobDescription: string;
    jobVehicleType?: IJobVehicleType;
}
export interface ICreatePickUpResponseContent {
    job_id: number;
    job_hash: string;
    job_pickup_name: string;
    job_pickup_address: string;
    job_token: string;
    tracking_link: string;
    order_id: string;
    pickupOrderId: string;
    pickupAddressNotFound: boolean;
    deliveryAddressNotFound: boolean;
}
export interface ICreatePickUpResponse extends IPapsResponse<ICreatePickUpResponseContent> {
}
export declare type IPackageType = 'S' | 'M' | 'L' | 'XL';
export declare type IPackageSize = 'small' | 'medium' | 'large' | 'xlarge';
export interface ICreateDeliveryRequest {
    customerUsername: string;
    customerPhone: string;
    jobPickupPhone: string;
    customerAddress: string;
    jobDeliveryDatetime: string;
    jobDescription: string;
    jobPackageType?: IPackageType;
    jobAmountToReceive?: string;
}
export interface IPapsResponse<T> {
    message: string;
    status: number;
    data: T;
}
export interface ITaskResponseContent {
    fleet_id: number;
    fleet_name: string;
    fleet_latitude: number;
}
export interface ITaskResponse extends IPapsResponse<ITaskResponseContent> {
}
export interface IViewAllTasksDetailsRequest {
    date?: string;
    startDate?: string;
    endDate?: string;
    selectBy: 'intervalle' | 'month';
}
export interface IViewTaskDetailsResponse {
    job_amount_to_receive: number;
    job_package_type: any;
    job_rate: number;
    creation_datetime: string;
    completed_datetime: string;
    customer_username: string;
    job_description: string;
    job_pickup_address: string;
    job_address: any;
    job_pickup_name: string;
    job_state: string;
    job_status: PapsOrderStatus;
    job_hash: string;
    job_token: string;
    fleet_name: null;
    job_type: number;
    job_amount_received: number;
    job_comment: string;
    job_id: number;
    order_id: string;
    job_date_utc: string;
    last_updated_at: string;
}
export interface ICreateDeliveryResponseContent {
    "job_id": string;
    "job_hash": string;
    "customer_address": string;
    "job_token": string;
    "tracking_link": string;
    "pickupAddressNotFound": boolean;
    "deliveryAddressNotFound": boolean;
}
export interface ICreateDeliveryResponse extends IPapsResponse<ICreateDeliveryResponseContent> {
}
export interface ICreatePickupAndDeliveryRequest {
    jobPickupAddress: string;
    jobPickupPhone: string;
    customerPhone: string;
    jobPickupDatetime: string;
    jobDeliveryDatetime: string;
    customerAddress: string;
    customerUsername: string;
    jobVehicleType?: IJobVehicleType;
    jobPackageType?: IPackageType;
    jobAmountToReceive?: number;
}
export interface ICreatePickupAndDeliveryResponse {
}
export interface IPickup {
    address: string;
    time: string;
    phone: string;
    name: string;
    job_description: string;
    email: string;
}
export interface IDelivery {
    address: string;
    time: string;
    phone: string;
    name: string;
    job_description: string;
    email: string;
}
export interface ICreateMultipleTasksRequest {
    pickups: IPickup[];
    deliveries: IDelivery[];
}
export interface ICreateTasksWithClientAppRequest extends ICreateMultipleTasksRequest {
    email: string;
}
export interface ICreateMultipleTasksResponseContent {
    deliveries: ICreateDeliveryResponse[];
    pickups: ICreatePickUpResponse[];
}
export interface ICreateMultipleTasksResponse extends IPapsResponse<ICreateMultipleTasksResponseContent> {
}
export interface IPapsOptions {
    url: string;
    apiKey: string;
    test?: boolean;
}
export interface IGetQuoteRequest {
    origin: string;
    destination: string;
    packageSize: IPackageSize;
}
export interface IGetQuoteResponse {
    "code": string;
    "message": string;
    "data": {
        "origin": string;
        "destination": string;
        "legs": {
            "distance": {
                "text": string;
                "value": number;
            };
            "duration": {
                "text": string;
                "value": number;
            };
            "start_address": string;
            "end_address": string;
            "start_location": {
                "lat": number;
                "lng": number;
            };
            "end_location": {
                "lat": number;
                "lng": number;
            };
        }[];
        "total_distance": number;
        "quote": number;
        "normal_quote": number;
        "package_size": string;
        "coupon_quote": number;
        "delivery_type": string;
    };
}
export default class Paps {
    private readonly options;
    constructor(options: IPapsOptions);
    getUrl(options: any): string;
    createPickup(payload: ICreatePickUpRequest): Promise<ICreatePickUpResponse>;
    createDelivery(payload: ICreateDeliveryRequest): Promise<ICreateDeliveryResponse>;
    createPickupAndDelivery(payload: ICreatePickupAndDeliveryRequest): Promise<ICreatePickupAndDeliveryResponse>;
    createMultipleTasks(payload: ICreateMultipleTasksRequest): Promise<ICreateMultipleTasksResponse>;
    createTasksWithClientApp(payload: ICreateMultipleTasksRequest): Promise<ICreateMultipleTasksResponse>;
    viewTasks(options: IViewAllTasksDetailsRequest): Promise<IViewTaskDetailsResponse[]>;
    viewTask(id: number): Promise<ITaskResponse>;
    cancelTask(id: number): void;
    getQuotes(payload: IGetQuoteRequest): Promise<IGetQuoteResponse>;
}
