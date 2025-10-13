/**
 * 5-3-2. 접근 권한 제어 (정보 은닉)
 *
 * 클로저를 활용하면 외부에서 직접 접근할 수 없는 private 변수를 만들 수 있습니다.
 * 이를 통해 정보 은닉(Information Hiding)을 구현할 수 있습니다.
 *
 * createCar 함수는 fuel, power, moved 변수를 외부에서 직접 수정할 수 없도록 만들고,
 * 오직 반환된 객체의 메서드를 통해서만 접근할 수 있게 합니다.
 * Object.freeze를 사용하여 반환된 객체 자체도 수정할 수 없게 만듭니다.
 */

console.log("=== 5-3-2. 접근 권한 제어 (정보 은닉) ===");

var createCar = () => {
  var fuel = Math.ceil(Math.random() * 10 + 10); // 연료(L)
  var power = Math.ceil(Math.random() * 3 + 2); // 연비(km/L)
  var moved = 0; // 총 이동거리

  var publicMembers = {
    get moved() {
      return moved;
    },
    run: () => {
      var km = Math.ceil(Math.random() * 6);
      var wasteFuel = km / power;
      if (fuel < wasteFuel) {
        console.log("이동불가");
        return;
      }
      fuel -= wasteFuel;
      moved += km;
      console.log(`${km}km 이동 (총 ${moved}km). 남은 연료: ${fuel}`);
    },
  };

  Object.freeze(publicMembers);
  return publicMembers;
};

var car = createCar();
car.run(); // 정상 동작
car.run();
console.log("총 이동거리:", car.moved); // getter로만 접근 가능
car.fuel = 10000; // 외부에서 연료 직접 수정 불가 (private)
console.log("🔥 / 5-3-2.js:45 / car.fuel:", car.fuel); // undefined

console.log("=========================");
