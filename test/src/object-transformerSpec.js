var path = require('path');
var expect = require('must');
var Transformer = require(path.join(process.cwd(), 'src', 'object-transformer'));

describe('Transformer', function () {

    var model;
    var models;
    var schema;

    beforeEach(function () {
        model = {
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
        };

        models = [
            model,
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

        schema = {
            'title': 'user.name',
            'street': 'user.address.street'
        };
    });

    describe('Single', function () {

        it('should throw if no object is given', function () {
            expect(function () {
                new Transformer.Single();
            }).to.throw();
        });

        it('should throw if no schema is given', function () {
            expect(function () {
                new Transformer.Single(model);
            }).to.throw();
        });

        it('should throw if array is given instead of an object', function () {
            expect(function () {
                new Transformer.Single(models);
            }).to.throw();
        });

        it('should accept valid object and schema', function () {
            expect(function () {
                new Transformer.Single(model, schema);
            }).to.not.throw();
        });

        it('should add new key to schema', function () {
            var transformer = new Transformer.Single(model, schema);
            transformer.add('test', 'user.id');
            transformer.schema['test'].must.equal('user.id');
        });

        it('should remove key from schema', function () {
            var transformer = new Transformer.Single(model, schema);
            transformer.remove('title');
            expect(transformer.schema['title']).to.be.undefined();
        });

        it('should parse valid response from object based on schema', function () {
            var transformer = new Transformer.Single(model, schema);
            var parsed = transformer.parse();
            parsed.must.have.keys(['title', 'street']);
        });

        it('should throw if trying to parse object with missing key', function () {
            model = {
                this: 'fails'
            };
            schema = {
                'title': 'certainly.fails'
            };
            var transformer = new Transformer.Single(model, schema);
            expect(function () {
                transformer.parse();
            }).to.throw();
        });

        it('should throw if trying to parse object with missing deep key', function () {
            model = {
                this: 'fails'
            };
            schema = {
                'title': 'this.certainly.fails'
            };
            var transformer = new Transformer.Single(model, schema);
            expect(function () {
                transformer.parse();
            }).to.throw();
        });
    });

    describe('List', function () {

        it('should throw if no array is given', function () {
            expect(function () {
                new Transformer.List();
            }).to.throw();
        });

        it('should throw if no schema is given', function () {
            expect(function () {
                new Transformer.List(models);
            }).to.throw();
        });

        it('should accept valid array and schema', function () {
            expect(function () {
                new Transformer.List(models, schema);
            }).to.not.throw();
        });

        it('should parse all array members', function () {
            var transformer = new Transformer.List(models, schema);
            var parsed = transformer.parse();
            expect(parsed.length).to.equal(2);
        });
    });

});