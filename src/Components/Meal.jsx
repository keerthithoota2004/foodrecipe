import React, { useState, useEffect } from "react";
import MealItem from "./Mealitem";
import RecipeIndex from "./RecipeIndex";

const Meal = () => {
    const [url, setUrl] = useState("http://www.themealdb.com/api/json/v1/1/search.php?f=a");
    const [item, setItem] = useState();
    const [show, setShow] = useState(false);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetch(url)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => {
                console.log(data.meals);
                setItem(data.meals);
                setShow(true);
            })
            .catch(error => {
                console.error("Fetch error:", error);
                setShow(false);
            });
    }, [url]);

    const setIndex = (alpha) => {
        setUrl(`http://www.themealdb.com/api/json/v1/1/search.php?f=${alpha}`);
    };

    const searchRecipe = (evt) => {
        if (evt.key === "Enter") {
            setUrl(`http://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
        }
    };

    return (
        <>
            <div className="main">
                <div className="heading">
                    <h1>Search for food recipe</h1>
                    <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, incidunt.</h4>
                </div>
                <div className="searchBox">
                    <input
                        type="search"
                        className="search-bar"
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyPress={searchRecipe}
                    />
                </div>
                <div className="container">
                    {show ? <MealItem data={item} /> : "Not found"}
                </div>
                <div className="indexContainer">
                    <RecipeIndex alphaIndex={(alpha) => setIndex(alpha)} />
                </div>
            </div>
        </>
    );
};

export default Meal;
