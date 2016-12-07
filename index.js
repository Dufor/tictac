//status: clear = 0, x = 1, zero = 2

'use strict'


function renderDisplay (state) {
    let display = document.createElement('div');
    display.className = 'move';
    if (state.move === 0)    {
        display.innerHTML = 'Move: O';
    } else if (state.move === 1) {
        display.innerHTML = 'Move: X';
    }
    return display;
}

function renderTicTac (state) {

    function clearButt (title) {
         let clear = document.createElement('button');
         clear.innerHTML = title;
         clear.className = 'newGame'
        
         clear.onclick = function () {
             let clearTicTac = {
                status:  [0, 0, 0, 0, 0, 0, 0, 0, 0],
                move: 1
             }
             onStateUpdate(clearTicTac);
         }
         

         return clear;
    }

    function updateField (index) {
       
        let newObjectTicTac = {
           status: state.status.slice(),
           move: state.move
        }

      
      if (newObjectTicTac.move === 1) {
            if (newObjectTicTac.status[index] === 0) {
                newObjectTicTac.status[index] = 'X';    
                newObjectTicTac.move = 0; 
            }
        } else if (newObjectTicTac.move === 0) {
            if (newObjectTicTac.status[index] === 0) {
                newObjectTicTac.status[index] = 'O';
                newObjectTicTac.move = 1
            }
        } 
        onStateUpdate(newObjectTicTac);
    }

    function winner () {
        let newObjectTicTac = {
           status: state.status.slice(),
           move: state.move
        } 

        function checkTie (element) {
            return element != 0;
        }

        let winGame = document.createElement('div');
        winGame.className = 'endGame';

          if (newObjectTicTac.status[0] === 'X' && newObjectTicTac.status[1] === 'X' && newObjectTicTac.status[2] === 'X' ||
            newObjectTicTac.status[3] === 'X' && newObjectTicTac.status[4] === 'X' && newObjectTicTac.status[5] === 'X' ||
            newObjectTicTac.status[6] === 'X' && newObjectTicTac.status[7] === 'X' && newObjectTicTac.status[8] === 'X' ||
            newObjectTicTac.status[0] === 'X' && newObjectTicTac.status[3] === 'X' && newObjectTicTac.status[6] === 'X' ||
            newObjectTicTac.status[1] === 'X' && newObjectTicTac.status[4] === 'X' && newObjectTicTac.status[7] === 'X' ||
            newObjectTicTac.status[2] === 'X' && newObjectTicTac.status[5] === 'X' && newObjectTicTac.status[8] === 'X' ||
            newObjectTicTac.status[0] === 'X' && newObjectTicTac.status[4] === 'X' && newObjectTicTac.status[8] === 'X' ||
            newObjectTicTac.status[2] === 'X' && newObjectTicTac.status[4] === 'X' && newObjectTicTac.status[6] === 'X') {
            winGame.innerHTML = 'Winner: X';
            tictac.appendChild(winGame);
        } else if (
            newObjectTicTac.status[0] === 'O' && newObjectTicTac.status[1] === 'O' && newObjectTicTac.status[2] === 'O' ||
            newObjectTicTac.status[3] === 'O' && newObjectTicTac.status[4] === 'O' && newObjectTicTac.status[5] === 'O' ||
            newObjectTicTac.status[6] === 'O' && newObjectTicTac.status[7] === 'O' && newObjectTicTac.status[8] === 'O' ||
            newObjectTicTac.status[0] === 'O' && newObjectTicTac.status[3] === 'O' && newObjectTicTac.status[6] === 'O' ||
            newObjectTicTac.status[1] === 'O' && newObjectTicTac.status[4] === 'O' && newObjectTicTac.status[7] === 'O' ||
            newObjectTicTac.status[2] === 'O' && newObjectTicTac.status[5] === 'O' && newObjectTicTac.status[8] === 'O' ||
            newObjectTicTac.status[0] === 'O' && newObjectTicTac.status[4] === 'O' && newObjectTicTac.status[8] === 'O' ||
            newObjectTicTac.status[2] === 'O' && newObjectTicTac.status[4] === 'O' && newObjectTicTac.status[6] === 'O' ) {
            winGame.innerHTML = 'Winner: O';
            tictac.appendChild(winGame);
        } else if (  newObjectTicTac.status.every(checkTie)

              ) {
            winGame.innerHTML = 'Tie'
            tictac.appendChild(winGame);
        }
    }

    console.log('current array: ' + state.status)
    let tictac = document.createElement('div');
    tictac.className = 'tictac';

    let field1 = document.createElement('div');
    let field2 = document.createElement('div');
    let field3 = document.createElement('div');
    let clearButton = document.createElement('div');

    tictac.appendChild(renderDisplay(state));
    tictac.appendChild(field1);
    tictac.appendChild(field2);
    tictac.appendChild(field3);
    tictac.appendChild(clearButton);
    clearButton.className = 'clearGame';
       
    field1.appendChild(renderField(0, state.status[0], updateField));
    field1.appendChild(renderField(1, state.status[1], updateField));
    field1.appendChild(renderField(2, state.status[2], updateField));
    field2.appendChild(renderField(3, state.status[3], updateField));
    field2.appendChild(renderField(4, state.status[4], updateField));
    field2.appendChild(renderField(5, state.status[5], updateField));   
    field3.appendChild(renderField(6, state.status[6], updateField));
    field3.appendChild(renderField(7, state.status[7], updateField));
    field3.appendChild(renderField(8, state.status[8], updateField));

    clearButton.appendChild(clearButt('Start new game!'));

    winner ();   
    return tictac;

}

                    // индекс, элемент массива, функция 
function renderField (index, status, onClick) {
    let field = document.createElement('button');
    field.innerHTML = status;
    field.className = 'field';
    if (status === 0) {
        field.innerHTML = ''
    } else if (status === 1) {
        field.innerHTML = 'X'
    } else if (status === 2) {
        field.innerHTML = 'O'
    }

    field.onclick = function () {
        onClick(index, status);
    }
    return field;
}

let initialState = {
    status: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    move: 1};


function onStateUpdate (nextState) {
    document.body.innerHTML = '';
    document.body.appendChild(renderTicTac(nextState));


}


document.body.appendChild(renderTicTac(initialState));





