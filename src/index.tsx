import React from "react";
import { createRoot } from "react-dom/client";
import { pizzaData, Pizza } from './data';
import "./index.css";

const App = () => {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

const Header: React.FC = () => {
  return (
    <header className="header">
      <h1>Fast React Pizza Co.</h1>
    </header>

  );
}

const Menu: React.FC = () => {
  return (
    <main className="menu">
      <h2>Our menu</h2>
      {pizzaData.length > 0 ? (
        <> {/* use React.Fragment if is needs a key property */}
          <p>
            Authentic Italian cuisine. 6 creative dishes to choose from. All
            from our stone oven, all organic, all delicious.
          </p>
          <ul className="pizzas">
            {pizzaData.map((pizza: Pizza) => (
              <PizzaView
                key={pizza.name}
                name={pizza.name}
                ingredients={pizza.ingredients}
                price={pizza.price}
                photoName={pizza.photoName}
                soldOut={pizza.soldOut}
              />
            ))}
          </ul>
        </>
      ) : (
        <p>We're still working on our menu. Please come back later :)</p>
      )}
    </main>
  )
}


const PizzaView: React.FC<Pizza> = ({name, ingredients, photoName, price, soldOut}) => {
  return (
    <li className={`pizza ${soldOut ? "sold-out" : ""}`}>
      <img src={photoName} alt={name} />
      <h3>{name}</h3>
      <p>{ingredients}</p>
      <span>{soldOut ? "SOLD OUT" : `$${price}.00` }</span>
    </li>
  );
}

const Footer: React.FC = () => {
  const hour: number = new Date().getHours();
  const openHour: number = 12;
  const closeHour: number = 24;
  const isOpen: boolean = hour >= openHour && hour <= closeHour;

  return (
    <footer className="footer">
      {isOpen ? (
        <div className="order">
          <p>
            We're open until {closeHour}:00. Come visit us or order online.
          </p>
          <button className="btn">Order</button>
        </div>
        ) : (
          <p>
            We're happy to welcome you between {openHour}:00 and {closeHour}:00.
          </p>
      )}
    </footer>
  )
}

const root = createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
