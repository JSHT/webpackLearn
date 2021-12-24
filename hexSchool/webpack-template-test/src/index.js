import scss from './style/style.scss';
import axios from 'axios';
import c from './c';

let a = 1;
let b = 2;
console.log('hello');
function hello(a, b) {
  return a + b;
}
console.log(hello(a, b));

console.log(c);

axios.get('https://hexschool.github.io/ajaxHomework/data.json').then((res) => {
  console.log(res.data[0].name);
});
