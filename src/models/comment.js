export default class Comment {
    constructor(ratingUserUsername, ratedUserUsername, rating, content) {
        this.ratingUserUsername = ratingUserUsername;
        this.ratedUserUsername = ratedUserUsername;
        this.rating = rating;
        this.content = content;
    }
}
