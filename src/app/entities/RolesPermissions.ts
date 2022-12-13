export default class RolesPermissions {
    public id: number = 0;
    public role: string;
    public permissions: {};
    public user_id: number = 0; 
    public email: string = '';
    public org_id: number = 0;
    public status: string = '';
    public modified_at: string = '';
    public created_at: string = '';

    constructor(
        role: string,
        permissions: {},
        id?: number,
        user_id?: string,
        email?: string,
        org_id?: string,
        status?: string,
        modified_at?: string,
        created_at?: string,
    ) {
        this.role = role;
        this.permissions = permissions;
    }
}