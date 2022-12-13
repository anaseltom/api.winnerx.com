export default class OrderReturns {
  id: number = 0;
  ref_no: string = "";
  order_item_id: number = 0;
  quantity: number = 0;
  user_id: number = 0;
  order_id: number = 0;
  product_id: number = 0;
  issue_type: string = "";
  return_description: string = "";
  reason: string = "";
  date_requested: string = "";
  package_status: string = "";
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
    user_id: number,
    order_id: number,
    product_id: number,
    issue_type: string,
    return_description: string,
    reason: string,
    date_requested: string,
    package_status: string,
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
    this.user_id = user_id;
    this.order_id = order_id;
    this.product_id = product_id;
    this.issue_type = issue_type;
    this.return_description = return_description;
    this.reason = reason;
    this.date_requested = date_requested;
    this.package_status = package_status;
    this.remarks = remarks;
    this.tracking_no = tracking_no;
    this.shipping_carrier = shipping_carrier;
    this.tracking_url = tracking_url;
    this.status = status;
    this.modified_at = modified_at;
    this.created_at = created_at;
  }
}
