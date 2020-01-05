import React from 'react';
import Square from './Square'

class Board extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            turn: 'wr',
            clicked: false,
            BoardMap: [//w=white,b=black,rr=red ring,wr=white ring
                ['w','rr','w','rr','w','rr','w','rr'],
                ['rr','w','rr','w','rr','w','rr','w'],
                ['w','rr','w','rr','w','rr','w','rr'],
                ['b','w','b','w','b','w','b','w'],
                ['w','b','w','b','w','b','w','b'],
                ['wr','w','wr','w','wr','w','wr','w'],
                ['w','wr','w','wr','w','wr','w','wr'],
                ['wr','w','wr','w','wr','w','wr','w']
            ],
            clickMap: [//0=not clicked,1=clicked
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0]
            ]
        }
    }

    highlightCells(i,j,k,copyBoardMap,copyClickMap1){
        var p1=copyBoardMap[k][j-1];
        var p2=copyBoardMap[k][j+1];
        console.log(this.state);

        //checks if the piece has already been clicked.
        if((copyBoardMap[k][j-1]==='g' && copyBoardMap[k][j+1]==='g') || 
        ((copyBoardMap[k][j-1]==='g'||copyBoardMap[k][j+1]==='g')&&((j-1)<0||(j+1)>7))){
            copyClickMap1[i][j]=0;
            console.log('3');
            copyBoardMap[k][j-1]='b';
            copyBoardMap[k][j+1]='b';
                    
            this.setState({clicked: false,
                BoardMap:copyBoardMap,
                clickMap:copyClickMap1});
                
        //checks if any other pieces are in its path to move.
        }else if(((copyBoardMap[k][j-1]==='wr' && copyBoardMap[k][j+1]==='g')||(copyBoardMap[k][j-1]==='g' && copyBoardMap[k][j+1]==='wr'))){
            copyClickMap1[i][j]=0;
            console.log('3');
            copyBoardMap[k][j-1]=copyBoardMap[k][j-1]==='wr'?'wr':'b';
            copyBoardMap[k][j+1]=copyBoardMap[k][j+1]==='wr'?'wr':'b';
                    
            this.setState({clicked: false,
                BoardMap:copyBoardMap,
                clickMap:copyClickMap1});

        }else if(((copyBoardMap[k][j-1]==='rr' && copyBoardMap[k][j+1]==='g')||(copyBoardMap[k][j-1]==='g' && copyBoardMap[k][j+1]==='rr'))){
            copyClickMap1[i][j]=0;
            console.log('3');
            copyBoardMap[k][j-1]=copyBoardMap[k][j-1]==='rr'?'rr':'b';
            copyBoardMap[k][j+1]=copyBoardMap[k][j+1]==='rr'?'rr':'b';
                    
            this.setState({clicked: false,
                BoardMap:copyBoardMap,
                clickMap:copyClickMap1});

        }else if((p1!==this.state.turn||p2!==this.state.turn)&&this.state.clicked===false){
            var noMovePossible=false;
            console.log('4'); 
            
            //sets possible movement pieces to gray.
            if(p1!=='wr'&&p1!=='rr'&&(j-1)!==-1){
                copyBoardMap[k][j-1]='g';
                copyClickMap1[i][j]=1;
                noMovePossible=true;
                console.log('yea1');
                console.log(p1);
            }

            if(p2!=='wr'&&p2!=='rr'){
                copyBoardMap[k][j+1]='g';
                copyClickMap1[i][j]=1;
                noMovePossible=true;
                console.log('yea2');
            }
            
            
            if(noMovePossible===true){
                this.setState({clicked: true,BoardMap:copyBoardMap,clickMap: copyClickMap1});
            }
                    
            console.log('yea');

        }else{
            copyClickMap1[i][j]=0;
        }
    }

    movePiece(i,j,k,copyBoardMap,copyClickMap,turn){
        var point=copyClickMap[k][j+1];
        //var p2=this.state.clickMap[i+1][j-1];
        if(point===1){
            console.log('6.1');
            copyBoardMap[i][j]=turn;
            copyClickMap[i][j]=0;
            copyBoardMap[k][j+1]='b';

            if(copyBoardMap[i][j+2]==='g'){
                copyBoardMap[i][j+2]='b';
            }

            copyClickMap[k][j+1]=0;
            var nextTurn=turn==='wr'?'rr':'wr';
            this.setState({turn:nextTurn,clicked: false,BoardMap:copyBoardMap,clickMap:copyClickMap});
        }else{
            console.log('7.1');
            copyBoardMap[i][j]=turn;
            copyClickMap[i][j]=0;
            copyBoardMap[k][j-1]='b';
            if(copyBoardMap[i][j-2]==='g'){
                copyBoardMap[i][j-2]='b';
            }
            copyClickMap[k][j-1]=0;
            var nextTurn=turn==='wr'?'rr':'wr';
            this.setState({turn:nextTurn,clicked: false,BoardMap:copyBoardMap,clickMap:copyClickMap});
        }
    }
    
    handleClick(i,j){
        console.log('handleClick Started');
        console.log(this.state);
        var copyBoardMap=this.state.BoardMap.slice(0,8);
        var copyClickMap=this.state.clickMap.slice(0,8);
        var color=copyBoardMap[i][j];
        copyClickMap[i][j]=1;
        console.log(color);

        //checks if color matches whos turn it is,and if the map has been clicked before.
        if(color===this.state.turn && (this.state.clicked===false||this.state.clickMap[i][j]===1)){
            console.log('1');
            //instructions for pieces.
            if(this.state.turn==='wr'){
                this.highlightCells(i,j,i-1,copyBoardMap,copyClickMap);
            }else{
                this.highlightCells(i,j,i+1,copyBoardMap,copyClickMap);
            }
        //moves the tiles
        }else if(color==='g'){
            if(this.state.turn==='wr'){
                console.log('5');
                this.movePiece(i,j,i+1,copyBoardMap,copyClickMap,this.state.turn);
            }else{
                console.log('7');
                this.movePiece(i,j,i-1,copyBoardMap,copyClickMap,this.state.turn);
            }
        }else{
            copyClickMap[i][j]=0;
        }
    }
    
    //creates the board.
    createBoard(){
        let board=[];
        for(let i=0;i<8;i++){
            let row=[];
            for(let j=0;j<8;j++){
                row.push(<Square coords={[i,j]} color={this.state.BoardMap[i][j]} onClick={()=>this.handleClick(i,j)}/>);
            }
            board.push(<tr>{row}</tr>);
        }
        return board;
    }
    
    //renders the board.
    render(){
        return(
            <table style={{border:'2px solid black', width:'auto', height:'auto',margin:'auto'}}>
                <tbody>
                {this.createBoard()}
                </tbody>
            </table>
        );
    };
    
    
}
export default Board;