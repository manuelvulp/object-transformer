[ ![Codeship Status for manuelvulp/object-transformer](https://codeship.io/projects/10036310-05c2-0132-c600-0e3e5d6e47ce/status)](https://codeship.io/projects/30943)
[![Coverage Status](https://img.shields.io/coveralls/manuelvulp/object-transformer.svg)](https://coveralls.io/r/manuelvulp/object-transformer?branch=master)

### [Node.js] Object-transformer

Utility to transform objects 

```
npm install object-transformer
```

#Example

```javascript
var Transformer = require('./transformer');

var models = [
    {
        id: '00eb000a0de000b000baa0ea',
        user: {
            id: '11eb111a1de111b111baa1eb',
            name: 'John',
            address: {
                street: 'FooStreet',
                house: 1,
                appartment: 2
            }
        },
        message: 'bar'
    },
    {
        id: '00eb000a0de000b000baa0ea',
        user: {
            id: '11eb111a1de111b111baa1eb',
            name: 'Doe',
            address: {
                street: 'BarStreet',
                house: 3,
                appartment: 4
            }
        },
        message: 'baz'
    }
];

// Schemas that will be used to transform the model

var singleSchema = {
    'title': 'user.name',
    'street': 'user.address.street'
};

var listSchema = {
    'message': 'message',
    'address': 'user.address'
};

var single = new Transformer.Single(models[0], singleSchema).parse();
console.log(single); // Output: { title: 'John', street: 'FooStreet' }

var list = new Transformer.List(models, listSchema).parse();
console.log(list);  

/* Output:
[
    {
        message: 'bar',
        address: {
            street: 'FooStreet',
            house: 1,
            appartment: 2
        }
    },
    { 
        message: 'baz',
        address: {
            street: 'BarStreet',
            house: 3,
            appartment: 4
        }
    }
]
*/
```