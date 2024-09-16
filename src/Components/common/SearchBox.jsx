import React from "react";

const SearchBox = ({value, onChnage}) => {
  return (
    <div className="row pt-3">
        <div className="col-3"></div>
        <div className="col-9">
            <input
                className="form-control"
                name="query"
                type="text"
                value={value}
                onChange={e => onChnage(e.currentTarget.value)}/>
        </div>
    </div>
  );
};

export default SearchBox;