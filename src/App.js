import React from 'react';
import Meal from './Components/Meal';
import './Components/style.css';
import RecipeInfo from './Components/Recipeinfo';
import { Routes,Route } from 'react-router-dom';

function App() {
  return (
    <>
    <Routes>
    <Route path="/" element={<Meal/>}/>
    <Route path="/:idMeal" element={<RecipeInfo/>}/>
    </Routes>
   
    </>
  )
}

export default App;

