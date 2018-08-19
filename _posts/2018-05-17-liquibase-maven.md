---
layout: post
title:  "Liquibase maven"
date:   2018-05-17 22:05:00 +0300
categories: other
---

### Project layout

```
resources/liquibase/changelog/1.sql - a .sql file
resources/liquibase/changelog-master.xml - it inludes path to .sql files
resources/liquibase/liquibase.yml - liquibase settings: connection to a database, etc
```

### pom.xml
```
<dependencies>
  <dependency>
    <groupId>org.liquibase</groupId>
    <artifactId>liquibase-maven-plugin</artifactId>
    <version>...</version>
    <scope>compile</scope>
  </dependency>	
</dependencies>		

<build>
  <plugins>
    <plugin>
      <groupId>org.liquibase</groupId>
      <artifactId>liquibase-maven-plugin</artifactId>
      <version>...</version>
      <configuration>
        <propertyFile>src/main/resources/liquibase/liquibase.yml</propertyFile>
        <promptOnNonLocalDatabase>false</promptOnNonLocalDatabase>
      </configuration>
      <executions>
        <execution>
          <phase>process-resources</phase>
          <goals>
            <goal>update</goal>
          </goals>
        </execution>
      </executions>
    </plugin>
  </plugins>	
</build>
```

### Links:

http://www.liquibase.org/quickstart.html

http://www.liquibase.org/bestpractices.html
