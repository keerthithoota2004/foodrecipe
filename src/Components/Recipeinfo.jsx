import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const RecipeInfo = () => {
    const [item, setItem] = useState(null);
    const [vId, setVId] = useState("");
    const { idMeal } = useParams();

    useEffect(() => {
        if (idMeal) {
            fetch(`http://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
                .then(res => res.json())
                .then(data => {
                    const meal = data.meals[0];
                    setItem(meal);

                    // Extract YouTube video ID
                    if (meal.strYoutube) {
                        const url = meal.strYoutube;
                        const str = url.split("=");
                        setVId(str[str.length - 1]);
                    }
                })
                .catch(error => console.error('Error fetching data:', error));
        }
    }, [idMeal]);

    return (
        <>
            {
                !item ? (
                    <p>Loading...</p>
                ) : (
                    <div className="content">
                        <img src={item.strMealThumb} alt={item.strMeal} />
                        <div className="inner-content">
                            <h1>{item.strMeal}</h1>
                            <h2>{item.strArea}</h2>
                            <h3>{item.strCategory}</h3>
                        </div>
                        <div className="recipe-details">
                            <div className="ingredients">
                                <h2>Ingredients</h2>
                                {Array.from({ length: 8 }).map((_, index) => {
                                    const ingredient = item[`strIngredient${index + 1}`];
                                    const measure = item[`strMeasure${index + 1}`];
                                    return ingredient ? (
                                        <h4 key={index}>{ingredient}: {measure}</h4>
                                    ) : null;
                                })}
                            </div>
                            <div className="instructions">
                                <h2>Instructions</h2>
                                <h4>{item.strInstructions}</h4>
                            </div>
                            <div className="video">
                                {vId && (
                                    <iframe
                                        width="560"
                                        height="315"
                                        src={`https://www.youtube.com/embed/${vId}`}
                                        title="YouTube video player"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                )}
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default RecipeInfo;
