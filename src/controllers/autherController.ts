import { Request, Response } from "express";
import {authorService} from '../services/autherService';
import { checkAdmin } from "../services/bookService";

const authorservice = new authorService();


export const getauthors = async (req:Request,res:Response)=>{
    const allbooks = await authorservice.autherlist();
    res.json(allbooks);
}

export const getauthorbyid = async(req:Request,res:Response)=>{
    const authorid = req.params.id;
    const author = await authorservice.autherbyid(authorid);
    res.json(author);
}

export const createAuthorController = async (req:Request,res:Response) =>{
    
    try {
    const user = (req as any).user;
    if (!user || !user.id) {
        return res.status(403).json({ message: 'Forbidden. User not authenticated.' });
    }
    const isAdmin = await checkAdmin(user.id);

    if (!isAdmin) {
        return res.status(403).json({ message: 'Forbidden. Only admin users can create Authors.' });
    }
    const newauthor = await authorservice.createauthor(req.body);
    res.status(201).json(newauthor);
} catch (error) {
    console.error('Error creating author:', error);
    res.status(500).json({ message: 'Internal server error' });
}

}


export const updateAuthorController = async (req: Request, res: Response) => {
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
        const updatedauthor = await authorservice.updateAuthor(bookId, req.body);
        
        res.status(200).json(updatedauthor);
    } catch (error) {
        console.error('Error updating author:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



export const delelteAuthorController = async (req: Request, res: Response) => {
    try {
        
        const user = (req as any).user;
        if (!user || !user.id) {
            return res.status(403).json({ message: 'Forbidden. User not authenticated.' });
        }
        const isAdmin = await checkAdmin(user.id);

        if (!isAdmin) {
            return res.status(403).json({ message: 'Forbidden. Only admin users can create books.' });
        }
        const authorId = req.params.id;
        const deletedAuthor = await authorservice.deleteAuthor(authorId);
        res.json({ message: 'Author Deleted Successfully' });
        
        res.status(200).json(deletedAuthor);
    } catch (error) {
        console.error('Error deleting author:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
