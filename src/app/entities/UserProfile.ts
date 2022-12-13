export default class UsersProfile {
  id: number = 0;
  user_id: number = 0;
  email: string = "";
  first_name: string = "";
  last_name: string = "";
  gender: string = "";
  mobile_no: string = "";
  birthdate: string = "";
  country: string = "";
  region: string = "";
  city: string = "";
  address: string = "";
  certifications: string = "";
  experience_info: string = "";
  nationality: string = "";
  skills: string = "";
  tin: string = "";
  title: string = "";
  transport: string = "";
  years_experience: string = "";
  about_me: string = "";
  profile_pic: string = "";
  passport_front: string = "";
  passport_back: string = "";
  national_id: string = "";
  objective: string = "";
  status: string = "";
  modified_at: string = "";
  created_at: string = "";

  constructor(
    id: number,
    user_id: number,
    email: string,
    first_name: string,
    last_name: string,
    gender: string,
    mobile_no: string,
    birthdate: string,
    country: string,
    region: string,
    city: string,
    address: string,
    certifications: string,
    experience_info: string,
    nationality: string,
    skills: string,
    tin: string,
    title: string,
    transport: string,
    years_experience: string,
    about_me: string,
    profile_pic: string,
    passport_front: string,
    passport_back: string,
    national_id: string,
    objective: string,
    status: string,
    modified_at: string,
    created_at: string
  ) {
    this.id = id;
    this.user_id = user_id;
    this.email = email;
    this.first_name = first_name;
    this.last_name = last_name;
    this.gender = gender;
    this.mobile_no = mobile_no;
    this.birthdate = birthdate;
    this.country = country;
    this.region = region;
    this.city = city;
    this.address = address;
    this.certifications = certifications;
    this.experience_info = experience_info;
    this.nationality = nationality;
    this.skills = skills;
    this.tin = tin;
    this.title = title;
    this.transport = transport;
    this.years_experience = years_experience;
    this.about_me = about_me;
    this.profile_pic = profile_pic;
    this.passport_front = passport_front;
    this.passport_back = passport_back;
    this.national_id = national_id;
    this.objective = objective;
    this.status = status;
    this.modified_at = modified_at;
    this.created_at = created_at;
  }
}
