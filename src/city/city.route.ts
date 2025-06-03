import { Router } from "express";
import { createCity, deleteCity, getCities, getCityById, updateCity } from "./city.controller";
 
export const cityRouter = Router();
 
// User routes definition
 
 
// Get all users
cityRouter.get('/city', getCities);
 
// Get user by ID
cityRouter.get('/city/:id', getCityById);
 
// Create a new user
cityRouter.post('/city', createCity);
 
// Update an existing user
cityRouter.put('/city/:id',updateCity);
 
 
// Delete an existing user
cityRouter.delete('/city/:id', deleteCity);