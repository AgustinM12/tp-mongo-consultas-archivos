import {Router} from "express"
import { ctrlCreateAuthor, ctrlFindAuthor, ctrlUpdateAuthor, ctrlFindAllAuthors, ctrlDeleteAuthor } from "../controllers/Author.controller.js"
import { ctrlCreateBook, ctrlFindAllBooks, ctrlUpdateBook, ctrlFindBook, ctrlDeleteBook,ctrlChangeBookAuthor, ctrlFindBookGenre } from "../controllers/Book.controller.js"
export const authorRouter = Router()
export const bookRouter = Router()

//AUTHOR ROUTES
authorRouter.post("/createAuthor", ctrlCreateAuthor)

authorRouter.get("/findAllAuthors", ctrlFindAllAuthors)

authorRouter.get("/findAuthor/:id", ctrlFindAuthor)

authorRouter.put("/updateAuthor/:id", ctrlUpdateAuthor)

authorRouter.delete("/deleteAuthor/:id", ctrlDeleteAuthor)

//BOOKS ROUTES
bookRouter.post("/createBook", ctrlCreateBook)

bookRouter.get("/findBooks", ctrlFindAllBooks)

bookRouter.get("/findBook/:id", ctrlFindBook)

bookRouter.put("/updateBook/:id", ctrlUpdateBook)

bookRouter.delete("/deleteBook/:id", ctrlDeleteBook)

bookRouter.put("/updateBookAuthor", ctrlChangeBookAuthor)

bookRouter.get("/findBookGenre", ctrlFindBookGenre)