export default class Categories {
  id: number = 0;
  category_code: string = "";
  category_name: string = "";
  category_name_ar: string = "";
  keywords: string = "";
  description: string = "";
  header: string = "";
  footer: string = "";
  image_small: string = "";
  image_medium: string = "";
  image_large: string = "";
  extra1: string = "";
  extra2: string = "";
  extra3: string = "";
  parent_id: number = 0;
  category_order: number = 0;
  seller_id: number = 0;
  categoryCode: string = "";
  categoryName: string = "";
  imageSmall: string = "";
  status: string = "";
  modified_at: string = "";
  created_at: string = "";

  constructor(
    id: number,
    category_code: string,
    category_name: string,
    category_name_ar: string,
    keywords: string,
    description: string,
    header: string,
    footer: string,
    image_small: string,
    image_medium: string,
    image_large: string,
    extra1: string,
    extra2: string,
    extra3: string,
    parent_id: number,
    category_order: number,
    categoryCode: string,
    categoryName: string,
    imageSmall: string,
    seller_id: number,
    status: string,
    modified_at: string,
    created_at: string

  ) {
    this.id = id;
    this.category_code = category_code;
    this.category_name = category_name;
    this.category_name_ar = category_name_ar;
    this.keywords = keywords;
    this.description = description;
    this.header = header;
    this.footer = footer;
    this.image_small = image_small;
    this.image_medium = image_medium;
    this.image_large = image_large;
    this.extra1 = extra1;
    this.extra2 = extra2;
    this.extra3 = extra3;
    this.parent_id = parent_id;
    this.category_order = category_order;
    this.seller_id = seller_id;
    this.categoryCode = categoryCode;
    this.categoryName = categoryName;
    this.imageSmall = imageSmall;
    this.status = status;
    this.modified_at=modified_at; 
    this.created_at= created_at; 
  }
}
