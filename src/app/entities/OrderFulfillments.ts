export default class OrderFulfillments {
  id: number = 0;
  ref_no: string = "";
  order_item_id: number = 0;
  quantity: number = 0;
  price: number = 0;
  user_id: number = 0;    //-- user / seller who did the fulfillment
  order_id: number = 0;
  product_id: number = 0;
  remarks: string = "";
  tracking_no: string = "";
  shipping_carrier: string = "";
  tracking_url: string = "";
  status: string = "";
  modified_at: string = "";
  created_at: string = "";

  constructor(
    id: number,
    ref_no: string,
    order_item_id: number,
    quantity: number,
    price: number,
    user_id: number,
    order_id: number,
    product_id: number,
    remarks: string,
    tracking_no: string,
    shipping_carrier: string,
    tracking_url: string,
    status: string,
    modified_at: string,
    created_at: string
  ) {
    this.id = id;
    this.ref_no = ref_no;
    this.order_item_id = order_item_id;
    this.quantity = quantity;
    this.price = price;
    this.user_id = user_id;
    this.order_id = order_id;
    this.product_id = product_id;
    this.remarks = remarks;
    this.tracking_no = tracking_no;
    this.shipping_carrier = shipping_carrier;
    this.tracking_url = tracking_url;
    this.status = status;
    this.modified_at = modified_at;
    this.created_at = created_at;
  }
}
