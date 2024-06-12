import {Book,BookAttributes} from '../models/bookModel'
import {User} from '../models/userModel';
import { Author } from '../models/autherModel';

export class bookService{
    public async booklist():Promise<Book[]>{
        const books = await Book.findAll();
        return books;
    }


    public async  bookbyid(id:string):Promise<Book | null>{
        const abook = await Book.findByPk(id);
        return abook;
    }


    public async createbook(data:BookAttributes,authorIds: string[]):Promise<Book>{
        const newbook = await Book.create(data);
    if (authorIds && authorIds.length > 0) {
      const authors = await Author.findAll({
        where: { id: authorIds }
      });
      await (newbook as any).setAuthors(authors);
    }
    return newbook;
  }

    public async updateBook(id: string,data:Partial<BookAttributes>,authorIds: string[]):Promise<Book | null>{
        const book = await Book.findByPk(id);
    if (book) {
      await book.update(data);
      if (authorIds && authorIds.length > 0) {
        const authors = await Author.findAll({
          where: { id: authorIds }
        });
        await (book as any).setAuthors(authors); 
      }
      return book;
    }
    return null;
  }


    public async deleteBook(id:string):Promise<void>{
        const book = await Book.findByPk(id);
        if (book)
            {
                await book.destroy();
            }
        else{
            throw new Error('Book not found');
        }
    }
}


export const checkAdmin = async (userId: string) => {
    try {

      const user = await User.findByPk(userId);
  
     
      if (user && user.isAdmin) {
        return true; 
      } else {
        return false; 
      }
    } catch (error) {
      console.error('Error checking admin status:', error);
      throw new Error('Internal server error');
    }
  };
  


