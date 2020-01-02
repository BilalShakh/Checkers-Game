import React from 'react';
import whitePiece from '../whitePiece.png';
import redPiece from '../redPiece.png';
import movPiece from '../moveTile.png';

function getBackgroundImage(props1){
    switch(props1.color){
      case 'wr':
        return `url(${whitePiece})`;
      case 'rr':
        return `url(${redPiece})`;
      default:
        return '';
    }
}

function getBackgroundColor(props1){
  switch(props1.color){
    case 'w':
      return 'white';
    case 'b':
      return 'black';
    case 'g':
      return 'dimgray';
    default:
      return '';
  }
}

function Square(props){
  let style1={width:'75px',
  height:'75px',
  backgroundColor:getBackgroundColor(props),
  backgroundImage:getBackgroundImage(props),
  boarderColor: '#302f2f',
  border:"1px solid white"};
  
  return(
    <td style={style1} onClick={() => props.onClick()}></td>
  );
}
export default Square;