export default class Customers {
  id: number = 0;
  user_id: number = 0;
  customer_id: number = 0;
  first_name: string = "";
  last_name: string = "";
  email: string = "";
  country: string = "";
  country_code: string = "";
  phone_no: string = "";
  city: string = "";
  company: string = "";
  address: string = "";
  apartment: string = "";
  state: string = "";
  postal_code: string = "";
  country_code1: string = "";
  phone_no1: string = "";
  collect_tax: boolean = false;
  marketing_emails: boolean = false;
  marketing_sms: boolean = false;
  notes: string = "";
  tags: string = "";
  extra1: string = "";
  extra2: string = "";
  extra3: string = "";
  extra4: string = "";
  extra5: string = "";
  map_url: string = "";
  referred_by: string = "";
  points: number = 0;
  order_no_current: string = "";
  total_orders: number = 0;
  total_spent: number = 0;
  status: string = "";
  modified_at: string = "";
  created_at: string = "";

  constructor(
    id: number,
    user_id: number,
    customer_id: number,
    first_name: string,
    last_name: string,
    email: string,
    country: string,
    country_code: string,
    phone_no: string,
    city: string,
    company: string,
    address: string,
    apartment: string,
    state: string,
    postal_code: string,
    country_code1: string,
    phone_no1: string,
    collect_tax: boolean,
    marketing_emails: boolean,
    marketing_sms: boolean,
    notes: string,
    tags: string,
    extra1: string,
    extra2: string,
    extra3: string,
    extra4: string,
    extra5: string,
    map_url: string,
    referred_by: string,
    points: number,
    order_no_current: string,
    total_orders: number,
    total_spent: number,
    status: string,
    modified_at: string,
    created_at: string
  ) {
    this.id = id;
    this.user_id = user_id;
    this.customer_id = customer_id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.country = country;
    this.country_code = country_code;
    this.phone_no = phone_no;
    this.city = city;
    this.company = company;
    this.address = address;
    this.apartment = apartment;
    this.state = state;
    this.postal_code = postal_code;
    this.country_code1 = country_code1;
    this.phone_no1 = phone_no1;
    this.collect_tax = collect_tax;
    this.marketing_emails = marketing_emails;
    this.marketing_sms = marketing_sms;
    this.notes = notes;
    this.tags = tags;
    this.extra1 = extra1;
    this.extra2 = extra2;
    this.extra3 = extra3;
    this.extra4 = extra4;
    this.extra5 = extra5;
    this.map_url = map_url;
    this.referred_by = referred_by;
    this.points = points;
    this.order_no_current = order_no_current;
    this.total_orders = total_orders;
    this.total_spent = total_spent;
    this.status = status;
    this.modified_at = modified_at;
    this.created_at = created_at;
  }
}
