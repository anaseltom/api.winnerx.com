export default class DealProducts {
  id: number = 0;
  deal_id: number = 0;
  product_id: number = 0;
  quantity_sold: number = 0;
  quantity_max: number = 0;
  date_start: string = "";
  date_end: string = "";
  limit_per_person: boolean = false;
  remarks: string = "";
  status: string = "";
  modified_at: string = "";
  created_at: string = "";

  constructor(
    id: number,
    deal_id: number,
    product_id: number,
    quantity_sold: number,
    quantity_max: number,
    date_start: string,
    date_end: string,
    limit_per_person: boolean,
    remarks: string,
    status: string,
    modified_at: string,
    created_at: string

  ) {
    this.id = id;
    this.deal_id = deal_id;
    this.product_id = product_id;
    this.quantity_sold = quantity_sold;
    this.quantity_max = quantity_max;
    this.date_start = date_start;
    this.date_end = date_end;
    this.limit_per_person = limit_per_person;
    this.remarks = remarks;
    this.status = status;
    this.modified_at = modified_at;
    this.created_at = created_at;
  }
}
