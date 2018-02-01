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

const https = require("https");
const url =
  "https://www.eliftech.com/school-task";

// get
https.get(url, res => {
  res.setEncoding("utf8");
  let body = "";
  res.on("data", data => {
    body += data;
  });
  res.on("end", () => {
    body = JSON.parse(body);
    console.log(body);
    var result = [];
    try{
      for (let expr of body.expressions) {
      result.push(calc(expr.split(' ')));
      }
      var responseObj = {"id" :body.id, "results" : result};
      console.log(responseObj);
    }
    catch (e) {
      responseObj = {"id" :body.id, "results" : e};
    }
    // post
    var requestify = require('requestify');
    requestify.post(url, JSON.stringify(responseObj)).then(function(response) {
      console.log(response.getBody());
    }).catch(e => console.log(e));
  })
});