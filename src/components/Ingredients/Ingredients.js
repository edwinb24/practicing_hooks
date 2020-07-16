import React, { useReducer, useState, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList'
import ErrorModal from "./../UI/ErrorModal"

const ingredientsReducer = (currentIngredients, action) => {
  switch (action.type) {
    case 'SET':
      return action.ingredients
    case 'ADD':
      return [...currentIngredients, action.ingredient]
    case 'DELETE':
      return currentIngredients.filter(ing => ing.id !== action.id)
    default:
      throw new Error("Opps...")
  }
}

const Ingredients = props => {
  const [userIngredients, dispatch] = useReducer(ingredientsReducer, [])
  // const [userIngredients, setUserIngredients] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()

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
    setIsLoading(true)
    fetch(
      'https://react-hooks-update-9c3e3.firebaseio.com/ingredients.json',
      {
        method: "POST",
        body: JSON.stringify(inputIngredient),
        headers: { 'Content-Type': 'application/json' }
      }
    )
      .then(resp => {
        setIsLoading(false)
        return resp.json()
      })
      .then(responseData => {
        // setUserIngredients(prevIngredients =>
        //   [
        //     ...prevIngredients,
        //     { id: responseData.name, ...inputIngredient }
        //   ]
        // )
        dispatch({ type: "ADD", ingredient: { id: responseData.name, ...inputIngredient } })
      })
  }

  const removeIngredientHandler = id => {
    setIsLoading(true)
    fetch(`https://react-hooks-update-9c3e3.firebaseio.com/ingredients/${id}.json`,
      {
        method: "DELETE"
      }
    )
      .then(() => {
        setIsLoading(false)
        dispatch({ type: "DELETE", id: id })
        // setUserIngredients(prevIngredients =>
        //   prevIngredients.filter((ingredient) => ingredient.id !== id)
        // )  
      })
      .catch(error => {
        setIsLoading(false)
        setError("Something Went Wrong")
      })
  }

  const filterIngredientsHandler = useCallback(filteredIngredients => {
    // setUserIngredients(filteredIngredients)
    dispatch({ type: 'SET', ingredients: filteredIngredients })
  }, [])

  const clearError = () => {
    setError(null)
  }
  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
      <IngredientForm onAddIngredient={addIngredientHandler} loading={isLoading} />

      <section>
        <Search onLoadIngredients={filterIngredientsHandler} />
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
