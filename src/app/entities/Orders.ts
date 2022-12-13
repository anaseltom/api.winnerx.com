export default class Orders {
  id: number = 0;
  order_no: string = "";
  customer_id: number = 0;
  total_quantity: number = 0;
  total_price: number = 0;
  discount: number = 0;
  shipping_fee: number = 0;
  tax: number = 0;
  payment_status: string = "";
  payment_type: string = "";
  fulfillment_status: string = "";
  package_status: string = "";
  delivery_method: string = "";
  remarks: string = "";
  tags: string = "";
  // address_id_home: string = "";
  // address_id_shipping: string = "";
  // address_id_billing: string = "";
  tracking_no: string = "";
  shipping_carrier: string = "";
  tracking_url: string = "";
  status: string = "";
  refrence: string = "";
  modified_at: string = "";
  created_at: string = "";

  constructor(
    id: number,
    order_no: string,
    customer_id: number,
    total_quantity: number,
    total_price: number,
    discount: number,
    shipping_fee: number,
    tax: number,
    payment_status: string,
    payment_type: string,
    fulfillment_status: string,
    package_status: string,
    delivery_method: string,
    remarks: string,
    tags: string,
    // address_id_home: string,
    // address_id_shipping: string,
    // address_id_billing: string,
    tracking_no: string,
    shipping_carrier: string,
    tracking_url: string,
    status: string,
    refrence: string,
    modified_at: string,
    created_at: string
  ) {
    this.id = id;
    this.order_no = order_no;
    this.customer_id = customer_id;
    this.total_quantity = total_quantity;
    this.total_price = total_price;
    this.discount = discount;
    this.shipping_fee = shipping_fee;
    this.tax = tax;
    this.payment_status = payment_status;
    (this.payment_type = payment_type),
      (this.fulfillment_status = fulfillment_status);
    this.package_status = package_status;
    this.delivery_method = delivery_method;
    this.remarks = remarks;
    this.tags = tags;
    // this.address_id_home = address_id_home;
    // this.address_id_shipping = address_id_shipping;
    // this.address_id_billing = address_id_billing;
    this.tracking_no = tracking_no;
    this.shipping_carrier = shipping_carrier;
    this.tracking_url = tracking_url;
    this.status = status;
    this.refrence = refrence;
    this.modified_at = modified_at;
    this.created_at = created_at;
  }
}
