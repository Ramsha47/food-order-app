import { useDispatch} from 'react-redux';
import { currencyFormatter } from '../util/formatting';
import Button from './UI/Button';
import { addItem } from '../store/cartSlice';

export default function MealItem({ meal }) {
  const dispatch = useDispatch();
  
  const handleAddMealItem = () => {
    console.log('Adding meal to cart:', meal);
    dispatch(addItem(meal));
  };

  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">{currencyFormatter.format(meal.price)}</p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={handleAddMealItem}>Add to Cart</Button>
        </p>
      </article>
    </li>
  );
}