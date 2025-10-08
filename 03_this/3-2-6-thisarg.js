/**
 * @fileoverview 3-2-6 별도의 인자로 this를 받는 경우 (콜백 함수 내에서의 this)
 * 
 * @description
 * 배열 메서드들의 thisArg 매개변수를 활용하여 콜백 함수의 this를 제어하는 방법을 학습합니다.
 * 다양한 배열 메서드에서 thisArg 활용법과 실무 패턴을 익힙니다.
 * 
 * @objectives
 * - thisArg 매개변수를 지원하는 배열 메서드들 파악
 * - thisArg를 활용한 this 바인딩 패턴 마스터
 * - 실무에서 자주 사용되는 thisArg 활용 사례들
 * - thisArg vs bind vs self 패턴 비교
 * 
 * @concept
 * 많은 배열 메서드들이 두 번째 매개변수로 thisArg를 받아 콜백 함수의 this를 지정 가능
 */

console.log("=== 3-2-6 별도의 인자로 this를 받는 경우 ===\n");

// 학습 목표
console.log("🎯 학습 목표:");
console.log("1. thisArg 매개변수를 지원하는 배열 메서드들 파악");
console.log("2. thisArg를 활용한 this 바인딩 패턴 마스터");
console.log("3. 실무에서 자주 사용되는 thisArg 활용 사례들");
console.log("4. thisArg vs bind vs self 패턴 비교\n");

// thisArg를 지원하는 배열 메서드들
console.log("📚 thisArg를 지원하는 주요 배열 메서드들:");
console.log("- Array.prototype.forEach(callback[, thisArg])");
console.log("- Array.prototype.map(callback[, thisArg])");
console.log("- Array.prototype.filter(callback[, thisArg])");
console.log("- Array.prototype.find(callback[, thisArg])");
console.log("- Array.prototype.every(callback[, thisArg])");
console.log("- Array.prototype.some(callback[, thisArg])");
console.log("- Array.prototype.reduce는 thisArg 없음!\n");

// ====================================================================
// forEach에서 thisArg 활용
// ====================================================================

console.log("📍 forEach에서 thisArg 활용\n");

// 데이터 처리 객체
var report = {
  name: "월간보고서",
  sum: 0,
  count: 0,
  
  // thisArg 사용하지 않는 방법 (self 패턴)
  addWithSelf: function() {
    var args = Array.prototype.slice.call(arguments);
    var self = this;
    
    console.log("1️⃣ self 패턴 사용:");
    args.forEach(function(entry) {
      self.sum += entry;
      self.count++;
      console.log("  " + self.name + " - 추가:", entry, "누적:", self.sum);
    });
  },
  
  // thisArg 사용하는 방법
  addWithThisArg: function() {
    var args = Array.prototype.slice.call(arguments);
    
    console.log("\n2️⃣ thisArg 사용:");
    args.forEach(function(entry) {
      this.sum += entry;
      this.count++;
      console.log("  " + this.name + " - 추가:", entry, "누적:", this.sum);
    }, this); // thisArg로 this를 전달
  },
  
  average: function() {
    return this.sum / this.count;
  },
  
  reset: function() {
    this.sum = 0;
    this.count = 0;
  }
};

// forEach thisArg 테스트
console.log("forEach thisArg 테스트:");
report.addWithSelf(60, 85, 95);
console.log("self 패턴 평균:", report.average());

report.reset();
report.addWithThisArg(60, 85, 95);
console.log("thisArg 패턴 평균:", report.average());

// ====================================================================
// map에서 thisArg 활용
// ====================================================================

console.log("\n📍 map에서 thisArg 활용\n");

var transformer = {
  prefix: "[변환됨]",
  suffix: "!",
  multiplier: 2,
  
  // 문자열 변환
  transformStrings: function(strings) {
    console.log("3️⃣ 문자열 변환:");
    return strings.map(function(str) {
      return this.prefix + " " + str + this.suffix;
    }, this);
  },
  
  // 숫자 변환
  transformNumbers: function(numbers) {
    console.log("\n4️⃣ 숫자 변환:");
    return numbers.map(function(num, index) {
      console.log("  변환:", num, "→", num * this.multiplier);
      return num * this.multiplier;
    }, this);
  }
};

var fruits = ["사과", "바나나", "오렌지"];
var numbers = [1, 2, 3, 4, 5];

var transformedStrings = transformer.transformStrings(fruits);
console.log("변환된 문자열:", transformedStrings);

var transformedNumbers = transformer.transformNumbers(numbers);
console.log("변환된 숫자들:", transformedNumbers);

// ====================================================================
// filter에서 thisArg 활용  
// ====================================================================

console.log("\n📍 filter에서 thisArg 활용\n");

var validator = {
  minLength: 3,
  maxLength: 10,
  allowedChars: /^[a-zA-Z가-힣]+$/,
  
  isValidLength: function(str) {
    return str.length >= this.minLength && str.length <= this.maxLength;
  },
  
  isValidChars: function(str) {
    return this.allowedChars.test(str);
  },
  
  // 유효한 문자열들 필터링
  filterValid: function(strings) {
    console.log("5️⃣ 유효성 검증 필터:");
    return strings.filter(function(str) {
      var isValid = this.isValidLength(str) && this.isValidChars(str);
      console.log("  검증:", str, "→", isValid ? "유효" : "무효");
      return isValid;
    }, this);
  }
};

var testWords = ["a", "hello", "안녕", "hi", "javascript", "코딩", "ab", "프로그래밍"];
console.log("테스트 단어들:", testWords);
var validWords = validator.filterValid(testWords);
console.log("유효한 단어들:", validWords);

// ====================================================================
// find에서 thisArg 활용
// ====================================================================

console.log("\n📍 find에서 thisArg 활용\n");

var finder = {
  targetScore: 90,
  targetName: "김철수",
  
  findByScore: function(students) {
    console.log("6️⃣ 점수로 학생 찾기:");
    return students.find(function(student) {
      var found = student.score >= this.targetScore;
      if (found) {
        console.log("  발견:", student.name, "점수:", student.score);
      }
      return found;
    }, this);
  },
  
  findByName: function(students) {
    console.log("\n7️⃣ 이름으로 학생 찾기:");
    return students.find(function(student) {
      return student.name === this.targetName;
    }, this);
  }
};

var students = [
  { name: "이영희", score: 85 },
  { name: "김철수", score: 92 },
  { name: "박민수", score: 78 },
  { name: "최유진", score: 95 }
];

var highScorer = finder.findByScore(students);
console.log("고득점자:", highScorer);

var foundStudent = finder.findByName(students);
console.log("찾은 학생:", foundStudent);

// ====================================================================
// every와 some에서 thisArg 활용
// ====================================================================

console.log("\n📍 every와 some에서 thisArg 활용\n");

var checker = {
  passingScore: 60,
  excellentScore: 90,
  
  allPassed: function(scores) {
    console.log("8️⃣ 모두 통과했는지 확인:");
    return scores.every(function(score, index) {
      var passed = score >= this.passingScore;
      console.log("  학생" + (index + 1) + ": " + score + "점 →", passed ? "통과" : "불통과");
      return passed;
    }, this);
  },
  
  hasExcellent: function(scores) {
    console.log("\n9️⃣ 우수학생이 있는지 확인:");
    return scores.some(function(score, index) {
      var excellent = score >= this.excellentScore;
      if (excellent) {
        console.log("  학생" + (index + 1) + ": " + score + "점 → 우수!");
      }
      return excellent;
    }, this);
  }
};

var classScores = [75, 82, 91, 67, 88];
console.log("학급 점수들:", classScores);

var allStudentsPassed = checker.allPassed(classScores);
console.log("전체 통과 여부:", allStudentsPassed);

var hasExcellentStudent = checker.hasExcellent(classScores);
console.log("우수학생 존재 여부:", hasExcellentStudent);

// ====================================================================
// 실무 활용 패턴들
// ====================================================================

console.log("\n💼 실무 활용 패턴들\n");

// 데이터 변환 파이프라인
var dataProcessor = {
  name: "데이터처리기",
  successCount: 0,
  errorCount: 0,
  
  process: function(rawData) {
    console.log("🔟 데이터 변환 파이프라인:");
    
    // 1단계: 필터링
    var filtered = rawData.filter(function(item) {
      return item.value > 0;
    });
    
    // 2단계: 변환 (thisArg 사용)
    var transformed = filtered.map(function(item) {
      try {
        var result = {
          id: item.id,
          processedValue: item.value * 2,
          processor: this.name
        };
        this.successCount++;
        return result;
      } catch (error) {
        this.errorCount++;
        return null;
      }
    }, this);
    
    // 3단계: null 제거
    var cleaned = transformed.filter(function(item) {
      return item !== null;
    });
    
    console.log("  처리 완료 - 성공:", this.successCount, "실패:", this.errorCount);
    return cleaned;
  }
};

var rawData = [
  { id: 1, value: 10 },
  { id: 2, value: -5 },
  { id: 3, value: 20 },
  { id: 4, value: 0 },
  { id: 5, value: 15 }
];

var processedData = dataProcessor.process(rawData);
console.log("처리된 데이터:", processedData);

// 다양한 방법들 비교
console.log("\n🔄 다양한 방법들 비교\n");

var comparisonObj = {
  name: "비교객체",
  data: [1, 2, 3, 4, 5],
  
  // 방법 1: self 패턴
  method1_self: function() {
    console.log("1️⃣1️⃣ self 패턴:");
    var self = this;
    this.data.forEach(function(item) {
      console.log("  " + self.name + " 처리:", item);
    });
  },
  
  // 방법 2: thisArg
  method2_thisArg: function() {
    console.log("\n1️⃣2️⃣ thisArg 패턴:");
    this.data.forEach(function(item) {
      console.log("  " + this.name + " 처리:", item);
    }, this);
  },
  
  // 방법 3: bind
  method3_bind: function() {
    console.log("\n1️⃣3️⃣ bind 패턴:");
    this.data.forEach(function(item) {
      console.log("  " + this.name + " 처리:", item);
    }.bind(this));
  }
};

comparisonObj.method1_self();
comparisonObj.method2_thisArg();
comparisonObj.method3_bind();

// 핵심 포인트
console.log("\n💡 핵심 포인트:");
console.log("1. thisArg는 배열 메서드에서만 사용 가능");
console.log("2. forEach, map, filter, find, every, some에서 지원");
console.log("3. reduce는 thisArg를 지원하지 않음");
console.log("4. self 패턴, bind, thisArg 모두 같은 결과");
console.log("5. thisArg는 코드가 더 간결하고 명확함\n");

console.log("✅ 3-2-6 별도의 인자로 this를 받는 경우 학습 완료!\n");