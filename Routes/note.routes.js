import { createNote, deleteNotes, getNotes } from "../Controllers/note.controller.js";
import { VerifyToken } from "../Middleware/Auth.js";

export function noteRoutes(app){
    app.post("/note",VerifyToken,createNote)
    app.get("/notes",VerifyToken,getNotes)
    app.delete("/:noteId",VerifyToken,deleteNotes)
}