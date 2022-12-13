export default class Products {
  id: number = 0;
  parent_id: number = 0;
  parent_name:  string = "";
  product_code: string = "";
  product_name: string = "";
  product_id: string = "";
  price_id: string = "";
  seller_id: number = 0;
  domain_name: string = "";
  seller_name: string = "";
  category_id: number = 0;
  category_name: string = "";
  category_code: string = "";
  sku_parent: string = "";
  sku: string = "";
  brand_name: string = "";
  description: string = "";
  description_ar: string = "";
  color: string = "";
  condition: string = "";
  variants: string = "";
  department: string = "";
  image_url_main: string = "";
  image_url_other1: string = "";
  image_url_other2: string = "";
  image_url_other3: string = "";
  image_url_other4: string = "";
  image_url_other5: string = "";
  image_url_other6: string = "";
  image_url_other7: string = "";
  gender: string = "";
  likes: number = 0;
  cat_code1: string = "";
  cat_level1: string = "";
  cat_code2: string = "";
  cat_level2: string = "";
  currency_code: string = "";
  unit_cost: number = 0;
  unit_price: number = 0;
  alt_price: number = 0;
  size: string = "";
  units_in_stock: number = 0;
  delivery_days: number = 0;
  bullet_point1: string = "";
  bullet_point2: string = "";
  bullet_point3: string = "";
  bullet_point4: string = "";
  bullet_point5: string = "";
  bullet_point6: string = "";
  bullet_point7: string = "";
  variant_ids: string = "";
  keywords: string = "";
  percentage: number = 0;
  shipping_cost: number = 0;
  length: number = 0;
  height: number = 0;
  weight: number = 0;
  weight_shipping: number = 0;
  uom: string = "";
  uom_shipping: string = "";
  lead_time_to_ship: number = 0;
  color_list: string = "";
  reorder_level: number = 0;
  header: string = "";
  footer: string = "";
  is_taxed: boolean = false;
  image_small: string = "";
  image_medium: string = "";
  image_large: string = "";
  image_list: string = "";
  variant_name1: string = "";
  variant_name2: string = "";
  variant_name3: string = "";
  product_order: number = 0;
  manufacturer: string = "";
  upc: string = "";
  country_made_in: string = "";
  model_number: string = "";
  legal_disclaimer: string = "";
  scent: string = "";
  flavor: string = "";
  age_minimum: number = 0;
  age_maximum: number = 0;
  video_link: string = "";
  date_featured_expiry: string = "";
  date_launch: string = "";
  date_release: string = "";
  productCode: string = "";
  productName: string = "";
  productName_ar: string = "";
  sellerId: number = 0;
  domainName: string = "";
  sellerName: string = "";
  categoryId: number = 0;
  categoryName: string = "";
  categoryCode: string = "";
  skuParent: string = "";
  brandName: string = "";
  imageUrlMain: string = "";
  imageUrlOther1: string = "";
  imageUrlOther2: string = "";
  imageUrlOther3: string = "";
  imageUrlOther4: string = "";
  imageUrlOther5: string = "";
  imageUrlOther6: string = "";
  imageUrlOther7: string = "";
  currencyCode: string = "";
  unitCost: number = 0;
  unitPrice: number = 0;
  altPrice: number = 0;
  unitsInStock: number = 0;
  deliveryDays: number = 0;
  is_recyclable: boolean=false;
  status: string = "";
  modified_at: string = "";
  created_at: string = "";

  constructor(
    id: number,
    parent_id: number,
    parent_name:  string,
    product_code: string,
    product_name: string,
    product_id: string,
    price_id: string,
    seller_id: number,
    domain_name: string,
    seller_name: string,
    category_id: number,
    category_name: string,
    category_code: string,
    sku_parent: string,
    sku: string,
    brand_name: string,
    description: string,
    description_ar: string,
    color: string,
    condition: string,
    variants: string,
    department: string,
    image_url_main: string,
    image_url_other1: string,
    image_url_other2: string,
    image_url_other3: string,
    image_url_other4: string,
    image_url_other5: string,
    image_url_other6: string,
    image_url_other7: string,
    gender: string,
    likes: number,
    cat_code1: string,
    cat_level1: string,
    cat_code2: string,
    cat_level2: string,
    currency_code: string,
    unit_cost: number,
    unit_price: number,
    alt_price: number,
    size: string,
    units_in_stock: number,
    delivery_days: number,
    bullet_point1: string,
    bullet_point2: string,
    bullet_point3: string,
    bullet_point4: string,
    bullet_point5: string,
    bullet_point6: string,
    bullet_point7: string,
    variant_ids: string,
    keywords: string,
    percentage: number,
    shipping_cost: number,
    length: number,
    height: number,
    weight: number,
    weight_shipping: number,
    uom: string,
    uom_shipping: string,
    lead_time_to_ship: number,
    color_list: string,
    reorder_level: number,
    header: string,
    footer: string,
    is_taxed: boolean,
    image_small: string,
    image_medium: string,
    image_large: string,
    image_list: string,
    variant_name1: string,
    variant_name2: string,
    variant_name3: string,
    product_order: number,
    manufacturer: string,
    upc: string,
    country_made_in: string,
    model_number: string,
    legal_disclaimer: string,
    scent: string,
    flavor: string,
    age_minimum: number,
    age_maximum: number,
    video_link: string,
    date_featured_expiry: string,
    date_launch: string,
    date_release: string,
    productCode: string,
    productName: string,
    productName_ar: string,
    sellerId: number,
    domainName: string,
    sellerName: string,
    categoryId: number,
    categoryName: string,
    categoryCode: string,
    skuParent: string,
    brandName: string,
    imageUrlMain: string,
    imageUrlOther1: string,
    imageUrlOther2: string,
    imageUrlOther3: string,
    imageUrlOther4: string,
    imageUrlOther5: string,
    imageUrlOther6: string,
    imageUrlOther7: string,
    currencyCode: string,
    unitCost: number,
    unitPrice: number,
    altPrice: number,
    unitsInStock: number,
    deliveryDays: number,
    is_recyclable: boolean,
    status: string,
    modified_at: string,
    created_at: string,
  ) {
    this.id = id;
    this.parent_id = parent_id;
    this.parent_name = parent_name;
    this.product_code = product_code;
    this.product_name = product_name;
    this.product_id = product_id;
    this.price_id = price_id;
    this.seller_id = seller_id;
    this.domain_name = domain_name;
    this.seller_name = seller_name;
    this.category_id = category_id;
    this.category_name = category_name;
    this.category_code = category_code;
    this.sku_parent = sku_parent;
    this.sku = sku;
    this.brand_name = brand_name;
    this.description = description;
    this.description_ar = description_ar;
    this.color = color;
    this.condition = condition;
    this.variants = variants;
    this.department = department;
    this.image_url_main = image_url_main;
    this.image_url_other1 = image_url_other1;
    this.image_url_other2 = image_url_other2;
    this.image_url_other3 = image_url_other3;
    this.image_url_other4 = image_url_other4;
    this.image_url_other5 = image_url_other5;
    this.image_url_other6 = image_url_other6;
    this.image_url_other7 = image_url_other7;
    this.gender = gender;
    this.likes = likes;
    this.cat_code1 = cat_code1;
    this.cat_level1 = cat_level1;
    this.cat_code2 = cat_code2;
    this.cat_level2 = cat_level2;
    this.currency_code = currency_code;
    this.unit_cost = unit_cost;
    this.unit_price = unit_price;
    this.alt_price = alt_price;
    this.size = size;
    this.units_in_stock = units_in_stock;
    this.delivery_days = delivery_days;
    this.bullet_point1 = bullet_point1;
    this.bullet_point2 = bullet_point2;
    this.bullet_point3 = bullet_point3;
    this.bullet_point4 = bullet_point4;
    this.bullet_point5 = bullet_point5;
    this.bullet_point6 = bullet_point6;
    this.bullet_point7 = bullet_point7;
    this.variant_ids = variant_ids;
    this.keywords = keywords;
    this.percentage = percentage;
    this.shipping_cost = shipping_cost;
    this.length = length;
    this.height = height;
    this.weight = weight;
    this.weight_shipping = weight_shipping;
    this.uom = uom;
    this.uom_shipping = uom_shipping;
    this.lead_time_to_ship = lead_time_to_ship;
    this.color_list = color_list;
    this.reorder_level = reorder_level;
    this.header = header;
    this.footer = footer;
    this.is_taxed = is_taxed;
    this.image_small = image_small;
    this.image_medium = image_medium;
    this.image_large = image_large;
    this.image_list = image_list;
    this.variant_name1 = variant_name1;
    this.variant_name2 = variant_name2;
    this.variant_name3 = variant_name3;
    this.product_order = product_order;
    this.manufacturer = manufacturer;
    this.upc = upc;
    this.country_made_in = country_made_in;
    this.model_number = model_number;
    this.legal_disclaimer = legal_disclaimer;
    this.scent = scent;
    this.flavor = flavor;
    this.age_minimum = age_minimum;
    this.age_maximum = age_maximum;
    this.video_link = video_link;
    this.date_featured_expiry = date_featured_expiry;
    this.date_launch = date_launch;
    this.date_release = date_release;
    this.productCode = productCode;
    this.productName = productName;
    this.productName_ar = productName_ar;
    this.sellerId = sellerId;
    this.domainName = domainName;
    this.sellerName = sellerName;
    this.categoryId = categoryId;
    this.categoryName = categoryName;
    this.categoryCode = categoryCode;
    this.skuParent = skuParent;
    this.brandName = brandName;
    this.imageUrlMain = imageUrlMain;
    this.imageUrlOther1 = imageUrlOther1;
    this.imageUrlOther2 = imageUrlOther2;
    this.imageUrlOther3 = imageUrlOther3;
    this.imageUrlOther4 = imageUrlOther4;
    this.imageUrlOther5 = imageUrlOther5;
    this.imageUrlOther6 = imageUrlOther6;
    this.imageUrlOther7 = imageUrlOther7;
    this.currencyCode = currencyCode;
    this.unitCost = unitCost;
    this.unitPrice = unitPrice;
    this.altPrice = altPrice;
    this.unitsInStock = unitsInStock;
    this.deliveryDays = deliveryDays;
    this.is_recyclable = is_recyclable;
    this.status = status;
    this.modified_at = modified_at;
    this.created_at = created_at;

  }
}
