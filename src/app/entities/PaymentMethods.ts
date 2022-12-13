export default class PaymentMethods {
  id: number = 0;
  user_id: number = 0;
  name: string = "";
  customer_id: string = "";
  payment_method_id: string = "";
  country: string = "";
  exp_month: number = 0;
  exp_year: number = 0;
  last4: string = "";
  type: string = "";
  created: number = 0;
  is_primary: boolean = false;
  status: string = "";
  modified_at: string = "";
  created_at: string = "";

  constructor(
    id: number,
    user_id: number,
    name: string,
    customer_id: string,
    payment_method_id: string,
    country: string,
    exp_month: number,
    exp_year: number,
    last4: string,
    type: string,
    created: number,
    is_primary: boolean,
    status: string,
    modified_at: string,
    created_at: string
  ) {
    this.id = id;
    this.user_id = user_id;
    this.name = name;
    this.customer_id = customer_id;
    this.payment_method_id = payment_method_id;
    this.country = country;
    this.exp_month = exp_month;
    this.exp_year = exp_year;
    this.last4 = last4;
    this.type = last4;
    this.created = created;
    this.is_primary = is_primary;
    this.status = status;
    this.modified_at = modified_at;
    this.created_at = created_at;
  }
}
