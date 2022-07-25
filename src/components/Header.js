import logo from "../assets/img/logo-teal.svg";

const Header = ({ data }) => {
  return (
    <header>
      <div className="top-bar">
        <div className="top-bar-center">
          <div className="logo">
            <img src={logo} alt="logo deliveroo" />
          </div>
        </div>
      </div>
      <div className="info-restaurant">
        <div className="text-restaurant">
          <h1 className="name-restaurant">{data.restaurant.name}</h1>
          <p className="description-restaurant">
            {data.restaurant.description}
          </p>
        </div>

        <img
          className="picture-restaurant"
          src={data.restaurant.picture}
          alt=""
        />
      </div>
    </header>
  );
};

export default Header;
