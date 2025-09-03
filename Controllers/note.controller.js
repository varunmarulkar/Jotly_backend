import NoteModel from "../Models/Note.model.js";


export async function createNote(req, res) {
    try {
        const { title, content } = req.body
        const userId = req.user._id

        if (!title || !content) {
            return res.status(400).json({ message: "Title and Content are required" })
        }

        const newNote = await NoteModel.create({ title, content, user: userId })
        res.status(201).json({ message: "Note created", newNote })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


export async function getNotes(req, res) {
    try {
        const userId = req.user._id
        const notes = await NoteModel.find({ user: userId }).sort({ createdAt: -1 })
        res.status(200).json(notes)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


export async function deleteNotes(req,res){
    try {
        const {noteId}=req.params
        const userId=req.user._id
    
        const note=await NoteModel.findOne({_id:noteId, user:userId})
        if(!note) {
            return res.status(400).json({message:"note not found"})
        }

        await note.deleteOne();
        res.status(200).json({message:"Note delete successfully"})
    } catch (error) {
        res.status(500).json({message:error.message})
    }

}