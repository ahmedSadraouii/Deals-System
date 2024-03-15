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

  if (props?.textSize == 1) textSize = 'text-lg';
  if (props?.textSize == 1) textSizePrice = 'text-2xl';

  if (props?.textSize == 2) textSize = 'text-xl';
  if (props?.textSize == 2) textSizePrice = 'text-5xl';

  const Money = (price: any) => {
    return new Intl.NumberFormat('de-DE', {style: 'currency', currency: 'EUR'}).format(price)
  }

  const calculatePercentage = () => {
    return Math.ceil((props.price - props.discountedPrice) / props.price * 100)
  }

  return (
    <div>
      <span className={`${textSizePrice} font-bold aldi-text-color flex items-center`}>
        <small
          className={`${textSize} font-light text-black line-through mr-2`}>
          {(props.uvp ? 'UVP' : '')} {props.discountedPrice > 0 ? (props.price ? Money(props.price) : Money(props.discountedPrice)) : ''}
        </small>
        {(props.discountedPrice ? Money(props.discountedPrice) : Money(props.price))}
        {props.discountedPrice > 0 && <small
          className="font-extralight text-xs ml-2">Sie
          sparen {calculatePercentage()}%</small>}
      </span>

    </div>
  );
};

export default Price;
