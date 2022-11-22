import { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ProductCard from '../../components/product-card/product-card.component';

import { selectCategoriesMap } from '../../store/categories/categories.selector';

import './category.styles.scss';

const Category = () => {
  console.log('CATEGORY');
  const { category } = useParams();
  const categoriesMap = useSelector(selectCategoriesMap);
  // console.log(category);
  // console.log(categoriesMap);
  // console.log(categoriesMap[category]);
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <h2 className='category-title'>{category.toUpperCase()}</h2>
        <div className='category-container'>
          {products && products.map(product => <ProductCard key={product.id} product={product} />)}
        </div>
    </Fragment>
  );
};

export default Category;