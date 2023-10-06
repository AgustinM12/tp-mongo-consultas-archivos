import {Router} from "express"
import { ctrlCreateAuthor } from "../controllers/Author.controller.js"
import { ctrlCreateBook, ctrlFindBooks } from "../controllers/Book.controller.js"
export const authorRouter = Router()
export const bookRouter = Router()

//AUTHOR ROUTES
authorRouter.post("/createAuthor", ctrlCreateAuthor)

//BOOKS ROUTES
bookRouter.post("/createBook", ctrlCreateBook)

bookRouter.get("/findBooks", ctrlFindBooks)