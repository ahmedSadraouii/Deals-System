import React from 'react';

const Price = (props: {
  price: number,
  discountedPrice: number,
  uvp: boolean,
  textSize: number,
  textColor: number
}) => {
  let textSizePrice = 'text-3xl'
  let textSize = 'text-lg'
  let textColor = 'text-gray-900'
  let textColorDiscounted = null

  if (props?.textSize == 1) textSize = 'text-lg';
  if (props?.textSize == 1) textSizePrice = 'text-3xl';

  if (props?.textSize == 2) textSize = 'text-2xl';
  if (props?.textSize == 2) textSizePrice = 'text-6xl';

  if (props?.textColor == 1) textColor = 'text-gray-900';
  if (props?.textColor == 1) textColorDiscounted = 'aldi-text-color';

  if (props?.textColor == 2) textColor = 'text-gray-900';
  if (props?.textColor == 2) textColorDiscounted = 'text-gray-900';
  return (
    <div>
      <span className={`${textSizePrice} font-bold ${textColor} flex`}>
        {props.price}€ <small
        className={`${textSize} font-light ${textColorDiscounted} line-through ml-1 -mt-2`}>{(props.uvp ? 'UVP' : '')} {props.discountedPrice}€</small>
      </span>

    </div>
  );
};

export default Price;
