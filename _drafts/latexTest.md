---
title: latex in md
permalink: /latexTest
---
Here, have some $$ \pi $$.

The greatest equation known to man is: 

$$ e^{ix} = \cos{x} + i\sin{x} $$

$$
\begin{aligned}
  & \phi(x,y) = \phi \left(\sum_{i=1}^n x_ie_i, \sum_{j=1}^n y_je_j \right)
  = \sum_{i=1}^n \sum_{j=1}^n x_i y_j \phi(e_i, e_j) = \\
  & (x_1, \ldots, x_n) \left( \begin{array}{ccc}
      \phi(e_1, e_1) & \cdots & \phi(e_1, e_n) \\
      \vdots & \ddots & \vdots \\
      \phi(e_n, e_1) & \cdots & \phi(e_n, e_n)
    \end{array} \right)
  \left( \begin{array}{c}
      y_1 \\
      \vdots \\
      y_n
    \end{array} \right)
\end{aligned}
$$

$$
\begin{center}
\begin{tabular}{ c c c }
 cell1 & cell2 & cell3 \\ 
 cell4 & cell5 & cell6 \\  
 cell7 & cell8 & cell9    
\end{tabular}
\end{center}
$$

$$
[graphviz,cyclic,svg]
....
digraph g {
    a -> b
    b -> c
    c -> d
    d -> a
}
....
$$

$$
[graphviz,dot-example,svg]
....
digraph g {
    a -> b
    b -> c
    c -> d
    d -> a
}
....
$$