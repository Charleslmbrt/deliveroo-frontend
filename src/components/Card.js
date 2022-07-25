const Card = ({ dish }) => {
  return (
    <div className="card-dish">
      <div className="dish">
        <div className="dish-text">
          <h3>{dish.title}</h3>
          <p className="dish-description">{dish.description}</p>
          <p className="dish-price">{dish.price}</p>
          <div className="tag">{dish.popular}</div>
        </div>
        <img className="dish-picture" src={dish.picture} alt="Dish picture" />
      </div>
    </div>
  );
};

export default Card;
