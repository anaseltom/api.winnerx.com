export default class Deals {
  id: number = 0;
  name: string = "";
  description: string = "";
  name_ar: string = "";
  description_ar: string = "";
  image_url_main: string = "";
  image_url_other1: string = "";
  image_url_other2: string = "";
  image_url_other3: string = "";
  image_url_other4: string = "";
  image_url_other5: string = "";
  image_url_other6: string = "";
  image_url_other7: string = "";
  // product_id: number = 0;
  // quantity_sold: number = 0;
  // quantity_max: number = 0;
  date_start: string = "";
  date_end: string = "";
  // limit_per_person: boolean = false;
  remarks: string = "";
  status: string = "";
  modified_at: string = "";
  created_at: string = "";

  constructor(
    id: number,
    name: string,
    description: string,
    name_ar: string,
    description_ar: string,
    image_url_main: string,
    image_url_other1: string,
    image_url_other2: string,
    image_url_other3: string,
    image_url_other4: string,
    image_url_other5: string,
    image_url_other6: string,
    image_url_other7: string,
    // product_id: number,
    // quantity_sold: number,
    // quantity_max: number,
    date_start: string,
    date_end: string,
    // limit_per_person: boolean,
    remarks: string,
    status: string,
    modified_at: string,
    created_at: string

  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.name_ar = name_ar;
    this.description_ar = description_ar;
    this.image_url_main = image_url_main;
    this.image_url_other1 = image_url_other1;
    this.image_url_other2 = image_url_other2;
    this.image_url_other3 = image_url_other3;
    this.image_url_other4 = image_url_other4;
    this.image_url_other5 = image_url_other5;
    this.image_url_other6 = image_url_other6;
    this.image_url_other7 = image_url_other7;
    // this.product_id = product_id;
    // this.quantity_sold = quantity_sold;
    // this.quantity_max = quantity_max;
    this.date_start = date_start;
    this.date_end = date_end;
    // this.limit_per_person = limit_per_person;
    this.remarks = remarks;
    this.status = status;
    this.modified_at = modified_at;
    this.created_at = created_at;
  }
}
