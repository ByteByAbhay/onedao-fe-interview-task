import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faTableCellsLarge,
  faClipboardList,
  faRoute,
  faUsers,
  faUser,
  faCircleDollarToSlot,
  faGlobe,
  faCar,
  faCodeBranch,
  faUsersGear,
  faSliders,
  faSackDollar,
  faChartLine,
  faUserGroup,
  faBagShopping,
} from "@fortawesome/free-solid-svg-icons";

export type NavItem = {
  id: string;
  label: string;
  icon: IconDefinition;
  href?: string;
};

export const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: faTableCellsLarge },
  { id: "products", label: "Products", icon: faBagShopping, href: "/products" },
  { id: "orders", label: "Orders", icon: faClipboardList },
  { id: "rides", label: "Rides", icon: faRoute },
  { id: "clients", label: "Clients", icon: faUsers },
  { id: "drivers", label: "Drivers", icon: faUser },
  { id: "shift", label: "Shift", icon: faCircleDollarToSlot },
  { id: "live-map", label: "Live map", icon: faGlobe },
  { id: "car-classes", label: "Car classes", icon: faCar },
  { id: "branches", label: "Branches", icon: faCodeBranch },
  { id: "moderators", label: "Moderators", icon: faUsersGear },
  { id: "settings", label: "Settings", icon: faSliders },
];

export type Person = {
  name: string;
  phone: string;
};

export const currentUser: Person & { photo?: string } = {
  name: "Maharram",
  phone: "+998 (99) 436-46-15",
  photo: "/profile-1.jpg",
};

export type StatAccent = "blue" | "red" | "orange" | "green";

export type StatCardData = {
  id: string;
  label: string;
  icon: IconDefinition;
  accent: StatAccent;
};

export const statCards: StatCardData[] = [
  { id: "orders", label: "Total Orders", icon: faClipboardList, accent: "blue" },
  { id: "earnings", label: "Total Earnings", icon: faSackDollar, accent: "red" },
  { id: "profit", label: "Profitм", icon: faChartLine, accent: "orange" },
  { id: "drivers", label: "Total Drivers", icon: faUserGroup, accent: "green" },
];

export type DriverData = Person & {
  id: string;
  orders: number;
  income: number;
  photo?: string;
};

export const topDrivers: DriverData[] = [
  { id: "drv-1", name: "Maharrm Hasanli", phone: "+998 (99) 436-46-15", orders: 5, income: 98, photo: "https://randomuser.me/api/portraits/men/32.jpg" },
  { id: "drv-2", name: "Gina Garza", phone: "+998 (99) 158-10-15", orders: 5, income: 15, photo: "https://randomuser.me/api/portraits/women/44.jpg" },
  { id: "drv-3", name: "Brian Reed", phone: "+998 (95) 489-46-20", orders: 5, income: 23, photo: "https://randomuser.me/api/portraits/men/46.jpg" },
  { id: "drv-4", name: "Tammy Spencer", phone: "+998 (95) 785-10-02", orders: 5, income: 98, photo: "https://randomuser.me/api/portraits/women/68.jpg" },
  { id: "drv-5", name: "Joseph Brooks", phone: "+998 (99) 436-46-15", orders: 5, income: 98, photo: "https://randomuser.me/api/portraits/men/62.jpg" },
  { id: "drv-6", name: "Juan Steward", phone: "+998 (99) 436-46-15", orders: 5, income: 98, photo: "https://randomuser.me/api/portraits/men/75.jpg" },
];

export type CarComfort = "simple" | "otra" | "convenient";

export type OrderData = {
  id: string;
  user: Person;
  carComfort: CarComfort;
  orderedTime: string;
  startLocation: string;
  finishLocation: string;
  income: number;
};

export const orders: OrderData[] = [
  {
    id: "ord-1",
    user: { name: "Sierra Ferguson", phone: "+998 (99) 436-46-15" },
    carComfort: "simple",
    orderedTime: "04.12.2021 20:30",
    startLocation: "pl. Besh Agach, Furkat Street, Tashkent, O'zbekiston",
    finishLocation: "pl. Besh Agach, Furkat Street, Tashkent, O'zbekiston",
    income: 50300000,
  },
  {
    id: "ord-2",
    user: { name: "Aziz Karimov", phone: "+998 (90) 123-45-67" },
    carComfort: "otra",
    orderedTime: "04.12.2021 20:24",
    startLocation: "21 Hamidulla Oripov ko'chasi, Toshkent, O'zbekiston",
    finishLocation: "21 Hamidulla Oripov ko'chasi, Toshkent, O'zbekiston",
    income: 300000,
  },
  {
    id: "ord-3",
    user: { name: "Dilnoza Yusupova", phone: "+998 (93) 555-22-11" },
    carComfort: "convenient",
    orderedTime: "04.12.2021 20:23",
    startLocation: "76 Farg'ona Yo'li, Toshkent, O'zbekiston",
    finishLocation: "76 Farg'ona Yo'li, Toshkent, O'zbekiston",
    income: 5300000,
  },
  {
    id: "ord-4",
    user: { name: "Rustam Tashkentov", phone: "+998 (97) 888-99-00" },
    carComfort: "convenient",
    orderedTime: "17.11.2021 12:19",
    startLocation: "13 Kumarik ko'chasi, Tashkent 100167, O'zbekiston",
    finishLocation: "13 Kumarik ko'chasi, Tashkent 100167, O'zbekiston",
    income: 500300000,
  },
  {
    id: "ord-5",
    user: { name: "Malika Nazarova", phone: "+998 (94) 321-65-98" },
    carComfort: "convenient",
    orderedTime: "04.12.2021 20:30",
    startLocation: "1 Kuyi Talarik ko'chasi, Toshkent 100091, O'zbekiston",
    finishLocation: "1 Kuyi Talarik ko'chasi, Toshkent 100091, O'zbekiston",
    income: 50300000,
  },
  {
    id: "ord-6",
    user: { name: "Otabek Yoldoshev", phone: "+998 (91) 222-33-44" },
    carComfort: "simple",
    orderedTime: "16.11.2021 09:12",
    startLocation: "Mustaqillik Street, Tashkent, O'zbekiston",
    finishLocation: "Amir Temur Square, Tashkent, O'zbekiston",
    income: 1200000,
  },
  {
    id: "ord-7",
    user: { name: "Nodira Ergasheva", phone: "+998 (95) 777-88-11" },
    carComfort: "otra",
    orderedTime: "15.11.2021 18:45",
    startLocation: "Chilonzor District, Tashkent, O'zbekiston",
    finishLocation: "Yunusabad District, Tashkent, O'zbekiston",
    income: 850000,
  },
  {
    id: "ord-8",
    user: { name: "Jasur Abdullayev", phone: "+998 (93) 111-22-33" },
    carComfort: "convenient",
    orderedTime: "14.11.2021 07:05",
    startLocation: "Tashkent International Airport, O'zbekiston",
    finishLocation: "Mirzo Ulugbek District, Tashkent, O'zbekiston",
    income: 3200000,
  },
  {
    id: "ord-9",
    user: { name: "Zarina Yusupova", phone: "+998 (90) 444-55-66" },
    carComfort: "simple",
    orderedTime: "13.11.2021 21:50",
    startLocation: "Shayxontohur District, Tashkent, O'zbekiston",
    finishLocation: "Sergeli District, Tashkent, O'zbekiston",
    income: 640000,
  },
  {
    id: "ord-10",
    user: { name: "Bekzod Rashidov", phone: "+998 (97) 666-77-88" },
    carComfort: "otra",
    orderedTime: "12.11.2021 14:32",
    startLocation: "Yakkasaray District, Tashkent, O'zbekiston",
    finishLocation: "Bektemir District, Tashkent, O'zbekiston",
    income: 970000,
  },
  {
    id: "ord-11",
    user: { name: "Feruza Tosheva", phone: "+998 (94) 888-11-22" },
    carComfort: "convenient",
    orderedTime: "11.11.2021 11:10",
    startLocation: "Almazar District, Tashkent, O'zbekiston",
    finishLocation: "Uchtepa District, Tashkent, O'zbekiston",
    income: 4100000,
  },
  {
    id: "ord-12",
    user: { name: "Sardor Yusupov", phone: "+998 (99) 999-00-11" },
    carComfort: "simple",
    orderedTime: "10.11.2021 08:20",
    startLocation: "Mirobod District, Tashkent, O'zbekiston",
    finishLocation: "Yashnobod District, Tashkent, O'zbekiston",
    income: 410000,
  },
];

export type ProgressPoint = {
  month: string;
  averageGrade: number;
  exams: number;
};

export const progressChartData: ProgressPoint[] = [
  { month: "Jan", averageGrade: 1.0, exams: 1.8 },
  { month: "Feb", averageGrade: 1.6, exams: 2.6 },
  { month: "Mar", averageGrade: 2.4, exams: 3.2 },
  { month: "Apr", averageGrade: 3.0, exams: 2.6 },
  { month: "May", averageGrade: 2.6, exams: 1.8 },
  { month: "Jun", averageGrade: 2.0, exams: 2.2 },
  { month: "Jul", averageGrade: 1.8, exams: 2.8 },
  { month: "Aug", averageGrade: 3.0, exams: 3.0 },
  { month: "Sep", averageGrade: 2.2, exams: 3.6 },
  { month: "Oct", averageGrade: 2.8, exams: 3.8 },
  { month: "Nov", averageGrade: 3.4, exams: 4.2 },
  { month: "Dec", averageGrade: 4.0, exams: 4.6 },
];

export const highlightedMonth = "Aug";
export const highlightedPeriodLabel = "Aug 2021";
