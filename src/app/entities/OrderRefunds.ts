export default class OrderRefunds {
  id: number = 0;
  ref_no: string = "";
  order_item_id: number = 0;
  amount: number = 0;
  user_id: number = 0;
  order_id: number = 0;
  product_id: number = 0;
  issue_type: string = "";
  reason: string = "";
  date_requested: string = "";
  remarks: string = "";
  status: string = "";
  modified_at: string = "";
  created_at: string = "";

  constructor(
    id: number,
    ref_no: string,
    order_item_id: number,
    amount: number,
    user_id: number,
    order_id: number,
    product_id: number,
    issue_type: string,
    reason: string,
    date_requested: string,
    remarks: string,
    status: string,
    modified_at: string,
    created_at: string
  ) {
    this.id = id;
    this.ref_no = ref_no;
    this.order_item_id = order_item_id;
    this.amount = amount;
    this.user_id = user_id;
    this.order_id = order_id;
    this.product_id = product_id;
    this.issue_type = issue_type;
    this.reason = reason;
    this.date_requested = date_requested;
    this.remarks = remarks;
    this.status = status;
    this.modified_at = modified_at;
    this.created_at = created_at;
  }
}
