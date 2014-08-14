var path = require('path');
var expect = require('must');
var Transformer = require(path.join(process.cwd(), 'src', 'object-transformer'));

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

var singleSchema = {
    'title': 'user.name',
    'street': 'user.address.street'
};

var listSchema = {
    'message': 'message',
    'address': 'user.address'
};

describe('Transformer', function () {

    describe('Single', function () {

        it('should throw error if no schema is specified', function () {
            expect(new Transformer.Single()).to.throw();
        });
    });

});