import { Review,ReviewAttributes } from "../models/reviewModel";


export class reviewService{
    public async getBookReviews(bookId: string): Promise<Review[] | null> {
        const reviews = await Review.findAll({ where: { bookId } });

        if (!reviews.length) {
            return null;
        }

        return reviews;
    }

    public async addBookReview(data:ReviewAttributes): Promise<Review> {
        return await Review.create(data);
}


public async deleteReview(reviewId: string, userId: string, isAdmin: boolean): Promise<void> {
    const review = await Review.findByPk(reviewId);

    if (!review) {
        throw new Error('Review not found');
    }

    if (review.userId !== userId && !isAdmin) {
        throw new Error('Forbidden. Only admin or the review author can delete the review.');
    }

    await review.destroy();
}
}