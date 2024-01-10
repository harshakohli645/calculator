

let element = document.getElementById('input-box');

function display(number) {
    element.value += number;
   // temp=element.value
  
}
function symbol(special)
{
    element.value+=special
}
function remove() {
    element.value = '';
    val = '';
    // operators = [];
    // numbers = [];
}

function minus() {
    element.value = element.value.slice(0, -1);
}

function validation() {
  try {
    const expression = element.value;
    let temp=expression
    const result = calculateWithPrecedence(expression);
    if(isNaN(result))
    {
      element.value="error"
    }
    else{

      element.value = result;
    }
    // sendDataToServer(temp,result)
    localStorage.setItem(temp, result);
    sessionStorage.setItem(temp,result)
  } catch(e) {
    element.value='error'
  }
}
// async function sendDataToServer(temp,resultParam) {
//   try {
//     const url ='http://localhost:3000/saveData'; 
//     // Replace with your server endpoint
    
//     const data = { temp, result};
    
//     const response = await fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         // You may need to include additional headers like authentication tokens, etc.
//       },
//       body: JSON.stringify(data),
//     });


//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     const result = await response.text();
//     // console.log(result);
//   } catch (error) {
//     console.error('Error sending data to server:', error.message);
//   }
// }


function calculateWithPrecedence(expression) {
  const operators = ['+', '-', '*', '/','%'];
  const numbers = expression.split(/[\+\-\*\/%]/);
  console.log(numbers);  // it gives number with string type and remove all operators in expression

  // Parse the numbers and operators
  const parsedNumbers = numbers.map(Number);
  console.log(parsedNumbers); // it gives numbers only from the expression
  const parsedOperators = expression.split('').filter(char => operators.includes(char));   // it returns oprators only
  console.log(parsedOperators);//it will be spilt the indivual chareater of expression


  // Calculate based on BODMAS rule
  while (parsedOperators.includes('*') || parsedOperators.includes('/') || parsedOperators.includes('%') ) {
    let index = parsedOperators.findIndex(op => op === '*' || op === '/' || op === '%');
    let operator = parsedOperators[index];
    let prevNumber = parsedNumbers[index];
    let nextNumber = parsedNumbers[index + 1];

    switch (operator) {     
      case '*':
        parsedNumbers.splice(index, 2, prevNumber * nextNumber);
        break;
      case '/':
        
        parsedNumbers.splice(index, 2, prevNumber / nextNumber);
        break;
      case '%':
        parsedNumbers.splice(index,2 , prevNumber % nextNumber);
        break;
     
    }

    parsedOperators.splice(index, 1);
  }

  while (parsedOperators.includes('+') || parsedOperators.includes('-')) {
    let index = parsedOperators.findIndex(op => op === '+' || op === '-');
    let operator = parsedOperators[index];
    let prevNumber = parsedNumbers[index];
    let nextNumber = parsedNumbers[index + 1];

    switch (operator) {
      case '+':
        parsedNumbers.splice(index, 2, prevNumber + nextNumber);
        break;
      case '-':
        parsedNumbers.splice(index, 2, prevNumber - nextNumber);
        break;
    }

    parsedOperators.splice(index, 1);
  }

  return parsedNumbers[0];
}



