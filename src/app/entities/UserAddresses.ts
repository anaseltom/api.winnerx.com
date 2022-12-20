export default class UserAddresses {
  id: number = 0;
  customer_id: string = "";
  first_name: string = "";
  last_name: string = "";
  country: string = "";
  country_code: string = "";
  phone_no: string = "";
  mobile_no: string = "";
  city: string = "";
  company: string = "";
  address: string = "";
  apartment: string = "";
  state: string = "";
  postal_code: string = "";
  remarks: string = "";
  address_type: string = "";
  map_url: string = "";
  status: string = "";
  modified_at: string = "";
  created_at: string = "";

  constructor(
    id: number,
    customer_id: string,
    first_name: string,
    last_name: string,
    country: string,
    country_code: string,
    phone_no: string,
    mobile_no: string,
    city: string,
    company: string,
    address: string,
    apartment: string,
    state: string,
    postal_code: string,
    remarks: string,
    address_type: string,
    map_url: string,
    status: string,
    modified_at: string,
    created_at: string
  ) {
    this.id = id;
    this.customer_id = customer_id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.country = country;
    this.country_code = country_code;
    this.phone_no = phone_no;
    this.mobile_no = mobile_no;
    this.city = city;
    this.company = company;
    this.address = address;
    this.apartment = apartment;
    this.state = state;
    this.postal_code = postal_code;
    this.remarks = remarks;
    this.address_type = address_type;
    this.map_url = map_url;
    this.status = status;
    this.modified_at = modified_at;
    this.created_at = created_at;
  }
}
