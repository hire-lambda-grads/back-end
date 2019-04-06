# Hire A Lambda Grad

## NAVIGATION

[Register User](#register) | [Login](#login) | [Get All Students](#get-students) | [Get Single Student](#get-single-student) | [Update Student Information](#edit-student) | [Delete An Account](#delete-account) | [Get a Student Card](#get-student-card) | [Get Student Locations](#get-student-locations) | [Examples of Headers](#headers-examples)

# Base URL

- https://halg-backend.herokuapp.com/

## REGISTER <a name="register"></a>

### Register an Account

_Method URL: /api/auth/register_

_HTTP method: [POST]_

### Headers

| name         | type   | required | description              |
| ------------ | ------ | -------- | ------------------------ |
| Content-Type | String | Yes      | Must be application/json |

### Body

| name       | type    | required | description        |
| ---------- | ------- | -------- | ------------------ |
| username   | String  | Yes      | Must be unique     |
| email      | String  | Yes      | Must be unique     |
| first_name | String  | Yes      |                    |
| last_name  | String  | Yes      |                    |
| password   | String  | Yes      |                    |
| role_id    | Integer | Yes      | [Role](#get-roles) |

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

_Method Url: /users/login_

_HTTP method: [POST]_

### Headers

| name         | type   | required | description              |
| ------------ | ------ | -------- | ------------------------ |
| Content-Type | String | Yes      | Must be application/json |

### Body

| name     | type   | required | description                                                        |
| -------- | ------ | -------- | ------------------------------------------------------------------ |
| email    | String | Yes      | Must match an email in the database                                |
| password | String | Yes      | Must match a password in the database corresponding to above email |

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
  "message": "welcome john doe"
}
```

**400 (Bad Request)**

> If you send in invalid fields or the passwords do not match, the endpoint will return an HTTP response with a status code 400 and a body as below.

```
{
  "error": true,
  "message": "There was a problem with your request."
}
```

**404 (Not Found)**

> If you send in an email address that does not match one in the database, the endpoint will return an HTTP response with a status code 404 and a body as below.

```
{
"message": "🔍 - Not Found - <resource that was not found>",
"stack": "🥞"
}
```

---

# WORKOUT JOURNAL ROUTES

## GET WORKOUT JOURNALS AND EXERCISE CARDS <a name="get-workouts"></a>

### Retrieves an object with 2 arrays containing users workouts journals and exercise cards

_Method URL: /workouts_

_HTTP method: [GET]_

### Headers

| name          | type   | required | description |
| ------------- | ------ | -------- | ----------- |
| Authorization | String | Yes      | token       |

### Response

**200 (OK)**

> will send back an array of objects like below

```
{
    "journalsObj": [
        {
            "id": 1,
            "date": "Feb 12, 2019",
            "region": "upper body"
        },
        {
            "id": 5,
            "date": "Feb 13, 2019",
            "region": "legs"
        },
        {
            "id": 9,
            "date": "Feb 14, 2019",
            "region": "legs"
        },
        {
            "id": 13,
            "date": "Feb 20",
            "region": "upper body"
        }
    ],
    "exerciseCards": [
        {
            "id": 1,
            "journalId": 1,
            "name": "bench press",
            "reps": 12,
            "sets": 3,
            "weight": "190lbs"
        },
        {
            "id": 2,
            "journalId": 1,
            "name": "curls",
            "reps": 15,
            "sets": 3,
            "weight": "60lbs"
        },
        {
            "id": 3,
            "journalId": 5,
            "name": "leg press",
            "reps": 12,
            "sets": 3,
            "weight": "250lbs"
        },
        {
            "id": 4,
            "journalId": 9,
            "name": "squats",
            "reps": 25,
            "sets": 5,
            "weight": "150lbs"
        }
    ]
}
```

---

## GET SPECIFIC WORKOUT JOURNAL <a name="get-single-workout"></a>

### Gets a workout journal with a specified ID

_Method Url: /workouts/:journalId_

_HTTP method: [GET]_

### Headers

| name          | type   | required | description |
| ------------- | ------ | -------- | ----------- |
| Authorization | String | No       | token       |

|

### Parameters

| name      | type | required | description            |
| --------- | ---- | -------- | ---------------------- |
| journalId | Int  | Yes      | Id of specific workout |

### Response

**200 (OK)**

> If you send a valid workout id with a valid authorization token, the endpoint will return an HTTP response with a status code 200 and a body as below.

```
 {
    "id": 1,
    "date": "Feb 12, 2019",
    "region": "upper body",
    "exercises": [
      {
        "id": 1,
        "journalId": 1,
        "name": "bench press",
        "weight": "200lb",
        "reps": 5,
        "sets": 3,
     },
      {
        "id": 2,
        "journalId": 1,
        "name": "curls",
        "weight": "60lb",
        "reps": 10,
        "sets": 3,
      }
    ]
  }
```

**404 (Not Found)**

> If you pass in an id that does not match one in the database, the endpoint will return an HTTP response with a status code 404 and a body as below.

{
"message": "🔍 - Not Found - <resource that was not found>",
"stack": "🥞"
}

---

## POST A WORKOUT JOURNAL <a name="add-workout"></a>

### Adds a new workout journal

_Method Url: /workouts_

_HTTP method: [POST]_

### Headers

| name          | type   | required | description |
| ------------- | ------ | -------- | ----------- |
| Authorization | String | Yes      | token       |

### Body

| name   | type   | required | description    |
| ------ | ------ | -------- | -------------- |
| date   | String | Yes      | string of nums |
| region | String | Yes      |                |

_example:_

```
{
  date: "Feb 2 2019",
  region: "upper body"
}
```

### Response

**201 (OK)**

> If you successfully create a new workout the endpoint will return an HTTP response with a status code 200 and a body containing the newly created workouts id as shown below.

```
[
  12
]
```

**400 (Bad Request)**

> If you send in invalid fields, the endpoint will return an HTTP response with a status code 400 and a body as below.

```
{
  "error": true,
  "message": "There was a problem with your request."
}
```

**401 (Unauthorized)**

> If you are not logged in, then endpoint will return an HTTP response with a status code 401 and a body as below.

```
{
  "error": true,
  "message": "You are unauthorized to view the content."
}
```

---

## EDIT SPECIFIC WORKOUT JOURNAL <a name="edit-workout"></a>

### Edits one or more details of a specific workout journal created by the user.

_Method Url: /workouts/:journalId_

_HTTP method: [PUT]_

### Headers

| name          | type   | required | description              |
| ------------- | ------ | -------- | ------------------------ |
| Content-Type  | String | Yes      | Must be application/json |
| Authorization | String | Yes      | token                    |

### Parameters

| name      | type | required | description            |
| --------- | ---- | -------- | ---------------------- |
| journalId | Int  | Yes      | Id of specific workout |

### Body

| name   | type   | required | description         |
| ------ | ------ | -------- | ------------------- |
| date   | String | No       | New date of workout |
| region | String | No       | New region workout  |

**example:**

```
{
  "journalId": 2,
  date: "Feb 2 2019",
  region: "legs",
}
```

### Response

**200 (OK)**

> If the request is successful, the server will return an HTTP response with a status code 200 and the id of the updated workout.

```
[
  12
]
```

**400 (Bad Request)**

> If you send in invalid fields, the endpoint will return an HTTP response with a status code 400 and a body as below.

```
{
  "error": true,
  "message": "There was a problem with your request."
}
```

**401 (Unauthorized)**

> If you are not logged in the endpoint will return an HTTP response with a status code 401 and a body as below.

```
{
  "error": true,
  "message": "You are unauthorized to view the content."
}
```

**404 (Not Found)**

> If you pass in an id that does not match one in the database, the endpoint will return an HTTP response with a status code 404 and a body as below.

```
{
"message": "🔍 - Not Found - <resource that was not found>",
"stack": "🥞"
}
```

---

## DELETE WORKOUT JOURNAL <a name="delete-workout"></a>

### Deletes workout journal with specific id.

_Method Url: /workouts/:journalId_

_HTTP method: [DELETE]_

### Headers

| name          | type   | required | description |
| ------------- | ------ | -------- | ----------- |
| Authorization | String | Yes      | token       |

### Parameters

| name      | type | required | description            |
| --------- | ---- | -------- | ---------------------- |
| journalId | Int  | Yes      | Id of specific workout |

### Response

**200 (OK)**

> If the request is successful, the server will return an HTTP response with a status code 200 and the following message.

```
{
    "message": "Workout successfully deleted."
}
```

**401 (Unauthorized)**

If you are not logged in the endpoint will return an HTTP response with a status code 401 and a body as below.

```
{
  "error": true,
  "message": "You are unauthorized to view the content."
}
```

**404 (Not Found)**

> If you pass in an id that does not match one in the database, the endpoint will return an HTTP response with a status code 404 and a body as below.

```
{
"message": "🔍 - Not Found - <resource that was not found>",
"stack": "🥞"
}
```

---

## GET ALL EXERCISE CARDS FOR SPECIFIED JOURNAL

### Gets an array of exercise cards for specified journal

_Method Url: /workouts/:journalId/exercises_

_HTTP method: [GET]_

### Headers

| name          | type   | required | description |
| ------------- | ------ | -------- | ----------- |
| Authorization | String | Yes      | token       |

|

### Parameters

| name      | type | required | description            |
| --------- | ---- | -------- | ---------------------- |
| journalId | Int  | Yes      | Id of specific journal |

### Response

**200 (OK)**

> If you send a valid workout id with a valid authorization token, the endpoint will return an HTTP response with a status code 200 and a body as below.

```
[
    {
        "id": 3,
        "journalId": 2,
        "userId": 2,
        "name": "leg press",
        "reps": 12,
        "sets": 3,
        "weight": "250lbs"
    },
    {
        "id": 4,
        "journalId": 2,
        "userId": 2,
        "name": "military press",
        "reps": 12,
        "sets": 3,
        "weight": "130lbs"
    },
    {
        "id": 5,
        "journalId": 2,
        "userId": 2,
        "name": "squats",
        "reps": 12,
        "sets": 3,
        "weight": "230lbs"
    },
    {
        "id": 13,
        "journalId": 2,
        "userId": 1,
        "name": "squats",
        "reps": 25,
        "sets": 5,
        "weight": "150lbs"
    }
]
```

**404 (Not Found)**

> If you pass in an id that does not match one in the database, the endpoint will return an HTTP response with a status code 404 and a body as below.

{
"message": "🔍 - Not Found - <resource that was not found>",
"stack": "🥞"
}

---

## GET SPECIFIC EXERCISE CARD <a name="get-exercise"></a>

### Gets a exercise card with a specified ID

_Method Url: /workouts/:journalId/exercises/:id_

_HTTP method: [GET]_

### Headers

| name          | type   | required | description |
| ------------- | ------ | -------- | ----------- |
| Authorization | String | Yes      | token       |

|

### Parameters

| name      | type | required | description            |
| --------- | ---- | -------- | ---------------------- |
| journalId | Int  | Yes      | Id of specific workout |
| id        | Int  | Yes      | Id of specific workout |

### Response

**200 (OK)**

> If you send a valid workout id with a valid authorization token, the endpoint will return an HTTP response with a status code 200 and a body as below.

```
      {
        "id": 1,
        "journalId": 1,
        "name": "bench press",
        "weight": "200lb",
        "reps": 5,
        "sets": 3,
     }
```

**404 (Not Found)**

> If you pass in an id that does not match one in the database, the endpoint will return an HTTP response with a status code 404 and a body as below.

{
"message": "🔍 - Not Found - <resource that was not found>",
"stack": "🥞"
}

---

## POST AN EXERCISE CARD <a name="add-exercise"></a>

### Adds a new exercise card

_Method Url: /workouts/:journalId/exercises_

_HTTP method: [POST]_

### Headers

| name          | type   | required | description |
| ------------- | ------ | -------- | ----------- |
| Authorization | String | Yes      | token       |

### Body

| name      | type   | required | description |
| --------- | ------ | -------- | ----------- |
| journalId | Int    | Yes      |             |
| name      | String | Yes      |             |
| reps      | Int    | Yes      |             |
| sets      | Int    | Yes      |             |
| weight    | String | Yes      |             |

_example:_

```
{
  journalId: 1,
  name: "curls",
  reps: 10,
  sets: 3,
  weight: "75lbs"
}
```

### Response

**201 (OK)**

> If you successfully create a new workout the endpoint will return an HTTP response with a status code 200 and a body containing the newly created workouts id as shown below.

```
[
  12
]
```

**400 (Bad Request)**

> If you send in invalid fields, the endpoint will return an HTTP response with a status code 400 and a body as below.

```
{
  "error": true,
  "message": "There was a problem with your request."
}
```

**401 (Unauthorized)**

> If you are not logged in, then endpoint will return an HTTP response with a status code 401 and a body as below.

```
{
  "error": true,
  "message": "You are unauthorized to view the content."
}
```

---

## EDIT SPECIFIC EXERCISE CARD <a name="edit-exercise"></a>

### Edits one or more details of a specific exercise card created by the user.

_Method Url: /workouts/:journalId/exercises/:id_

_HTTP method: [PUT]_

### Headers

| name          | type   | required | description              |
| ------------- | ------ | -------- | ------------------------ |
| Content-Type  | String | Yes      | Must be application/json |
| Authorization | String | Yes      | token                    |

### Parameters

| name      | type | required | description            |
| --------- | ---- | -------- | ---------------------- |
| journalId | Int  | Yes      | Id of specific workout |
| id        | Int  | Yes      | Id of specific workout |

### Body

| name      | type   | required | description |
| --------- | ------ | -------- | ----------- |
| journalId | Int    | Yes      |             |
| name      | String | Yes      |             |
| reps      | Int    | Yes      |             |
| sets      | Int    | Yes      |             |
| weight    | String | Yes      |             |

_example:_

```
{
  journalId: 1,
  name: "curls",
  reps: 10,
  sets: 3,
  weight: "75lbs"
}
```

### Response

**200 (OK)**

> If the request is successful, the server will return an HTTP response with a status code 200 and the id of the updated workout.

```
[
  12
]
```

**400 (Bad Request)**

> If you send in invalid fields, the endpoint will return an HTTP response with a status code 400 and a body as below.

```
{
  "error": true,
  "message": "There was a problem with your request."
}
```

**401 (Unauthorized)**

> If you are not logged in the endpoint will return an HTTP response with a status code 401 and a body as below.

```
{
  "error": true,
  "message": "You are unauthorized to view the content."
}
```

**404 (Not Found)**

> If you pass in an id that does not match one in the database, the endpoint will return an HTTP response with a status code 404 and a body as below.

```
{
"message": "🔍 - Not Found - <resource that was not found>",
"stack": "🥞"
}
```

---

## DELETE EXERCISE CARD <a name="delete-exercise"></a>

### Deletes workout journal with specific id.

_Method Url: /workouts/:journalId/exercises/:id_

_HTTP method: [DELETE]_

### Headers

| name          | type   | required | description |
| ------------- | ------ | -------- | ----------- |
| Authorization | String | Yes      | token       |

### Parameters

| name      | type | required | description             |
| --------- | ---- | -------- | ----------------------- |
| journalId | Int  | Yes      | Id of specific exercise |
| id        | Int  | Yes      | Id of specific workout  |

### Response

**200 (OK)**

> If the request is successful, the server will return an HTTP response with a status code 200 and the following message.

```
{
    "message": "Workout successfully deleted."
}
```

**401 (Unauthorized)**

If you are not logged in the endpoint will return an HTTP response with a status code 401 and a body as below.

```
{
  "error": true,
  "message": "You are unauthorized to view the content."
}
```

**404 (Not Found)**

> If you pass in an id that does not match one in the database, the endpoint will return an HTTP response with a status code 404 and a body as below.

```
{
"message": "🔍 - Not Found - <resource that was not found>",
"stack": "🥞"
}
```

---

## HEADERS OBJECT AND AXIOS CALL SAMPLES <a name="headers-examples"></a>

> When sending requests to an endpoint requiring authorization, headers bearing the JSON Web Token must be present as seen in the 2 examples below

### AUTHORIZED GET AXIOS EXAMPLE

```
const headersObj = {
  headers: {
    Authorization: JWT_token
  }
}

axios.get(`https://${API_URL}/workouts`, headersObj)
  .then(({data}) => this.setState({workouts: data}))
  .catch(err => console.log("error", err))
```

### AUTHORIZED POST AXIOS EXAMPLE

```
const userObj = {
  headers: {
    Authorization: JWT_token
  },
  body: {
    username: "john doe",
    email: "johndoe@email.com",
    password: "password123"
  }
}

axios.post(`https://${API_URL}/workouts`, userObj)
  .then((res) => console.log(res))
  .catch(err => console.log("error", err))
```

> alternate axios call syntax below may also be used

### AUTHORIZED GET AXIOS EXAMPLE 2

```
axios({
  method: "get",
  url: `https://${API_URL}/workouts`,
  headers: {
    Authorization: token
  }
})
  .then(({data}) => this.setState({workouts: data}))
  .catch(err => console.log("error", err))
```

### AUTHORIZED POST AXIOS EXAMPLE 2

```
axios({
  method: "post",
  url: `https://${API_URL}/workouts`,
  headers: {
    Authorization: token
  },
  body: {
    username: "john doe",
    email: "johndoe@email.com",
    password: "password123"
  }
})
  .then((res) => console.log(res))
  .catch(err => console.log("error", err))
```

---
