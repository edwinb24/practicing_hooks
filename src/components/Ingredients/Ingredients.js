import React, { useState } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList'

function Ingredients(props) {
  let [userIngredients, setUserIngredients] = useState([])

  const addIngredientHandler = inputIngredient => {
    setUserIngredients(prevIngredients =>
      [
        ...prevIngredients,
        { id: Math.random().toString(), ...inputIngredient }
      ]
    )
  }

  const removeIngredientHandler = id => {
        setUserIngredients(prevIngredients => 
          prevIngredients.filter((ingredient) => ingredient.id !== id)
        )
  }

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search />
        {/* Need to add list here! */}
      </section>
      <IngredientList
        ingredients={userIngredients}
        onRemoveItem={removeIngredientHandler}
      />
    </div>
  );
}

export default Ingredients;
