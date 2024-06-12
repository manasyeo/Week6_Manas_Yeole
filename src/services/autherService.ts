import {Author,AuthorAttributes} from '../models/autherModel';
import {Book} from '../models/bookModel'

export class authorService{
    public async autherlist():Promise<Author[]>{
        const authors = await Author.findAll();
        return authors;
    }


    public async  autherbyid(id:string):Promise<Author | null>{
        const author = await Author.findByPk(id ,{
            include: [{ model: Book, attributes: ['id', 'title', 'description', 'publishedYear', 'price'] }]
          });
      
        return author;
    }


    public async createauthor(data:AuthorAttributes): Promise<Author>{
        const newauthor = await Author.create(data);
        return newauthor
    }

    public async updateAuthor(id: string,data:Partial<AuthorAttributes>):Promise<Author | null>{
        const existingAuthor = await Author.findByPk(id);
        if (!existingAuthor) {
            throw new Error('Author not found');
        }
        const updatedauthor = await existingAuthor.update(data);
        return updatedauthor;
    }

    public async deleteAuthor(id:string):Promise<void>{
        const author = await Author.findByPk(id);
        if (author)
            {
                await author.destroy();
            }
        else{
            throw new Error('Author not found');
        }
    }

}
