### Discussion:

**Topics to discuss:**

- Postman
- Route Parameters
- Request Body

### Demo:

#### Postman:

1. Open Postman and show them how to send a `get` request to `localhost:8000/cookies`.

2. Show them how to change the method.

3. Show them the response section, the status code and content.

#### Detail Route:

1. Create a route that retrieves the Chocolate Chip Cookies object only.

```javascript
app.get("/cookies/1", (req, res) => {
  const cookie = cookies.find((_cookie) => _cookie.id === 1);
  res.json(cookie);
});
```

2. Create another one for the Salted Caramel Cookies object only.

```javascript
app.get("/cookies/3", (req, res) => {
  const cookie = cookies.find((_cookie) => _cookie.id === 3);
  res.json(cookie);
});
```

3. As you can see the code is being repeated and is inefficient to create a route for every cookie type. To fix this issue, we will create one route that has the ID in its route, and we will capture the value from the URL.

4. To define a parameter in a route we use the `:` followed by the name of this parameter:

```javascript
app.get("/cookies/:cookieId", (req, res) => {});
```

5. Let's console log the cookie ID then the `request` to see where is the ID saved.

```javascript
app.get("/cookies/:cookieId", (req, res) => {
  console.log("Cookie ID", cookieId);
  console.log("REQUEST", req);
});
```

6. So the parameter is saved in `req.params`. We will access it and `find` the cookie with this id and compare the `cookieId` value to the IDs in the `cookies` array to fetch the `cookie` object with the same ID through the `find` method.

```javascript
app.get("/cookies/:cookieId", (req, res) => {
  const { cookieId } = req.params;
  const cookie = cookies.find((_cookie) => _cookie.id === +cookieId);
});
```

7. What's missing? Yes! We didn't return a response:

```javascript
app.get("/cookies/:cookieId", (req, res) => {
  const { cookieId } = req.params;
  const cookie = cookies.find((_cookie) => _cookie.id === +cookieId);
  res.json(cookie);
});
```

#### Request Body:

1. Whenever we're creating, we use the `post` method. Let's try it out!

   ```javascript
   app.post("/cookies", (req, res) => {});
   ```

2. To send data, we pass it through the body of the request. How can we do that in Postman?

   - Step 1: Open Postman, and create new POST request at the top.
   - Step 2: Copy and paste this url in Postman `http://localhost:8000/cookies`.
   - Step 3: Under the **URL field**, click on **Body** and choose `raw`.
   - Step 4: In Body, `raw`, choose `data type: json` and put in your data.

3. How do we receive the data? Let's `console.log` the request `req`:

   ```javascript
   app.post("/cookies", (req, res) => {
     console.log(req);
   });
   ```

   We can't find the data! What do we do? For Express to handle the body of a request, we will use a **middleware**.

4. In `app.js` we will call `app.use` which is a middleware, and inside it we will call `express.json()` method which will parse the body as JSON data and **before** your routes so that it will be applied to all routes.

   ```javascript
   const app = express();

   app.use(express.json());

   [...]
   ```

   _Note: Make sure to call `app.use` **before** your routes so that it will be applied to all routes._

5. Let's send a request to the route again. As you can see the data is saved inside `req.body`.
   ```javascript
   app.post("/cookies", (req, res) => {
     console.log(req.body);
   });
   ```
