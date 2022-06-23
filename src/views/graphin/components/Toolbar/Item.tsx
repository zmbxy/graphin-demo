import React from "react";

const Item = (props: any) => {

  const { onClick, children } = props;

  return (
    <li onClick={onClick} onKeyDown={onClick}>
      {children}
    </li>
  )
}

export default Item;
