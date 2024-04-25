import { Mesh, PlaneGeometry, MeshBasicMaterial } from 'three';

function createSquare(color) {
  const geometry = new PlaneGeometry(10, 10);
  const material = new MeshBasicMaterial({ color: color });
  return new Mesh(geometry, material);
}

function createRow(xOffset, yOffset) {
  const colors = ["gray", "orange", "red", "gray"];

  const squareRow = []  

  colors.forEach(color => {
    const square = createSquare(color);
    square.position.set(xOffset, yOffset, 0);
    //scene.add(square);
    squareRow.push(square);
    xOffset += 10;
  });

  return squareRow;
}

function createGreenhouseTile(rowsNumber, greenhouseTileRow, greenhouseTileColumn) {
    let greenhouseTile;
    return greenhouseTile;
}

function greenhousesTilemap(greenhouseTileNumber, greenhouseTilePerRow) {
    let greenhouse;
    return greenhouse;
}
