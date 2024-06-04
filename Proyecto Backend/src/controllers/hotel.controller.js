import Hotel from "../models/Hotel.js";


//!De router post
export const createHotel =  async (req, res, next) => {
    const newHotel = new Hotel ( req.body);

    try{
    const saveHotel = await newHotel.save()
    res.status(200).json(saveHotel);
    } catch(err){
    next(err);
    }
}

//!De router update
export const updateHotel = async ( req, res, next) => {
    try{
        const updateHotel = await Hotel.findByIdAndUpdate(
            req.params.id, 
            { $set: req.body}, 
            {new: true, runValidator:true})
        res.status(200).json(updateHotel);

    } catch(err){
        next(err);
    }
}

//!De router delete
export const deleteHotel = async (req, res, next) => {
    try{
        await Hotel.findByIdAndDelete(req.params.id), 
        res.status(200).json("Hotel eliminado");

    } catch(err){
        next(err);
    }

}

//!De router get
export const getHotel = async (req, res, next) => {
    try{
        const hotel= await Hotel.findById(req.params.id);
        res.status(200).json(hotel);

    } catch(err){
        next(err);
    }
}

//! De router getall
export const getHotels = async (req, res, next) => {
    try{
        const hotels = await Hotel.find()
        res.status(200).json(hotels);

    } catch(err){
        next(err);
    }
}
