export default class Email {
    private id: number;
    private otp: number;
    private email: string;
    private status: string;
    private modified_at: string;
    private created_at: string;

    constructor(
        id: number,
        otp: number,
        email: string,
        status: string,
        modified_at: string,
        created_at: string,
    ) {
        this.id = id;
        this.otp = otp;
        this.email = email;
        this.status = status;
        this.modified_at = modified_at;
        this.created_at = created_at;
    }
}