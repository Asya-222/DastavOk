

export interface MenuItem {
    label: string,
    routerLink: string,
    icon: string
}
export interface RegisterItems {
    name: string;
    email: string;
    phoneNumber?: string;
    address: Address;
    userName: string;
    password?: string;
    zipCode?: number;
    types?: Array<number>;
    companyType?: string
}
export interface LoginItems {
    Username: string;
    Password: string
}

export interface TypeToken {
    token: string;
    refreshToken: string
}
export interface ServerResponse<T> {
    message: T;
}
export interface TypeCompany {
    createdAt: string,
    id: number;
    name: string;
    updatedAt: string
}
export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
}
export interface ProfileInfo {
    address: Address;
    email: string;
    id: number;
    name: string;
    image: string;
    phoneNumber: string;
    userName: string
}
export interface PhoneNumForResetPass {
    phoneNumber: string
}
export interface CodeForResetPass {
    code: number;
    phoneNumber: string
}
export interface NewToken {
    token: string;
}
export interface ResetPassword {
    token: string;
    password: string
}
export interface ForChangePassword {
    password: string;
    oldPassword: string
}
export interface Err {
    error: ServerResponse<string>
}
export interface Address {
    lat: number;
    lng: number;
    text: string
}
export interface AddressForShowOrder {
    lat: number;
    lng: number;
}
export interface AddNewDish {
    name: string;
    price: number;
    description: string;
    isDeal: boolean;
    is_slider: boolean;
    goodTypeId: number;
    readyTime: number;
    toppings: Array<object>
}
export interface DishTypes {
    createdAt: string;
    description: string;
    id: number;
    image: string;
    name: string;
    parentGoodTypeId: number;
    updatedAt: string
}

export interface NewDishData {
    companyId: number;
    createdAt: string;
    description: string;
    goodTypeId: number;
    id: number;
    images: null;
    isDeal: boolean;
    name: string;
    price: number;
    readTime: number;
    thumbnail: null
    unitId: number
    updatedAt: string
}
export interface Units {
    createdAt: string;
    id: number;
    name: string;
    symbol: string;
    updatedAt: string
}
export interface DishData {
    companyId: number;
    createdAt: string;
    description: string;
    goodTypeId: number;
    goodtypename: string;
    id: number;
    images: string;
    isDeal: boolean;
    name: string;
    price: number;
    readyTime: number;
    thumbnail: string;
    topping: Array<object>;
    unitId: number;
    unitsname: string;
    unitssympol: string;
    updatedAt: string;
}
export interface OrdersData {
    count: number;
    pages: number;
    result: Array<object>
}
export interface CompanyTypes {
    companytypeid: number;
    typename: string
}
export interface SendNewType {
    typesId: Array<number>
}
export interface ClientInfo {
    clientname: string
    clientimage: string,
    clientphonenumber: string,
    clientaddress: Array<Address>
}
export interface OneOrder {
    address: Address;
    buyDate: string;
    client: ClientInfo;
    clientId: number;
    comment: string
    companyId: number;
    createdAt: string;
    dispatcherId: number;
    driverId: number;
    driverToClientDate: string;
    driverToRestaurantDate: string;
    goods: Array<object>;
    id: number;
    name: string;
    orderCompleteDate: string;
    orderStartDate: string;
    reviewId: number;
    status: string;
    totalAmount: number;
    updatedAt: string
}
export interface EdittingDatasOfDish {
    name: string;
    price: number;
    description: string;
    isDeal: boolean;
    is_slider:boolean;
    typesId: number;
    readyTime: number;
}
export interface DatasOfToppingsOfDish {
    createdAt: string;
    description: string;
    goodId: number;
    id: number;
    name: string;
    stepPrice: number;
    updatedAt: string;
}

export interface InfoOfOneToppingOfGood {
    createdAt: string;
    description: string;
    goodId: number;
    id: number;
    name: string;
    stepPrice: number;
    updatedAt: string;
}
export interface AmountStatistics {
    date: string | Date;
    sum: number;
}

export interface OrdersCountStatistics {
    date: string | Date;
    count: number | string;
}
export interface DashboardInfo {
    statusCode: number;
    message: Dashboard
}
export interface Dashboard {
    acceptedCount: number;
    amount: number;
    startCount: number
}
export interface ToppingItems {
    name: string;
    stepPrice: number
}
export interface ItemsOfToppingOfOneProduct {
    name: string;
    stepPrice: number;
    goodId: number

}
export interface TypeOfCompany {
    createdAt: string
    id: number
    name: string
    updatedAt: string
}
export interface AddTypesOfCompanyModal {
    companytypeid: number,
    typename: string
}
export interface PaginatorPageNumber {
    pageNumber: number
}
export interface ProductInfo {
    companyId: number;
    createdAt: string;
    description: string;
    goodTypeId: number;
    goodtypename: string;
    id: number;
    images: string;
    isActive: boolean;
    isDeal: boolean;
    isHide: boolean;
    name: string;
    price: number;
    readyTime: number;
    thumbnail: string;
    unitId?: number;
    updatedAt: string
}
export interface StatusOfOrder {
    orderStatus: string
}
export interface StatusOfOrderByOrderId {
    orderId: string
    orderStatus: string
}
export interface RestaurantProfileInfo {
    address: Address
    companyType: string
    email: string
    id: number
    image: string
    name: string
    phoneNumber: string
    userName: string
    zipCode: number
}