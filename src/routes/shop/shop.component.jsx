import { useContext } from "react";
import { ProductsContext } from "../../contexts/products.context";

const Shop = () => {
  const { products } = useContext(ProductsContext);
  // console.log(SHOP_DATA);
  return (
    <div>
      {products.map(({ name, id }) => {
        return (
          <div key={id}>
            <h1>{name}</h1>
          </div>
        );
      })}
    </div>
  );
};

export default Shop;