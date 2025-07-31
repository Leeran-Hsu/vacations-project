class AppConfig {
    public readonly loginUrl = "http://localhost:4000/api/login/";
    public readonly registerUrl = "http://localhost:4000/api/register/";
    public readonly vacationsUrl = "http://localhost:4000/api/vacations/";
    public readonly vacationByIdUrl = "http://localhost:4000/api/vacation-by-id/";
    public readonly followedVacationsByUserUrl = "http://localhost:4000/api/followed-vacations/";
    public readonly futureVacationsUrl = "http://localhost:4000/api/future-vacations/";
    public readonly ongoingVacationsUrl = "http://localhost:4000/api/ongoing-vacations/";
    public readonly followersUrl = "http://localhost:4000/api/followers/";
    public readonly followersByVacationUrl = "http://localhost:4000/api/followers-by-vacation/";
    public readonly isFollowingByUserUrl = "http://localhost:4000/api/is-following-by-user/";
}

const appConfig = new AppConfig();

export default appConfig;
