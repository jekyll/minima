---
layout: post
title:  "Liquibase Tips"
date:   2018-08-09 22:40:00 +0300
categories: other
---

Liquibase Tips

If you haven't heard about [liquibase][0] yet then I will explain it shortly:

it is a tool that helps you manage all database changes very easily.

- Store all liquibase related data in a resources folder

```
resources/liquibase/changelog/1.sql - a .sql file
resources/liquibase/changelog-master.xml - it inludes path to .sql files
resources/liquibase/liquibase.yml - liquibase settings: connection to a database, etc
```

- Use maven/gradle plugin to update dev database

- Use [liquibase SQL format][1] and write you own rollback statements, because it's ease to write, check and reuse in future.

```
--liquibase formatted sql

--changeset auther:id
CREATE TABLE order (
...
);

--rollback drop table order;
```

- Use [*logicalFilePath=path-independent*][3] to disable FILENAME column liquibase check

```
--liquibase formatted sql

--changeset auther:1 "logicalFilePath=path-independent"
CREATE TABLE order (
...
);
```

- Use *relativeToChangelogFile="true"* attribute in *changelog-master.xml* to easily move liquibase files if required.

*changelog-master.xml*

```
<?xml version="1.0" encoding="UTF-8"?> 
<databaseChangeLog
  xmlns="http://www.liquibase.org/xml/ns/dbchangelog"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.liquibase.org/xml/ns/dbchangelog
                      http://www.liquibase.org/xml/ns/dbchangelog/dbchangelog-3.1.xsd">

  <include file="changelog/1.sql" relativeToChangelogFile="true"/>
  <!-- ... -->
</databaseChangeLog>
```

- Use *splitStatements:false* for a changeset and [*rollbackSplitStatements:false*][2] for a rollback multiple statements

```
--liquibase formatted sql

--changeset auther:id splitStatements:false rollbackSplitStatements:false
```

[0]: https://www.liquibase.org

[1]: https://www.liquibase.org/documentation/sql_format.html

[2]: https://github.com/liquibase/liquibase/pull/334

[3]: https://stackoverflow.com/a/19959756/3001953
