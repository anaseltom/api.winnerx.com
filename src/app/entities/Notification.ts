export default class Notifications {
//   id: number = 0;
  org_id: string = "";
  email: string = "";
  message: string = "";
  message_type: string = "";
  serial: string = "";
  status: string = "";
  subject: string = "";
  created: string = "";
  
  modified_at: string = "";
  created_at: string = "";

  constructor(
    // id: number,
    org_id: string,
    email: string,
    message: string,
    message_type: string,
    serial: string,
    status: string,
    subject: string,
    created?: string,
    modified_at?: string,
    created_at?: string
  ) {
    // this.id = id;
    this.org_id = org_id;
    this.email = email;
    this.message = message;
    this.message_type = message_type;
    this.serial = serial;
    this.status = status;
    this.subject = subject;
    this.modified_at= new Date().toDateString();
    this.created_at= new Date().toDateString();
    this.preProcess();
  }

  preProcess = () => {
    // this.name = this.name.toUpperCase();

    return {
    //   id: this.id,
      org_id: this.org_id,
      email: this.email,
      message: this.message,
      message_type: this.message_type,
      serial: this.serial,
      status: this.status,
      subject: this.subject,
      created: this.created,
      modified_at: this.modified_at,
      created_at: this.created_at,
    };
  };
}
