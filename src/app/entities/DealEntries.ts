export default class DealEntries {
  id: number = 0;
  order_id: number = 0;
  customer_id: number = 0;
  deal_id: number = 0; 
  product_id: number = 0; 
  entry_code: string = "";
  remarks: string = "";
  status: string = "";
  modified_at: string = "";
  created_at: string = "";

  constructor(
    id: number,
    order_id: number,
    customer_id: number,
    deal_id: number, 
    product_id: number, 
    entry_code: string,
    remarks: string,
    status: string,
    modified_at: string,
    created_at: string
  ) {
    this.id = id;
    this.order_id = order_id;
    this.customer_id=customer_id;
    this.deal_id=deal_id; 
    this.product_id=product_id; 
    this.entry_code = entry_code;
    this.remarks = remarks;
    this.status = status;
    this.modified_at = modified_at;
    this.created_at = created_at;
  }
}
