## Redis

- The in-memory data store used as a cache, vector database, document database, streaming engine, and message broker.

## 🤔 What Problem Redis Solves ?

Think like this first time user came to application and out hompage/ application first page talk to Database and get the data
but that data is geting query from multipule table with foregin Key/Lookup's . But it work fin till now BUTTTT,
if user cam and reload instantly then we need to query again from server to db and db will do it's internal query wich is expensive in term of time and money . To Resolve this Unnesccery db calls which lead to increse in server cost and read's. we implemented services like redis ,

#### After introduction of redis

- we introduces or redis server so when ever user come the server will ask redis do you have any data to display of not then server will call the db and get the data for first time and **do cahed the computed data** on the redis also display the data to user, Now if user reload the server will get the data form the redis not from the db now we dont need to query db again ,

- Now the user is also happy that application is fast and we as devloper are also happy that we reduced the db cost and calss

- 1->ReQuery

- 2->Data Comming from multipule tabel Led to increse in response time

#### What do we mean by computed data ?

- Think like tha we have the 20 unread message so we will do query form the db for the first time and after that we will get that computed length of unread message form redis we alos can increse he value of count in redis also

---

## DATA TYPES

- String
- JSON
- List
- Sets
- Hashes
- Sorted Sets
- Bitmaps
- Bitfields

## How to Define String value in redis

<enitity>:<id> value

    //key  //value

set user:1 piyusg
set user:2 jhon

set msg:3 howareyour nx [this nx means that save in the redis if it dose not exists]

### Getting and setting Strings

- SET stores a string value.
- SETNX stores a string value only if the key doesn't already exist. Useful for implementing locks.
- GET retrieves a string value.
- MGET retrieves multiple string values in a single operation. ( mset bike:1 "Deimos" bike:2 "Ares" bike:3 "Vanth")

### Strings as counters

```
 > set count 0
    OK
    > incr count
    (integer) 1
    > incrby count 100
    (integer) 101
```

## 📞 Talking With Redis Using Node js

If we using local host then setup client.js

```
npm i ioredis
```

```
import { Redis } from "ioredis";
const client = new Redis();
export { client };

```

If We Using Redis Cloud

```
npm i redis
```

```
import { createClient } from 'redis';

const client = createClient({
    password: 'redis_database_password',
    socket: {
        host: 'redis_host_url,
        port: 'redis_port_on_host'
    }
});

```

## STRING

- How to Define string in the redis

```
 await client.set("msg:1", "Hey from node js");
```

- How To Set expire on the string

```
await client.expire("msg:1", 10);
```

- How To Get The String from redis

```
await client.get("msg:1")
```

## Lists

- Baically an array

- Redis lists are linked lists of string values. Redis lists are frequently used to:

- 1. Implement stacks and queues.
- 2. Build queue management for background worker systems.

### Basic commands

- LPUSH adds a new element to the head of a list; RPUSH adds to the tail.

- LPOP removes and returns an element from the head of a list; RPOP does the same but from the tails of a list.

- LLEN returns the length of a list.

- LMOVE atomically moves elements from one list to another.

- LTRIM reduces a list to the specified range of elements.

### 💡Note

1.  If you push every time from the left and take out from the right then it will act like **Queue**

- - Left->Insert
- - Right->Remove

2. If you push every time from the left and also take out from left then it will act like a **Stack**

- - Left->Insert
- - Left->Remove

## Blocking commands

Lists support several blocking commands. For example:

- BLPOP removes and returns an element from the head of a list. If the list is empty, the command blocks until an element becomes available or until the specified timeout is reached.

- BLMOVE atomically moves elements from a source list to a target list. If the source list is empty, the command will block until a new element becomes available

```

// Decaraling multipule in cli
RPUSH messages:chat messages:hi messages:hello messages:howareyou messages:youthere messages:whatsup

```

## Sets

A Redis set is an unordered collection of unique strings (members) || Dont allow to repatitive element . You can use Redis sets to efficiently:

- Track unique items (e.g., track all unique IP addresses accessing a given blog post).
- Represent relations (e.g., the set of all users with a given role).
- Perform common set operations such as intersection, unions, and differences.

## Basic commands

- SADD adds a new member to a set.

- SREM removes the specified member from the set.

- SISMEMBER tests a string for set membership.

- SINTER returns the set of members that two or more sets have in common (i.e., the intersection).

- SCARD returns the size (a.k.a. cardinality) of a set.

```

await client.set('key', 'value');
const value = await client.get('key');
```

## Hashes || HashMap

- Redis hashes are record types structured as collections of field-value pairs. You can use hashes to represent basic objects and to store groupings of counters, among other things.

### Basic commands

- HSET sets the value of one or more fields on a hash.
- HGET returns the value at a given field.
  HMGET returns the values at one or more given fields.
- HINCRBY increments the value at a given field by the integer provided.

```
const fieldsAdded = await client.hSet(
    'bike:1',
    {
        model: 'Deimos',
        brand: 'Ergonom',
        type: 'Enduro bikes',
        price: 4972,
    },
)
console.log(`Number of fields were added: ${fieldsAdded}`);
// Number of fields were added: 4

const model = await client.hGet('bike:1', 'model');
console.log(`Model: ${model}`);
// Model: Deimos

const price = await client.hGet('bike:1', 'price');
console.log(`Price: ${price}`);
// Price: 4972

const bike = await client.hGetAll('bike:1');
console.log(bike);

```

## Soretd Sets || Priority Queue

A Redis sorted set is a collection of unique strings (members) ordered by an associated score. When more than one string has the same score, the strings are ordered lexicographically. Some use cases for sorted sets include:

- Leaderboards. For example, you can use sorted sets to easily maintain ordered lists of the highest scores in a massive online game.
- Rate limiters. In particular, you can use a sorted set to build a sliding-window rate limiter to prevent excessive API requests.

You can think of sorted sets as a mix between a Set and a Hash. Like sets, sorted sets are composed of unique, non-repeating string elements, so in some sense a sorted set is a set as well.

Moreover, elements in a sorted set are taken in order (so they are not ordered on request, order is a peculiarity of the data structure used to represent sorted sets). They are ordered according to the following rule:

- If B and A are two elements with a different score, then A > B if A.score is > B.score.
- If B and A have exactly the same score, then A > B if the A string is lexicographically greater than the B string. B and A strings can't be equal since sorted sets only have unique elements.

```
const movieRatings = [
  {
    key: "star-wars",
    score: 4,
  },
  {
    key: "marvel",
    score: 5,
  },
]


// Sorted Set Add
await redis.zadd("movie-ratings", 4, "star-wars")
await redis.zadd("movie-ratings", 5, "marvel")


// Sorted Set Range
const result = await redis.zrange("movie-ratings", 1, 3)
console.log(result) // [ 'marvel' ]


// Sorted Set Count
const result = await redis.zcard("movie-ratings")
console.log(result) // 2

// Sorted Set Range
const result = await redis.zrange("movie-ratings", 1, 3)
console.log(result) // [ 'marvel' ]

const result2 = await redis.zrange("movie-ratings", 0, -1)
console.log(result2) // [ 'star-wars', 'marvel' ]


// Sorted Set Diff
await redis.zadd("movie-ratings-user2", 3, "marvel")

const numberOfSets = 2
const result = await redis.zdiff(numberOfSets, "movie-ratings", "movie-ratings-user2")
console.log(result) // [ 'star-wars' ]

```

## Streams

- Just like a apache kafka, stream is kind a alternative of kafka having same high through output,because it also use primary memory (in-memory)

Examples of Redis stream use cases include:

- Event sourcing (e.g., tracking user actions, clicks, etc.)
- Sensor monitoring (e.g., readings from devices in the field)
- Notifications (e.g., storing a record of each user's notifications in a separate stream)

### Basic commands

- XADD adds a new entry to a stream.

- XREAD reads one or more entries, starting at a given position and moving forward in time.

- XRANGE returns a range of entries between two supplied entry IDs.

- XLEN returns the length of a stream.

```

import { client } from "./client.js";

async function init() {
  // await client.xadd("temp", "*", "t", "2");
  // await client.xadd("temp", "*", "t", "3");
  // await client.xadd("temp", "*", "t", "4");
  // await client.xadd("temp", "*", "t", "2");

  // Get All The Data
  //const items = await client.xrange("temp", "-", "+");

  // Will get only 2 items
  const items = await client.xrange("temp", "-", "+","COUNT", 2);
  console.log(items);
}

```

## Geospatial

- Geospatial is used for gelocation calculation's like zomatao, uber eats , have the resturante location and client location then they can caluclate the distance b/w them

- Redis geospatial indexes let you store coordinates and search for them. This data structure is useful for finding nearby points within a given radius or bounding box.

### Basic commands

- GEOADD adds a location to a given geospatial index (note that longitude comes before latitude with this command).

- GEOSEARCH returns locations with a given radius or a bounding box

## Bitmaps

- Bitmaps are not an actual data type, but a set of bit-oriented operations defined on the String type which is treated like a bit vector.

- Think like this you are making a application which is related to airplane and you need to maintain the log's when the aireplane contacted your system so you can use this

Example

- Suppose you have 1000 cyclists racing through the country-side, with sensors on their bikes labeled 0-999. You want to quickly determine whether a given sensor has pinged a tracking server within the hour to check in on a rider.

You can represent this scenario using a bitmap whose ke y references the current hour.

- Rider 123 pings the server on January 1, 2024 within the 00:00 hour. You can then confirm that rider 123 pinged the server. You can also check to see if rider 456 has pinged the server for that same hour.

```
> SETBIT pings:2024-01-01-00:00 123 1
(integer) 0

> GETBIT pings:2024-01-01-00:00 123
1

> GETBIT pings:2024-01-01-00:00 456
0

```

# ⭐PUB-SUB

- Help in speding up the api request

```
import express from "express";
import axios from "axios";
import { client } from "./client.js";

const app = express();

app.get("/", async (req, res) => {
  const cacheValue = await client.get("todos");

  if (cacheValue) {
    console.log("cahced from redis");
    return res.json(JSON.parse(cacheValue));
  }

  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );

  await client.set("todos", JSON.stringify(data));
  await client.expire("todos", 30);

  return res.json(data);
});

app.listen(9000, () => {
  console.log("Server is up and runing");
});
```
