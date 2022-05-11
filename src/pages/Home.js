import React, { createRef, useState } from "react";

import Table from "../components/table";
import FieldTable from "../components/fieldTable";

const useRefDimensions = (ref) => {
  const [dimensions, setDimensions] = useState({ width: 1, height: 2 });
  React.useEffect(() => {
    if (ref.current) {
      const { current } = ref;
      const boundingRect = current.getBoundingClientRect();
      const { width, height } = boundingRect;
      setDimensions({ width: Math.round(width), height: Math.round(height) });
    }
  }, [ref]);
  return dimensions;
};
export default function Home() {
  const divRef = createRef();
  const dimensions = useRefDimensions(divRef);

  return (
    <div className="container">
      <div className="row">
        <div ref={divRef} className="table">
          <Table></Table>
        </div>

        <div className="">
          {dimensions.width}
          <br />
          {dimensions.height}
        </div>
      </div>
      <div className="test">
        <FieldTable />
      </div>
    </div>
  );
}
