### Discussion:

**Topics to discuss:**

- Route Parameters
- What type of data do we send as a route parameter?
- What do we NOT send as a route parameter?
  (Add discussion link here)

### Demo:

1. Create a route that retrieves the Chocolate Chip Cookies object only.

```javascript
app.get("/cookies/1", (req, res) => {
  const cookie = cookies.find(_cookie => _cookie.id === 1);
  res.json(cookie);
});
```

2. Create another one for the Salted Caramel Cookies object only.

```javascript
app.get("/cookies/3", (req, res) => {
  const cookie = cookies.find(_cookie => _cookie.id === 3);
  res.json(cookie);
});
```

3. As you can see the code is being repeated and is inefficient to create a route for every cookie type. To fix this issue, we will create one route that has the ID in its route, and we will capture the value from the URL.

4. To define a parameter in a route we use the `:` followed by the name of this parameter:

```javascript
app.get("/cookies/:cookieId", (req, res) => {});
```

5. Let's console log the `cookieID` then the `request` to see where is the id saved.

```javascript
app.get("/cookies/:cookieId", (req, res) => {
  console.log("Cookie ID", cookieID);
  console.log("REQUEST", req);
});
```

6. So the parameter is saved in `req.params`. We will access it and `find` the cookie with this id and compare the `cookieId` value to the IDs in the `cookies` array to fetch the `cookie` object with the same ID through the `find` method.

```javascript
app.get("/cookies/:cookieId", (req, res) => {
  const { cookieId } = req.params;
  const cookie = cookies.find(_cookie => _cookie.id === +cookieId);
});
```

7. What's missing? Yes! We didn't return a response:

```javascript
app.get("/cookies/:cookieId", (req, res) => {
  const { cookieId } = req.params;
  const cookie = cookies.find(_cookie => _cookie.id === +cookieId);
  res.json(cookie);
});
```

8. What if no cookie with this ID existed? Check the network in the browser, you'll see that a `200` response is returned which means everyting went as expected, but that's not true!

9. We need to add a condition to check if the cookie was found or not. If it's found we will return `foundCookie` as our response.

```javascript
app.get("/cookies/:cookieId", (req, res) => {
  const { cookieId } = req.params;
  const foundCookie = cookies.find(cookie => cookie.id === +cookieId);
  if (foundCookie) {
    res.json(foundCookie);
  }
});
```

10. If the cookie isn't found, we need to change the status of the response from `200` to `404`, which means that the requested item was not found. Also we will send back a message in case the frontend wants to display it:

```javascript
if (foundCookie) {
  res.json(foundCookie);
} else {
  res.status(404);
  res.json({ message: "Cookie not found" });
}
```

11. We can clean this a bit:

```javascript
res.status(404).json({ message: "Cookie not found" });
```

---

Your route should look like this by this point:

```javascript
app.get("/cookies/:cookieId", (req, res) => {
  const { cookieId } = req.params;
  const foundCookie = cookies.find(cookie => cookie.id === +cookieId);
  if (foundCookie) {
    res.json(foundCookie);
  } else {
    res.status(404).json({ message: "Cookie not found" });
  }
});
```
