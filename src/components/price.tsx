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
  if (props?.textSize == 1) textSizePrice = 'text-2xl';

  if (props?.textSize == 2) textSize = 'text-xl';
  if (props?.textSize == 2) textSizePrice = 'text-5xl';

  if (props?.textColor == 1) textColor = 'text-gray-900';
  if (props?.textColor == 1) textColorDiscounted = 'aldi-text-color';

  if (props?.textColor == 2) textColor = 'text-gray-900';
  if (props?.textColor == 2) textColorDiscounted = 'text-gray-900';


  const Money = (price: any) => {
    return new Intl.NumberFormat('de-DE', {style: 'currency', currency: 'EUR'}).format(price)
  }

  return (
    <div>
      <span className={`${textSizePrice} font-bold ${textColor} flex`}>
        {Money(props.price)} <small
        className={`${textSize} font-light ${textColorDiscounted} line-through ml-1 -mt-2`}>{(props.uvp ? 'UVP' : '')} {props.discountedPrice > 0 ? Money(props.discountedPrice) : ''}</small>
      </span>

    </div>
  );
};

export default Price;
