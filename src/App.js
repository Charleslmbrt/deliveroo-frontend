import { useState, useEffect } from "react";
import "./App.scss";
import axios from "axios";
import Header from "./components/Header";
import bgDeliveroo from "./assets/img/bg-deliveroo.svg";
// import Card from "./components/Card";

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState([]);
  const [counter, setCounter] = useState([]);
  const [total, setTotal] = useState([]);

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

  // const newTotal = counter + 2.5;

  const handleClickCartAdd = (index) => {
    const newTitle = [...title];
    newTitle[index] = newTitle + data.categories[0].meals[0].title;
    setTitle(newTitle);

    const newCounter = [...counter];
    newCounter[index] = newCounter + data.categories[0].meals[0].price;
    setCounter(newCounter);

    const newTotal = [...total];
    let totalMeal = data.categories[0].meals[0].price;
    let fraisDeLivraison = 2.5;
    newTotal[index] = newTotal + totalMeal + fraisDeLivraison;
    setTotal(newTotal);
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
                                    handleClickCartAdd(index);
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
              {/* //dklfslkfjgkldfjglkfdjgjdlfkj //dklfslkfjgkldfjglkfdjgjdlfkj
              //dklfslkfjgkldfjglkfdjgjdlfkj //dklfslkfjgkldfjglkfdjgjdlfkj
              //dklfslkfjgkldfjglkfdjgjdlfkj //dklfslkfjgkldfjglkfdjgjdlfkj */}
              <div className="shopping-cart">
                <div className="shopping-cart-card">
                  <button>Valider mon panier</button>
                  <div className="cart-validate">
                    <p>{title}</p>
                    <p>{counter}</p>
                    <p>{total}</p>
                  </div>
                </div>
              </div>
              {/* //dklfslkfjgkldfjglkfdjgjdlfkj //dklfslkfjgkldfjglkfdjgjdlfkj
              //dklfslkfjgkldfjglkfdjgjdlfkj //dklfslkfjgkldfjglkfdjgjdlfkj
              //dklfslkfjgkldfjglkfdjgjdlfkj //dklfslkfjgkldfjglkfdjgjdlfkj */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
