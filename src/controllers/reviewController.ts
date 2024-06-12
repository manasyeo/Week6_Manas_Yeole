import { Request, Response } from "express";
import {checkAdmin} from '../services/bookService';
import { reviewService } from "../services/reviewService";


const reviewservice = new reviewService();


export const getBookReviewsController = async (req: Request, res: Response) => {
    try {
        const { bookId } = req.params;
        const reviews = await reviewservice.getBookReviews(bookId);

        if (!reviews) {
            return res.status(404).json({ message: 'Book not found or no reviews available' });
        }

        res.json(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



export const addBookReviewController = async (req: Request, res: Response) => {
    try {
        const { bookId } = req.params;
        const { content } = req.body;
        const user = (req as any).user;

        if (!content) {
            return res.status(400).json({ message: 'Content is required' });
        }

        const newReview = await reviewservice.addBookReview(req.body);
        res.status(201).json(newReview);
    } catch (error) {
        console.error('Error adding review:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteReviewController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = (req as any).user;
        
        const isAdmin = await checkAdmin(user.id);

        await reviewservice.deleteReview(id, user.id, isAdmin);

        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        console.error('Error deleting review:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};