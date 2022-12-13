export default class Sellers {
  id: number = 0;
  user_id: string = "";
  email: string = "";
  first_name: string = "";
  last_name: string = "";
  store_name: string = "";
  organization: string = "";
  address1: string = "";
  address2: string = "";
  city: string = "";
  state: string = "";
  postal_code: string = "";
  country: string = "";
  lat: number = 0;
  lng: number = 0;
  location: string = "";
  browser_name: string = "";
  website: string = "";
  phone_no: string = "";
  mobile_no: string = "";
  phone_no1: string = "";
  phone_no2: string = "";
  email1: string = "";
  email2: string = "";
  extra1: string = "";
  extra2: string = "";
  extra3: string = "";
  extra4: string = "";
  extra5: string = "";
  notes: string = "";
  referred_by: string = "";
  status: string = "";
  modified_at: string = "";
  created_at: string = "";
  constructor(
    id: number,
    user_id: string,
    email: string,
    first_name: string,
    last_name: string,
    store_name: string,
    organization: string,
    address1: string,
    address2: string,
    city: string,
    state: string,
    postal_code: string,
    country: string,
    lat: number,
    lng: number,
    location: string,
    browser_name: string,
    website: string,
    phone_no: string,
    mobile_no: string,
    phone_no1: string,
    phone_no2: string,
    email1: string,
    email2: string,
    extra1: string,
    extra2: string,
    extra3: string,
    extra4: string,
    extra5: string,
    notes: string,
    referred_by: string,
    status: string,
    modified_at: string,
    created_at: string,

  ) {
    this.id = id;
    this.user_id = user_id;
    this.email = email;
    this.first_name = first_name;
    this.last_name = last_name;
    this.store_name = store_name;
    this.organization = organization;
    this.address1 = address1;
    this.address2 = address2;
    this.city = city;
    this.state = state;
    this.postal_code = postal_code;
    this.country = country;
    this.lat = lat;
    this.lng = lng;
    this.location = location;
    this.browser_name = browser_name;
    this.website = website;
    this.phone_no = phone_no;
    this.mobile_no = mobile_no;
    this.phone_no1 = phone_no1;
    this.phone_no2 = phone_no2;
    this.email1 = email1;
    this.email2 = email2;
    this.extra1 = extra1;
    this.extra2 = extra2;
    this.extra3 = extra3;
    this.extra4 = extra4;
    this.extra5 = extra5;
    this.notes = notes;
    this.referred_by = referred_by;
    this.status = status;
    this.modified_at = modified_at;
    this.created_at = created_at;
  }
}
