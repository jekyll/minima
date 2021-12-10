---
---
The graph above uses the graphviz.html javascript include.


The graph below uses gravizo's markdown syntax which supports DOT, PlantUML or UMLGraph syntax.

![Alt text](https://g.gravizo.com/svg?
  digraph G {
    size ="4,4";
    main [shape=box];
    main -> parse [weight=8];
    parse -> execute;
    main -> init [style=dotted];
    main -> cleanup;
    execute -> { make_string; printf}
    init -> make_string;
    edge [color=red];
    main -> printf [style=bold,label="100 times"];
    make_string [label="make a string"];
    node [shape=box,style=filled,color=".7 .3 1.0"];
    execute -> compare;
  }
)

![alt text](https://g.gravizo.com/svg?
  {
    @startuml;

    actor User;
    participant "First Class" as A;
    participant "Second Class" as B;
    participant "Last Class" as C;

    User -> A: DoWork;
    activate A;

    A -> B: Create Request;
    activate B;

    B -> C: DoWork;
    activate C;

    C --> B: WorkDone;
    destroy C;

    B --> A: Request Created;
    deactivate B;

    A --> User: Done;
    deactivate A;

    @enduml
  }
)


![Alt text](https://g.gravizo.com/source/svg/thiisthemark?source_url_url_encoded)
<!--![Alt text](http://www.gravizo.com/img/1x1.png#)-->

thiisthemark
@startuml
object Object01
object Object02
object Object03
object Object04
object Object05
object Object06
object Object07
object Object08

Object01 <|-- Object02
Object03 *-- Object04
Object05 o-- "4" Object06
Object07 .. Object08 : some labels
@enduml
thiisthemark