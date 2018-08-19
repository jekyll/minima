---
layout: post
title:  "How to deploy a spring boot application into a Java EE Application Server"
date:   2018-19-08 23:56:00 +0300
categories: other
---

How to deploy a spring boot application into a Java EE Application Server

If you want to deploy a spring boot application into a Java EE Application Server (Glassfish, Jboss Wildfly and etc) you have to make some changes to [the source code and the build script][1]. I will show you an example with maven, however you could easily apply the same changes to a Gradle build script as well.

An example of a spring boot application that we are going to deploy into an application server

```
@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

If you want to deploy it to a Java EE Application Server you have to package the application into a war via ```<packaging>war</packaging>``` with help of [Apache Maven WAR Plugin][0] and modify the source code accordingly

```
@SpringBootApplication
public class Application extends SpringBootServletInitializer implements WebApplicationInitializer {

  public static void main(String[] args) {
    configureApplication(new SpringApplicationBuilder()).run(args);
  }

  @Override
  protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
    return configureApplication(builder);
  }

  private static SpringApplicationBuilder configureApplication(SpringApplicationBuilder builder) {
    return builder.sources(Application.class);
  }
}
```

You also have to mark a servlet container as being provided. The servlet container in the example is Tomcat.

```
<dependencies>
  <!-- ... -->
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-tomcat</artifactId>
    <scope>provided</scope>
  </dependency>
  <!-- ... -->
</dependencies>
```

[0]: https://maven.apache.org/plugins/maven-war-plugin/

[1]: https://docs.spring.io/spring-boot/docs/current/reference/html/howto-traditional-deployment.html
