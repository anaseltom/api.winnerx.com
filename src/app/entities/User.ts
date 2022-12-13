export default class User {
  id: number = 0;
  first_name: string = "";
  last_name: string = "";
  email: string = "";
  password: string = "";
  country: string = "";
  role: string = "";
  permissions: string = "";
  org_name: string = "";
  session: string = "";
  email_status: string = "";
  user_type: string = "";
  status: string = "";
  profile_url: string = "";
  modified_at: string = "";
  created_at: string = "";

  constructor(
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    country: string,
    role: string,
    permissions: string,
    org_name: string,
    session: string,
    email_status: string,
    user_type: string,
    profile_url: string,
    status: string,
    modified_at: string,
    created_at: string
  ) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.password = password;
    this.country = country;
    this.role = role;
    this.permissions = permissions;
    this.org_name = org_name;
    this.session = session;
    this.email_status = email_status;
    this.user_type = user_type;
    this.status = status;
    this.profile_url = profile_url;
    this.modified_at = modified_at;
    this.created_at = created_at;
  }
}
