import {Rating,RatingAttributes} from '../models/ratingModel';

export class RatingService {
    public async getRatingsForBook(bookId: string): Promise<Rating[]> {
      return Rating.findAll({
        where: { bookId },
    
      });
    }


    public async addRating(data: Partial<RatingAttributes>): Promise<Rating> {
        if (!data.userId || !data.bookId) {
          throw new Error('UserId and BookId are required');
        }
        const newRating = await Rating.create(data as RatingAttributes);
        return newRating;
      }
  }