import MealItem from "./MealItem";
import useHttp from "../hooks/useHttp";


export default function Meals(){
    
    const {
        data:loadedMeals, 
        isLoading,
        error
    } = useHttp('http://localpost:3000/meals',{},[])

    if(isLoading){
        <p>Fetching meals ...</p>
    }
    
    return (
        <ul id="meals">
          {loadedMeals.map((meal)=> (
            <MealItem key={meal.id} meal={meal}/>
            ))}
        </ul>
    )
}