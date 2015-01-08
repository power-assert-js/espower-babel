/* no transpile, this is  */
(function(global){
  "use strict";
  var Person = function(name, age){
    this.name = name;
    this.age = age;
  };
  Person.prototype.getAge = function() {
    return this.age;
  };
  Person.prototype.greet = function() {
    return "Hello! I am " + this.name + ". My age is " + this.age;
  };
  if (module && module.exports) {
    module.exports = Person;
  } else {
    global.Person = Person;
  }
}(typeof global !== 'undefined' ? global : this));

