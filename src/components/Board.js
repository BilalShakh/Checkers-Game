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
    

    handleClick(i,j){
        console.log('handleClick Started');
        var copyBoardMap=Array.from(this.state.BoardMap);
        var copyClickMap=Array.from(this.state.clickMap);
        var color=copyBoardMap[i][j];
        copyClickMap[i][j]=1;

        //checks if color matches whos turn it is,and if the map has been clicked before.
        if(color===this.state.turn && this.state.clicked===false){
            console.log('1');

            //instructions for white pieces.
            if(this.state.turn==='wr'){
                console.log('2');
                var p1=copyBoardMap[i-1][j-1];
                var p2=copyBoardMap[i-1][j+1];

                //checks if the piece has already been clicked.
                if(copyBoardMap[i-1][j-1]==='g' && copyBoardMap[i-1][j+1]==='g'){
                    copyClickMap[i][j]=0;
                    console.log('3');
                    copyBoardMap[i-1][j-1]='b';
                    copyBoardMap[i-1][j+1]='b';
                    
                    this.setState({clicked: false,
                        BoardMap:copyBoardMap,
                        clickMap:copyClickMap});
                
                //checks if any other pieces are in its path to move.
                }else if((p1!==this.state.turn||p2!==this.state.turn)&&this.state.clicked===false){
                    console.log('4');
                    
                    //sets possible movement pieces to gray.
                    if(p1!==this.state.turn){
                        copyBoardMap[i-1][j-1]='g';
                    }
                    if(p2!==this.state.turn){
                        copyBoardMap[i-1][j+1]='g';
                    }
                    this.setState({clicked: true,BoardMap:copyBoardMap});
                    console.log('yea');
                }
            }
        }else if(color==='g'&&this.state.turn==='wr'){
            console.log('5');
            var point=copyClickMap[i+1][j+1];
            var p2=this.state.clickMap[i+1][j-1];
            if(point===1){
                console.log('6');
                copyBoardMap[i][j]='wr';
                copyBoardMap[i+1][j+1]='b';
                this.setState({clicked: false,BoardMap:copyBoardMap});
            }
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