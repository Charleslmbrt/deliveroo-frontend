import { useState, useEffect } from "react";
import "./App.scss";
import axios from "axios";
import Header from "./components/Header";
import Card from "./components/Card";

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

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
                    <div key={index} className="container-food">
                      <h2>{category.name}</h2>
                      <div className="global-card">
                        {category.meals.map((dish, index) => {
                          return (
                            <>
                              <Card dish={dish} key={index} />
                              {/* <Card dish={dish} /> */}
                            </>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="shopping-cart"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
