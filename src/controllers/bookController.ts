import { Request, Response } from "express";
import {bookService,checkAdmin} from '../services/bookService';


const bookservice = new bookService();


export const getbooks = async (req:Request,res:Response)=>{
    const allbooks = await bookservice.booklist();
    res.json(allbooks);
}

export const getbookbyid = async(req:Request,res:Response)=>{
    const bookid = req.params.id;
    const book = await bookservice.bookbyid(bookid);
    res.json(book);
}

export const createBookController = async (req:Request,res:Response) =>{
    
        try {

        const user = (req as any).user;
        if (!user || !user.id) {
            return res.status(403).json({ message: 'Forbidden. User not authenticated.' });
        }
        const isAdmin = await checkAdmin(user.id);

        if (!isAdmin) {
            return res.status(403).json({ message: 'Forbidden. Only admin users can create books.' });
        }
        const {authorIds } = req.body;
        const newBook = await bookservice.createbook(req.body,authorIds);
        res.status(201).json(newBook);
    } catch (error) {
        console.error('Error creating book:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
    
}


export const updateBookController = async (req: Request, res: Response) => {
    try {
       
        const user = (req as any).user;
        if (!user || !user.id) {
            return res.status(403).json({ message: 'Forbidden. User not authenticated.' });
        }
        const isAdmin = await checkAdmin(user.id);

        if (!isAdmin) {
            return res.status(403).json({ message: 'Forbidden. Only admin users can create books.' });
        }
        const bookId = req.params.id;
        const {authorIds } = req.body;
        const updatedBook = await bookservice.updateBook(bookId, req.body,authorIds);
        
        res.status(200).json(updatedBook);
    } catch (error) {
        console.error('Error updating book:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



export const delelteBookController = async (req: Request, res: Response) => {
    try {
        
        const user = (req as any).user;
        if (!user || !user.id) {
            return res.status(403).json({ message: 'Forbidden. User not authenticated.' });
        }
        const isAdmin = await checkAdmin(user.id);

        if (!isAdmin) {
            return res.status(403).json({ message: 'Forbidden. Only admin users can create books.' });
        }
        const bookId = req.params.id;
        const deletedBook = await bookservice.deleteBook(bookId);
        res.json({ message: 'Book Deleted Successfully' });
        
        res.status(200).json(deletedBook);
    } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

