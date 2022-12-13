export default class Vendors {
  id: number = 0;
  categoryCode: string = "";
  companyName: string = "";
  contactFName: string = "";
  contactLName: string = "";
  contactTitle: string = "";
  address1: string = "";
  address2: string = "";
  city: string = "";
  state: string = "";
  postalCode: string = "";
  country: string = "";
  lat: string = "";
  lon: string = "";
  phone1: string = "";
  phone2: string = "";
  email1: string = "";
  email2: string = "";
  url: string = "";
  paymentMethods: string = "";
  discountType: string = "";
  typeGoods: string = "";
  discountAvailable: boolean = false;
  logo: string = "";
  extra1: string = "";
  extra2: string = "";
  extra3: string = "";
  extra4: string = "";
  extra5: string = "";
  notes: string = "";
  status: string = "";
  modified_at: string = "";
  created_at: string = "";
  constructor(
    id: number,
    categoryCode: string,
    companyName: string,
    contactFName: string,
    contactLName: string,
    contactTitle: string,
    address1: string,
    address2: string,
    city: string,
    state: string,
    postalCode: string,
    country: string,
    lat: string,
    lon: string,
    phone1: string,
    phone2: string,
    email1: string,
    email2: string,
    url: string,
    paymentMethods: string,
    discountType: string,
    typeGoods: string,
    discountAvailable: boolean,
    logo: string,
    extra1: string,
    extra2: string,
    extra3: string,
    extra4: string,
    extra5: string,
    notes: string,
    status: string,
    modified_at: string,
    created_at: string
  ) {
    this.id = id;
    this.categoryCode = categoryCode;
    this.companyName = companyName;
    this.contactFName = contactFName;
    this.contactLName = contactLName;
    this.contactTitle = contactTitle;
    this.address1 = address1;
    this.address2 = address2;
    this.city = city;
    this.state = state;
    this.postalCode = postalCode;
    this.country = country;
    this.lat = lat;
    this.lon = lon;
    this.phone1 = phone1;
    this.phone2 = phone2;
    this.email1 = email1;
    this.email2 = email2;
    this.url = url;
    this.paymentMethods = paymentMethods;
    this.discountType = discountType;
    this.typeGoods = typeGoods;
    this.discountAvailable = discountAvailable;
    this.logo = logo;
    this.extra1 = extra1;
    this.extra2 = extra2;
    this.extra3 = extra3;
    this.extra4 = extra4;
    this.extra5 = extra5;
    this.notes = notes;

    this.status = status;
    this.modified_at = modified_at;
    this.created_at = created_at;
  }
}
