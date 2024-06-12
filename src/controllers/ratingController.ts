import { Request, Response } from 'express';
import { RatingService } from '../services/ratingService';

const ratingService = new RatingService();

export const getRatingsForBookController = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    const ratings = await ratingService.getRatingsForBook(bookId);

    if (!ratings || ratings.length === 0) {
      return res.status(404).json({ message: 'No ratings found for this book' });
    }

    res.status(200).json(ratings);
  } catch (error) {
    console.error('Error fetching ratings:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};




export const addRatingController = async (req: Request, res: Response) => {
    try {
      const { bookId } = req.params;
      const { rating } = req.body;
      const userId = (req as any).user.id;
  
      if (!rating || rating < 1 || rating > 5) {
        return res.status(400).json({ message: 'Rating must be a number between 1 and 5.' });
      }
  
      const newRating = await ratingService.addRating({  userId, bookId, rating });
  
      res.status(201).json(newRating);
    } catch (error) {
      console.error('Error adding rating:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };