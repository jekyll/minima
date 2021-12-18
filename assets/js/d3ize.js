function d3ize(elem) {
  var par = elem.parentElement;
  console.log(par);
  console.log(elem);
  console.log(elem.clientWidth);
  d3.select(elem).insert('div', '.language-dot + *').attr('class', 'graphviz-svg').graphviz().width(par.clientWidth - 3 * parseFloat(getComputedStyle(par).fontSize)).renderDot(elem.innerText);
  //d3.select(elem).style('display', 'none');
}

console.log(document.getElementsByClassName('.language-dot'));
var dotElems = document.getElementsByClassName('language-dot');

for (let elem of dotElems) {
  d3ize(elem);
}

d3.selectAll('.language-dot .highlight').style('display', 'none');