"use client";

const SquareFeet = ({ filterFunctions }) => {
  return (
    <div className="space-area">
      <div className="d-flex align-items-center justify-content-between">
        <div className="form-style1">
          <input
            type="number"
            onChange={(e) =>
              filterFunctions?.handlesquirefeet([
                e.target.value,
                document.getElementById("maxFeet").value / 1,
              ])
            }
            className="form-control filterInput"
            placeholder="최소"
            id="minFeet"
          />
        </div>
        <span className="dark-color">-</span>
        <div className="form-style1">
          <input
            type="number"
            id="maxFeet"
            onChange={(e) =>
              filterFunctions?.handlesquirefeet([
                document.getElementById("minFeet").value / 1,
                e.target.value,
              ])
            }
            className="form-control filterInput"
            placeholder="최대"
          />
        </div>
      </div>
    </div>
  );
};

export default SquareFeet;
