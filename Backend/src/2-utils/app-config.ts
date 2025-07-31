class AppConfig {

    // Server Port:
    public readonly port: number;

    // Database Host (on which computer the database exists):
    public readonly mySqlHost: string;

    // Database User
    public readonly mySqlUser: string;

    // Database Password: 
    public readonly mySqlPassword: string;

    // Database Name: 
    public readonly mySqlDatabase: string;

    // Domain Name:
    public readonly domainName: string;

    constructor() {
        this.port = parseInt(process.env.PORT || "4000", 10);
        this.mySqlHost = process.env.MYSQL_HOST || "localhost";
        this.mySqlUser = process.env.MYSQL_USER || "root";
        this.mySqlDatabase = process.env.MYSQL_DATABASE || "project-vacations";
        this.domainName = process.env.DOMAIN_NAME || `http://localhost:${this.port}`;
    }
}

const appConfig = new AppConfig();

export default appConfig;
