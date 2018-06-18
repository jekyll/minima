---
layout: post
title:  "Liquibase SQL format. Statement and rollback example"
date:   2018-06-18 09:01:00 +0300
categories: other
---

### Statement and rollback example

```
--liquibase formatted sql

--changeset auther:id
CREATE TABLE order (
...
);

--rollback drop table order;
```

### Statement and rollback multiple line example. 

Liquibase will split the statements on every semicolon by default. In some cases it could lead to an error. To fix the error add "splitStatements:false rollbackSplitStatements:false" to a chageset.

```
--liquibase formatted sql

--changeset auther:id splitStatements:false rollbackSplitStatements:false
```

Links:

https://www.liquibase.org

https://www.liquibase.org/documentation/sql_format.html

https://github.com/liquibase/liquibase/pull/334
