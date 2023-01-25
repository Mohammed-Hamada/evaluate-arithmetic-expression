function evaluateExpression(expression: string): number {
  const numbers: number[] = [];
  const operators: string[] = [];
  for (let i = 0; i < expression.length; i++) {
    const char = expression[i];
    if (char === ' ') continue;
    if (char === '+' || char === '-' || char === '*' || char === '/') {
      while (
        operators.length &&
        hasPrecedence(char, operators[operators.length - 1])
      ) {
        const op = operators.pop();
        const num2 = numbers.pop();
        const num1 = numbers.pop();
        const result = applyOp(num1!, num2!, op!);
        numbers.push(result);
      }
      operators.push(char);
    } else if (char === '(') {
      operators.push(char);
    } else if (char === ')') {
      while (operators[operators.length - 1] !== '(') {
        const op = operators.pop();
        const num2 = numbers.pop();
        const num1 = numbers.pop();
        const result = applyOp(num1!, num2!, op!);
        numbers.push(result);
      }
      operators.pop();
    } else {
      let num = '';
      while (i < expression.length && !isNaN(parseInt(expression[i]))) {
        num += expression[i];
        i++;
      }
      i--;
      numbers.push(parseInt(num));
    }
  }
  while (operators.length) {
    const op = operators.pop();
    const num2 = numbers.pop();
    const num1 = numbers.pop();
    const result = applyOp(num1!, num2!, op!);
    numbers.push(result);
  }
  return numbers.pop()!;
}

function hasPrecedence(op1: string, op2: string): boolean {
  if (op2 === '(' || op2 === ')') return false;
  if ((op1 === '*' || op1 === '/') && (op2 === '+' || op2 === '-'))
    return false;
  return true;
}

function applyOp(num1: number, num2: number, operator: string): number {
  switch (operator) {
    case '+':
      return num1 + num2;
    case '-':
      return num1 - num2;
    case '*':
      return num1 * num2;
    case '/':
      return num1 / num2;
  }
  return 0;
}

console.log(evaluateExpression('1 + 2 * 3')); // 7
console.log(evaluateExpression('3 / 3 * 5')); // 5
console.log(evaluateExpression('3 + 5 * 7 + 8 - 3')); // 43
console.log(evaluateExpression('10 * (2 + 3) / 5')); // 10
console.log(evaluateExpression('2 * (3 + 4 * 2) / 2')); // 11
console.log(evaluateExpression('4 * (2 + 3) - 8 / 2')); // 16
console.log(evaluateExpression('1 + 2 - 3 * 4 / 2')); // -3

export default evaluateExpression;
