# Hire A Lambda Grad

## NAVIGATION

[Register User](#register)<br>
[Login](#login)<br>
[Get All Students](#get-students)<br>
[Get Student Locations](#get-student-locations)<br>
[Get Single Student](#get-single-student)<br>
[Update Student Information](#edit-student)<br>
[Delete An Account](#delete-account)<br>

# Base URL

 **https://halg-backend.herokuapp.com/**

## REGISTER <a name="register"></a>

### Register an Account

_Method URL: /api/auth/register_

_HTTP method: [POST]_

### Headers

| name         | type   | required | description              |
| ------------ | ------ | -------- | ------------------------ |
| Content-Type | String | Yes      | Must be application/json |

### Body

| name       | type    | required | description           |
| ---------- | ------- | -------- | --------------------- |
| username   | String  | Yes      | Must be unique        |
| email      | String  | Yes      | Must be unique        |
| first_name | String  | Yes      |                       |
| last_name  | String  | Yes      |                       |
| password   | String  | Yes      |                       |
| role_id    | Integer | Yes      | [Role ID](#get-roles) |

_example:_

```
{
  username: "johndoe",
  password: "password123",
  email: "johndoe@email.com",
  first_name: "john",
  last_name: "doe",
  role_id: 1
}
```

### Response

**201 (OK)**

> If you successfully register a user the endpoint will return an HTTP response with a status code 201 and a body as below.

```
{
 "message": "User successfully added."
}
```

**400 (Bad Request)**

> If you send in invalid fields, the endpoint will return an HTTP response with a status code 400 and a body as below.

```
{
  "error": true,
  "message": "Please provide a username, password, first name, last name, and email for registration."
}
```

> If the account already exists, the endpoint will return an HTTP response with a status code 400 and a body as below.

```
{
    "message": "The user already exists."
}
```

---

## LOGIN <a name="login"></a>

### Logs a user in

_Method Url: /api/auth/login_

_HTTP method: [POST]_

### Headers

| name         | type   | required | description              |
| ------------ | ------ | -------- | ------------------------ |
| Content-Type | String | Yes      | Must be application/json |

### Body

| name     | type   | required | description                               |
| -------- | ------ | -------- | ----------------------------------------- |
| email    | String | Yes      | Must match corresponding account email    |
| password | String | Yes      | Must match corresponding account password |

_example:_

```
{
  email: "johndoe@email.com",
  password: "password123"
}
```

### Response

**200 (OK)**

> If you successfully login, the endpoint will return an HTTP response with a status code 200 and a body as below.

```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQ0MzM1NjUxLCJleHAiOjE1NzU4OTMyNTF9.uqd2OHBYkGQpwjLTPPiPWYkYOKlG7whQDFkk46xGXoE",
  "message": "Welcome!"
}
```

**401 (Unauthorized)**

> If you send in invalid fields or the passwords do not match, the endpoint will return an HTTP response with a status code 400 and a body as below.

```
{
  "message": "There was a problem with your request."
}
```

**400 (Bad Request)**

> If you send in a form with no email or password. You will receive an HTTP error with a status code 400 and the body below.

```
{
"message": "Please provide the username and password."
}
```

---

# STUDENTS ROUTES

## GET ALL STUDENTS <a name="get-students"></a>

### Retrieves an array of all of the students, in card format.

_Method URL: /students_

_HTTP method: [GET]_

### Headers

| name          | type   | required | description |
| ------------- | ------ | -------- | ----------- |
| Authorization | String | Yes      | token       |

### Response
