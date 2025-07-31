class FollowerModel {
    public userId: number;
    public vacationId: number;

    public constructor(follower: FollowerModel) {
        this.userId = follower.userId;
        this.vacationId = follower.vacationId;
    }
}

export default FollowerModel;