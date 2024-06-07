import express, { Request, Response } from "express"
import Movie from "../models/movies";

const router = express.Router();

router.get("/movies", async(req: Request, res: Response) => {
    try {
        const movies = await Movie.find();
        res.json(movies)
    } catch (error) {
        return res.status(500).json({message: "Error Fetching Movies"});
    }
});

router.get("/search", async(req: Request, res: Response) => {
    try {
        const movies = await Movie.find({ title: req.query.title}).select("title year genre banner_image");
        console.log(movies)
        res.json(movies)
    } catch (error) {
        return res.status(500).json({message: "Error Fetching Movies"});
    }
});

router.get("/search-with-id", async(req: Request, res: Response) => {
    try {
        const id = await req.body.id.split(',')
        console.log("Id Passed =>", id)
        const movies = await Movie.find({ _id: req.query.id}).select("title year genre banner_image");
        console.log(movies)
        res.json(movies)
    } catch (error) {
        return res.status(500).json({message: "Error Fetching Movies"});
    }
});

export default router;