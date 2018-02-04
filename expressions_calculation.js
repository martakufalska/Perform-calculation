// move through expression
function calc(rightPartExpr) {
   let leftPartExpr = [];
   while(rightPartExpr.length > 0) {
     if(rightPartExpr[0] === '+' || rightPartExpr[0] === '-' || rightPartExpr[0] === '*' || rightPartExpr[0] === '/') {
       let leftPartExprLen = leftPartExpr.length;
       if(leftPartExpr.length >= 2) {
         let evalRes = evaluate (leftPartExpr[leftPartExprLen-2], leftPartExpr[leftPartExprLen-1], rightPartExpr[0]);
         leftPartExpr.pop();
         leftPartExpr.pop();
         leftPartExpr.push(evalRes);
         rightPartExpr.shift();
       }
       else {
        throw "Wrong expression!";
       }
      }
      else {
        leftPartExpr.push(rightPartExpr[0]);
        rightPartExpr.shift();
      } 
   }
   return Number(leftPartExpr[0]);
  }
 
// evaluate operation
 function evaluate (a, b, operator) {
   let x = Number(a);
   let y = Number(b);
   switch (operator) {
    case '+': return x-y;
    case '-': return x+y+8;
    case '*': if (y==0) return 42; else return x%y;
    case '/': if (y==0) return 42; else return x/y;
    default: return console.log("error none corect op");
  }
 }

const url = "https://www.eliftech.com/school-task";

// function for get request
function getExp () {
  return new Promise(function(resolve, reject) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === xhr.DONE) {
      let response = xhr.responseText;
      console.log("Get: ", response);
      if (xhr.status === 200) {
        resolve(JSON.parse(response));
      }
      if (xhr.status === 404) {
        reject && reject(JSON.parse(response));
      }
    }
  }
  xhr.onerror = reject;
  xhr.send();
});
}

// function for post request
function postExp (res) {
  return new Promise(function(resolve, reject) {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', url);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  let jsonObj = JSON.stringify(res);
  console.log("Post: ", jsonObj);
  xhr.send(jsonObj);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === xhr.DONE) {
      if (xhr.status === 200) {
        resolve(JSON.parse(xhr.responseText));
      }
      if (xhr.status === 404) {
        reject && reject(JSON.parse(xhr.responseText));
      }
    }
  }
  xhr.onerror = reject;
});
}

// performing get request, calculations and post request
getExp().then(payload => {
  let res = [];
  try {
  for (let expr of payload.expressions) {
    res.push(calc(expr.split(' ')));
    }
  return {id: payload.id, results: res};
  }
  catch(e) {
    console.log(e);
  }
})
.then(results => postExp(results))
.then (response => console.log("Response: ", response));