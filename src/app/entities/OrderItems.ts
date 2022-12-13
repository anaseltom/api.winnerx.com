export default class Orders {
    id: number = 0;
    order_id: number = 0;
    product_id: number = 0;
    quantity: number = 0;
    price: number = 0;
    remarks: string = "";
    fulfillment_status: string = "";
    status: string = "";
    modified_at: string = "";
    created_at: string = "";
  
    constructor(
      id: number,
      order_id: number,
      product_id: number,
      quantity: number,
      price: number,
      remarks: string,
      fulfillment_status: string,
      status: string,
      modified_at: string,
      created_at: string
    ) {
      this.id = id;
      this.order_id = order_id;
      this.product_id=product_id;
      this.quantity=quantity;
      this.price=price;
      this.remarks = remarks;
      this.fulfillment_status = fulfillment_status;
      this.status = status;
      this.modified_at = modified_at;
      this.created_at = created_at;
    }
  }
  