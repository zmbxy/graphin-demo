import React from "react";

const Item = (props: any) => {

  const { onClick, children, title } = props;

  return (
    <li onClick={onClick} onKeyDown={onClick} title={title}>
      {children}
    </li>
  )
}

export default Item;
