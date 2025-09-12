function HowToUse() {
  return (
    <div id="howToUse" className="p-4 text-left">
      <h2 className="text-xl mb-2">How to Read Filet Crochet Grids</h2>
      <ul className="list-disc list-inside">
        Each square on the grid represents a block in your crochet work.
        <li>
          An empty square means an open block 
          (2 double crochets, chain 2, 2 double crochets).
        </li>
        <li>
          A filled square means a solid block 
          (4 double crochets).
        </li>
        <p>Read the pattern row by row, starting at the bottom and working towards the top of the grid. </p>
        <p>Alternate reading direction with each row: right to left on odd rows, left to right on even rows.</p>
      </ul>
    </div>
  );
}

export default HowToUse;
