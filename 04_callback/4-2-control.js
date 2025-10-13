/**
 * 4-2. 콜백함수의 제어권
 *
 * 콜백함수의 제어권을 넘겨받은 코드는 다음을 결정합니다:
 * 1. 호출 시점 (언제 실행할지)
 * 2. 인자 (무엇을 매개변수로 넘길지)
 * 3. this (실행 컨텍스트)
 */

/**
 * 예제 1: 호출 시점 제어
 *
 * 데이터 로딩이 완료된 후 특정 시점에 콜백이 실행됩니다.
 */
function loadUserList(callback) {
  console.log("사용자 목록을 로딩 중...");

  // 3초 후 데이터 로딩 완료
  setTimeout(() => {
    var userList = [
      { id: 1, name: "김철수", role: "admin" },
      { id: 2, name: "이영희", role: "user" },
      { id: 3, name: "박민수", role: "user" },
    ];

    console.log("로딩 완료!");
    callback(userList); // 로딩 완료 시점에 콜백 실행
  }, 3000);
}

function displayUsers(users) {
  console.log("=== 사용자 목록 ===");
  for (let i = 0; i < users.length; i++) {
    console.log(`${users[i].name} (${users[i].role})`);
  }
}

// loadUserList(displayUsers);

/**
 * 예제 2: 인자 제어
 *
 * Array.prototype.map이 콜백함수에 전달하는 인자의 순서와 의미는 정해져 있습니다.
 * 첫 번째: 현재 값, 두 번째: 인덱스, 세 번째: 배열 자체
 */
var products = [
  { name: "노트북", price: 1200000 },
  { name: "마우스", price: 30000 },
  { name: "키보드", price: 80000 },
];

// 올바른 인자 순서 사용
var discountedProducts = products.map((product, index, array) => {
  console.log(`처리 중: ${index + 1}/${array.length} - ${product.name}`);
  return {
    name: product.name,
    originalPrice: product.price,
    discountedPrice: product.price * 0.9, // 10% 할인
  };
});

console.log("할인된 상품들:");
for (let i = 0; i < discountedProducts.length; i++) {
  const item = discountedProducts[i];
  console.log(
    `${item.name}: ${item.originalPrice}원 → ${item.discountedPrice}원`,
  );
}

/**
 * 잘못된 인자 순서 사용 예시
 * map의 콜백함수 매개변수 순서를 바꾸면 예상과 다른 결과가 나옵니다.
 */
var wrongResult = products.map((index, product) => {
  // 첫 번째 인자는 항상 현재 값(product 객체)이므로
  // index에는 객체가, product에는 인덱스 번호가 들어갑니다.
  console.log("잘못된 처리 - index:", typeof index, "product:", typeof product);
  return index; // 객체를 반환하게 됨
});

console.log("잘못된 결과:", wrongResult);

/**
 * 예제 3: this 제어
 *
 * 배열 메서드들은 두 번째 매개변수로 this로 사용할 객체를 받을 수 있습니다.
 */
var shoppingCart = {
  items: [],
  totalPrice: 0,

  addItem: function (item) {
    this.items.push(item);
    this.calculateTotal();
  },

  calculateTotal: function () {
    this.totalPrice = 0;
    this.items.forEach(function (item) {
      this.totalPrice += item.price;
    }, this); // 두 번째 인자로 this 전달

    console.log(`총 금액: ${this.totalPrice}원`);
  },

  applyDiscount: function (discountRate) {
    this.items = this.items.map(
      (item) => ({
        name: item.name,
        price: Math.floor(item.price * (1 - discountRate)),
      }),
      this,
    ); // this 바인딩

    this.calculateTotal();
  },
};

shoppingCart.addItem({ name: "상품A", price: 10000 });
shoppingCart.addItem({ name: "상품B", price: 15000 });
shoppingCart.addItem({ name: "상품C", price: 20000 });
shoppingCart.applyDiscount(0.1); // 10% 할인

/**
 * 예제 4: 사용자 정의 forEach 구현
 *
 * 직접 forEach를 구현해보면서 제어권이 어떻게 작동하는지 이해해봅시다.
 */
function customForEach(array, callback, thisArg) {
  for (let i = 0; i < array.length; i++) {
    // 콜백함수에 현재값, 인덱스, 배열을 순서대로 전달
    // thisArg가 있으면 call로 this 바인딩
    callback.call(thisArg || window, array[i], i, array);
  }
}

var numbers = [1, 2, 3, 4, 5];

var processor = {
  sum: 0,
  processNumber: function (num, index) {
    console.log(`처리 중 [${index}]: ${num}`);
    this.sum += num;
  },
};

customForEach(numbers, processor.processNumber, processor);
console.log(`합계: ${processor.sum}`);

/**
 * 예제 5: 실무 상황 - 파일 업로드 진행률
 *
 * 파일 업로드 시 진행률에 따라 콜백을 호출하는 예시입니다.
 */
function uploadFile(file, progressCallback, completeCallback) {
  var uploaded = 0;
  var total = file.size;

  var interval = setInterval(() => {
    uploaded += total * 0.1; // 10%씩 업로드
    var progress = Math.min(Math.floor((uploaded / total) * 100), 100);

    // 진행률과 함께 콜백 호출
    progressCallback(progress, uploaded, total);

    if (progress >= 100) {
      clearInterval(interval);
      completeCallback(file);
    }
  }, 100);
}

function onUploadProgress(progress, uploaded, total) {
  var bar = "";
  for (let i = 0; i < progress / 5; i++) {
    bar += "█";
  }
  for (let j = bar.length; j < 20; j++) {
    bar += "░";
  }
  console.log(`업로드 진행률: [${bar}] ${progress}%`);
}

function onUploadComplete(file) {
  console.log(`✅ ${file.name} 업로드 완료!`);
}

var testFile = { name: "document.pdf", size: 1024000 };
// uploadFile(testFile, onUploadProgress, onUploadComplete);
