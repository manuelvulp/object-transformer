var Add = function (key, value) {
    this.schema[key] = value;
    return this;
};

var Remove = function (key) {
    delete this.schema[key];
    return this;
};

var Single = function (object, schema) {
    if (!object instanceof Object) throw new Error('Transformer received no valid object');
    if (object instanceof Array) throw new Error('Transformer received no valid object');
    this.object = object;
    if (!schema) throw new Error('Transformer received no valid schema');
    this.schema = schema;
    return this;
};

Single.prototype.add = Add;
Single.prototype.remove = Remove;
Single.prototype.parse = function () {
    var response = {};
    for (var index in this.schema) {
        var split = this.schema[index].split('.');
        var value = this.object[split[0]];
        var breadcrumbs = split[0];

        if (!value && split.length > 1) {
            throw new Error('Malformed object, missing attribute "' +
                breadcrumbs + '" when trying to get attribute ' +
                breadcrumbs + '[' + split[1] + ']');
        }

        for (var i = 1; i < split.length; i++) {
            breadcrumbs += '[' + split[i] + ']';
            if (!value[split[i]] && i + 1 !== split.length) {
                throw new Error('Malformed object, missing attribute "' +
                    breadcrumbs + '" when trying to get attribute ' +
                    breadcrumbs + '[' + split[i + 1] + ']');
            }
            value = value[split[i]];
        }
        response[index] = value;
    }
    return response;
};

var List = function (array, schema) {
    if (!array instanceof Array) throw new Error('Transformer received no valid array');
    this.array = array;
    if (!schema) throw new Error('Transformer received no valid schema');
    this.schema = schema;
};

List.prototype.parse = function () {
    var response = [];
    for (var i in this.array) {
        response.push(new Single(this.array[i], this.schema).parse())
    }
    return response;
};

List.prototype.add = Add;
List.prototype.remove = Remove;

exports.Single = Single;
exports.List = List;