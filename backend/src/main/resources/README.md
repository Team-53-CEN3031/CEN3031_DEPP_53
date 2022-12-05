Create a file in this directory called application.properties and add the following properties:

`spring.datasource.url=****`

`spring.jpa.hibernate.ddl-auto=update`

`spring.datasource.username=****`

`spring.datasource.password=****`

`spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect`

`fourm.app.jwtSecret=****`

`fourm.app.jwtExpirationMs=****`

`security.user.name=****`

`security.user.password=****`

`security.user.role=****`

Replace the asterisks with your database url, username and password.


Notifications setup: These settings are related to sending emails to users

`spring.mail.host=smtp.gmail.com`

`spring.mail.port=587`

`spring.mail.username=*******@gmail.com`

`spring.mail.password=****************`

`spring.mail.properties.mail.smtp.auth=true`

`spring.mail.properties.mail.smtp.starttls.enable=true`

`spring.mail.properties.mail.smtp.starttls.required=true`
