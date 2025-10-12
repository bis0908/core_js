function Person(name, initialAge){
  let _age = initialAge;
  let _log = [];

  this.name = name;

  this.getAge = ()=>{
    _log.push(`Accessed age at ${new Date}`)
    return _age;
  }

  this.setAge = (newAge)=>{
    if (newAge > 0 && newAge < 100) {
      _log.push(`Age changed from ${_age} to ${newAge}`)
      _age = newAge;
    } else {
      console.error('Invalid age!')
      _log.push(`Attempted to set invalid age ${newAge}`)
    }
  };

  this.getChangedHistory = function () { 
    return _log;
   };
}

const person = new Person("Alice", 30)

console.log(person._age);
console.log(person.getAge())
person.setAge(25)
console.log(person.getAge())
person.setAge(-10)
console.log(person.getChangedHistory())

