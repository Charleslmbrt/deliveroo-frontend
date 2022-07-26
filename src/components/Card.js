import { useState } from "react";
import bgDeliveroo from "../assets/img/bg-deliveroo.svg";

const Card = ({ dish }) => {
  const [counter, setCounter] = useState([0]);

  const handleClickCartAdd = () => {
    const newCounter = [...counter];
    newCounter = newCounter + 1;
    setCounter(newCounter);
  };

  return (
    <div className="card-dish">
      <div onClick={handleClickCartAdd} className="dish">
        <div className="dish-text">
          <h3>{dish.title}</h3>
          <p className="dish-description">{dish.description}</p>
          <p className="dish-price">{dish.price}</p>
          <div className="tag">{dish.popular}</div>
        </div>
        <img
          className="dish-picture"
          src={dish.picture ? dish.picture : bgDeliveroo}
          alt=""
        />
      </div>
    </div>
  );
};

export default Card;
