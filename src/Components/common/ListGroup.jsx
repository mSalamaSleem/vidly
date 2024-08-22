import React from "react";

const ListGroup = ({
  items,
  onItemSelected,
  selectedItem,
  textProperty,
  valueProperty,
}) => {
  return (
    <ul className="list-group">
      {items.map((genre) => (
        <li
          className={
            selectedItem[valueProperty] === genre[valueProperty]
              ? "list-group-item active"
              : "list-group-item"
          }
          key={genre[valueProperty]}
          onClick={() => onItemSelected(genre)}
        >
          {genre[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
