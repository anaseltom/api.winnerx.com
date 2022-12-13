export default class Promotions {
  id: number = 0;
  product_id: number = 0;
  percentage_off: number = 0;
  remarks: string = "";
  expiry_date: string = "";
  status: string = "";
  modified_at: string = "";
  created_at: string = "";

  constructor(
    id: number,
    product_id: number,
    percentage_off: number,
    remarks: string,
    expiry_date: string,
    status: string,
    modified_at: string,
    created_at: string
  ) {
    this.id = id;
    this.product_id = product_id;
    this.percentage_off = percentage_off;
    this.remarks = remarks;
    this.expiry_date = expiry_date;
    this.status = status;
    this.modified_at = modified_at;
    this.created_at = created_at;
  }
}
