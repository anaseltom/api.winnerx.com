export default class OTP {
    private id: number;
    private otp: number;
    private email: string;
    private status: string;
    private ts: string;

    constructor(
        id: number,
        otp: number,
        email: string,
        status: string,
        ts: string,
    ) {
        this.id = id;
        this.otp = otp;
        this.email = email;
        this.status = status;
        this.ts = ts;
    }
}