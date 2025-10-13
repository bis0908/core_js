/**
 * practical-3.js: 프로토타입 체인을 활용한 믹스인 패턴
 *
 * 믹스인(Mixin)은 여러 객체의 기능을 하나의 객체에 합치는 패턴입니다.
 * 자바스크립트는 단일 상속만 지원하지만, 믹스인 패턴을 사용하면
 * 여러 소스로부터 기능을 조합할 수 있습니다.
 *
 * 이 파일에서는:
 * - 믹스인 패턴의 기본 구현
 * - Object.assign()을 활용한 믹스인
 * - 프로토타입 체인과 믹스인의 결합
 * - 실무 활용 사례
 */

console.log("=== practical-3: 믹스인 패턴 ===");

// 기본 믹스인 함수
console.log("\n=== 기본 믹스인 함수 구현 ===");

function mixin(target, source) {
	for (var key in source) {
		if (source.hasOwnProperty(key)) {
			target[key] = source[key];
		}
	}
	return target;
}

var canEat = {
	eat: function (food) {
		console.log(this.name + "이(가) " + food + "을(를) 먹습니다.");
	},
};

var canWalk = {
	walk: function () {
		console.log(this.name + "이(가) 걷습니다.");
	},
};

var canSwim = {
	swim: function () {
		console.log(this.name + "이(가) 수영합니다.");
	},
};

// Person 생성자 함수
var Person = function (name) {
	this.name = name;
};

// 프로토타입에 믹스인 적용
mixin(Person.prototype, canEat);
mixin(Person.prototype, canWalk);

var person = new Person("철수");
person.eat("밥"); // 철수이(가) 밥을(를) 먹습니다.
person.walk(); // 철수이(가) 걷습니다.

console.log("==================================================");

// Object.assign()을 활용한 믹스인 (ES6)
console.log("\n=== Object.assign()을 활용한 믹스인 ===");

var Animal = function (name) {
	this.name = name;
};

// Object.assign()으로 여러 믹스인을 한 번에 적용
Object.assign(Animal.prototype, canEat, canWalk, canSwim);

var dolphin = new Animal("돌고래");
dolphin.eat("물고기"); // 돌고래이(가) 물고기을(를) 먹습니다.
dolphin.swim(); // 돌고래이(가) 수영합니다.

console.log("==================================================");

// 체이닝 가능한 믹스인 함수
console.log("\n=== 체이닝 가능한 믹스인 ===");

function chainableMixin(target) {
	var mixins = Array.prototype.slice.call(arguments, 1);
	mixins.forEach(function (source) {
		for (var key in source) {
			if (source.hasOwnProperty(key)) {
				target[key] = source[key];
			}
		}
	});
	return target;
}

var canFly = {
	fly: function () {
		console.log(this.name + "이(가) 날아갑니다.");
	},
};

var canSing = {
	sing: function () {
		console.log(this.name + "이(가) 노래합니다.");
	},
};

var Bird = function (name) {
	this.name = name;
};

// 여러 믹스인을 한 번에 적용
chainableMixin(Bird.prototype, canEat, canFly, canSing);

var bird = new Bird("참새");
bird.eat("곤충"); // 참새이(가) 곤충을(를) 먹습니다.
bird.fly(); // 참새이(가) 날아갑니다.
bird.sing(); // 참새이(가) 노래합니다.

console.log("==================================================");

// 실무 활용: 이벤트 믹스인
console.log("\n=== 실무 활용 1: 이벤트 시스템 믹스인 ===");

var EventEmitter = {
	on: function (event, handler) {
		this._events = this._events || {};
		this._events[event] = this._events[event] || [];
		this._events[event].push(handler);
	},

	emit: function (event) {
		this._events = this._events || {};
		var handlers = this._events[event];
		if (!handlers) return;

		var args = Array.prototype.slice.call(arguments, 1);
		handlers.forEach(function (handler) {
			handler.apply(this, args);
		}, this);
	},

	off: function (event, handler) {
		this._events = this._events || {};
		var handlers = this._events[event];
		if (!handlers) return;

		var index = handlers.indexOf(handler);
		if (index !== -1) {
			handlers.splice(index, 1);
		}
	},
};

// Button 생성자
var Button = function (label) {
	this.label = label;
};

// EventEmitter 믹스인 적용
Object.assign(Button.prototype, EventEmitter);

Button.prototype.click = function () {
	console.log(this.label + " 버튼이 클릭되었습니다.");
	this.emit("click");
};

// 사용 예시
var btn = new Button("제출");

btn.on("click", function () {
	console.log("클릭 이벤트 핸들러 1 실행");
});

btn.on("click", function () {
	console.log("클릭 이벤트 핸들러 2 실행");
});

btn.click();
// 제출 버튼이 클릭되었습니다.
// 클릭 이벤트 핸들러 1 실행
// 클릭 이벤트 핸들러 2 실행

console.log("==================================================");

// 실무 활용: 검증(Validation) 믹스인
console.log("\n=== 실무 활용 2: 검증 믹스인 ===");

var Validatable = {
	validate: function () {
		var errors = [];
		var rules = this._validationRules || {};

		for (var field in rules) {
			if (rules.hasOwnProperty(field)) {
				var rule = rules[field];
				var value = this[field];

				if (rule.required && !value) {
					errors.push(field + "은(는) 필수 항목입니다.");
				}

				if (rule.minLength && value.length < rule.minLength) {
					errors.push(field + "은(는) 최소 " + rule.minLength + "자 이상이어야 합니다.");
				}

				if (rule.maxLength && value.length > rule.maxLength) {
					errors.push(field + "은(는) 최대 " + rule.maxLength + "자 이하여야 합니다.");
				}
			}
		}

		return errors;
	},

	isValid: function () {
		return this.validate().length === 0;
	},
};

// User 모델
var User = function (username, password) {
	this.username = username;
	this.password = password;

	this._validationRules = {
		username: {
			required: true,
			minLength: 3,
			maxLength: 20,
		},
		password: {
			required: true,
			minLength: 6,
		},
	};
};

// Validatable 믹스인 적용
Object.assign(User.prototype, Validatable);

// 검증 테스트
var user1 = new User("ab", "123"); // 유효하지 않음
console.log("user1 검증 오류:", user1.validate());
console.log("user1 유효성:", user1.isValid()); // false

var user2 = new User("john", "password123"); // 유효함
console.log("user2 검증 오류:", user2.validate());
console.log("user2 유효성:", user2.isValid()); // true

console.log("==================================================");

// 믹스인 팩토리 패턴
console.log("\n=== 믹스인 팩토리 패턴 ===");

function createSerializable() {
	return {
		serialize: function () {
			var obj = {};
			for (var key in this) {
				if (this.hasOwnProperty(key) && key[0] !== "_") {
					obj[key] = this[key];
				}
			}
			return JSON.stringify(obj);
		},

		deserialize: function (json) {
			var obj = JSON.parse(json);
			for (var key in obj) {
				if (obj.hasOwnProperty(key)) {
					this[key] = obj[key];
				}
			}
			return this;
		},
	};
}

var Product = function (name, price) {
	this.name = name;
	this.price = price;
	this._id = Math.random(); // private (직렬화에서 제외)
};

Object.assign(Product.prototype, createSerializable());

var product = new Product("노트북", 1500000);
var serialized = product.serialize();
console.log("직렬화:", serialized); // {"name":"노트북","price":1500000}

var newProduct = new Product();
newProduct.deserialize(serialized);
console.log("역직렬화:", newProduct.name, newProduct.price); // 노트북 1500000

console.log("==================================================");

// 결론
console.log("\n=== 결론: 믹스인 패턴 활용 ===");
console.log("1. 단일 상속의 한계를 극복할 수 있음");
console.log("2. 기능을 모듈화하여 재사용 가능");
console.log("3. Object.assign()으로 간편하게 적용");
console.log("4. 이벤트 시스템, 검증, 직렬화 등 범용 기능에 유용");
console.log("5. 프로토타입과 결합하여 메모리 효율적으로 사용 가능");

console.log("==================================================");
