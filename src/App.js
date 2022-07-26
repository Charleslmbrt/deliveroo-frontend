import { useState, useEffect } from "react";
import "./App.scss";
import axios from "axios";
import Header from "./components/Header";
import bgDeliveroo from "./assets/img/bg-deliveroo.svg";
// import Card from "./components/Card";

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://deliveroo-backend-orion22.herokuapp.com/"
        );

        setData(response.data);

        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  const handleClickCartAdd = (dish) => {
    dish.quantity = 1;
    const newCart = [...cart];
    newCart.push({
      id: dish.id,
      title: dish.title,
      quantity: dish.quantity,
      price: dish.price,
    });

    setCart(newCart);
  };

  return (
    <div className="App">
      {isLoading === true ? (
        <h1>En cours de chargement</h1>
      ) : (
        <div className="container">
          <Header data={data} />

          <div className="main">
            <div className="main-center">
              <div className="menu">
                {data.categories.map((category, index) => {
                  return (
                    category.meals.length > 0 && (
                      <div key={index} className="container-food">
                        <h2>{category.name}</h2>
                        <div className="global-card">
                          {category.meals.map((dish, index) => {
                            // return <Card dish={dish} key={index} />;
                            return (
                              <div key={index} className="card-dish">
                                <div
                                  onClick={() => {
                                    handleClickCartAdd(dish);
                                  }}
                                  className="dish"
                                >
                                  <div className="dish-text">
                                    <h3>{dish.title}</h3>
                                    <p className="dish-description">
                                      {dish.description}
                                    </p>
                                    <p className="dish-price">{dish.price}</p>
                                    <div className="tag">{dish.popular}</div>
                                  </div>
                                  <img
                                    className="dish-picture"
                                    src={
                                      dish.picture ? dish.picture : bgDeliveroo
                                    }
                                    alt=""
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )
                  );
                })}
              </div>

              <div className="shopping-cart">
                <div className="shopping-cart-card">
                  <button className="validate">Valider mon panier</button>

                  <div className="cart-validate">
                    {cart.map((dish, index) => {
                      return (
                        // <div key={dish.id} className="basket">
                        <div key={index} className="cart-container">
                          <div className="cart-items">
                            <div className="cart-items-line">
                              <div className="cart-items-counter">
                                {dish.quantity <= 0
                                  ? cart.splice(index, 1)
                                  : ""}
                                <button
                                  onClick={() => {
                                    const newCart = [...cart];
                                    newCart[index].quantity--;
                                    setCart(newCart);
                                  }}
                                >
                                  -
                                </button>
                                <h1>{dish.quantity}</h1>
                                <button
                                  onClick={() => {
                                    const newCart = [...cart];
                                    newCart[index].quantity++;
                                    setCart(newCart);
                                  }}
                                >
                                  +
                                </button>
                              </div>
                              <div className="cart-items-name">
                                {" "}
                                <p>{dish.title}</p>
                              </div>
                              <div className="cart-items-price">
                                <p>{(dish.price * dish.quantity).toFixed(2)}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    <div className="cart-result">
                      <div className="cart-result-line">
                        <div className="cart-result-name">
                          <p>Sous-total</p>
                        </div>
                        <div className="cart-result-price"></div>
                      </div>

                      <div className="cart-result-line">
                        <div className="cart-result-name">
                          <p>Frais de livraison</p>
                        </div>
                        <div className="cart-result-price">2.50€</div>
                      </div>
                    </div>

                    <div className="cart-total">
                      <div className="cart-total-name">TOTAL</div>
                      <div className="cart-total-price"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
