export default class Reviews {
  id: number = 0;
  product_id: number = 0;
  user_id: number = 0;
  rating: number = 0;
  remarks: string = "";
  status: string = "";
  modified_at: string = "";
  created_at: string = "";

  constructor(
    id: number,
    product_id: number,
    user_id: number,
    rating: number,
    remarks: string,
    status: string,
    modified_at: string,
    created_at: string
  ) {
    this.id = id;
    this.product_id = product_id;
    this.user_id = user_id;
    this.rating = rating;
    this.remarks = remarks;
    this.status = status;
    this.modified_at = modified_at;
    this.created_at = created_at;
  }
}
