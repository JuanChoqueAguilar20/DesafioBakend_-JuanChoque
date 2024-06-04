import express from "express";

import {    
    createHotel,
    updateHotel, 
    deleteHotel,
    getHotel, 
    getHotels }
    from "../controllers/hotel.controller.js";

const router = express.Router();

//create
router.post("/", createHotel);

//update
router.put("/:id", updateHotel);

//delete
router.delete("/:id", deleteHotel);

//get
router.get("/:id", getHotel);

//get all
router.get("/", getHotels);
    

/* console.log("hi, en una ruta de hotel");
error para auntenticarse
const failed = true;
if(failed) return next(createError(401, "you are not authenticated!"))*/

export default router