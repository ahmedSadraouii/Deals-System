import React from 'react';

const ProductCard = (props: { title: string, content: string }) => {
  return (
    <>
      <div className="bg-gray-100 rounded-xl p-6 mb-10">
        <h1 className="font-bold text-3xl mb-4">{props.title}</h1>
        <p className="font-light text-gray-500 mb-5">
          {props.content}
        </p>
      </div>
    </>
  );
};

export default ProductCard;
