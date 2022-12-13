export default class DealProducts {
  id: number = 0;
  entry_code:  string = "";
  customer_id: number = 0;
  deal_id: number = 0;
  product_id: number = 0;
  deal_date_end: string = "";
  remarks: string = "";
  status: string = "";
  modified_at: string = "";
  created_at: string = "";

  constructor(
    id: number,
    entry_code:  string ,
    customer_id: number,
    deal_id: number,
    product_id: number, 
    deal_date_end: string, 
    remarks: string,
    status: string,
    modified_at: string,
    created_at: string

  ) {
    this.id = id;
    this.entry_code = entry_code;
    this.customer_id = customer_id;
    this.deal_id = deal_id;
    this.product_id = product_id; 
    this.deal_date_end = deal_date_end; 
    this.remarks = remarks;
    this.status = status;
    this.modified_at = modified_at;
    this.created_at = created_at;
  }
}
