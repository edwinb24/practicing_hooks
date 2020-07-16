import React, { useState, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList'

function Ingredients(props) {
  let [userIngredients, setUserIngredients] = useState([])

  // useEffect(() => {
  //   fetch('https://react-hooks-update-9c3e3.firebaseio.com/ingredients.json')
  //     .then(resp => resp.json())
  //     .then(responseData => {
  //       const loadedIngredients = []
  //       console.log(responseData)
  //       for(const key in responseData) {

  //         loadedIngredients.push(
  //           {id:key, 
  //             title: responseData[key].title, 
  //             amount: responseData[key].amount
  //           }
  //         )
  //       }
  //       setUserIngredients(loadedIngredients)
  //     })
  // }, [])

  const addIngredientHandler = inputIngredient => {
    fetch(
      'https://react-hooks-update-9c3e3.firebaseio.com/ingredients.json',
      {
        method: "POST",
        body: JSON.stringify(inputIngredient),
        headers: { 'Content-Type': 'application/json' }
      }
    )
      .then(resp => resp.json())
      .then(responseData => {
        setUserIngredients(prevIngredients =>
          [
            ...prevIngredients,
            { id: responseData.name, ...inputIngredient }
          ]
        )
      })
  }

  const removeIngredientHandler = id => {
        fetch(`https://react-hooks-update-9c3e3.firebaseio.com/ingredients/${id}.json`, 
          {
            method: "DELETE"
          }
        )
      .then(() => {
        setUserIngredients(prevIngredients =>
          prevIngredients.filter((ingredient) => ingredient.id !== id)
        )  
      })  
  }

  const filterIngredientsHandler = useCallback(filteredIngredients => {
    setUserIngredients(filteredIngredients)
  }, [setUserIngredients])

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search onLoadIngredients={filterIngredientsHandler}/>
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
