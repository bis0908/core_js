/**
 * 04. Promise 체이닝 - 10개 예측 훈련
 *
 * 학습 목표:
 * - Promise 체이닝의 동작 원리 완벽 이해
 * - 실행 순서 예측 능력 90% 이상 달성
 * - 일반 값 vs Promise 반환의 차이 이해
 */

console.log("=== Promise 체이닝 마스터 ===\n");

/**
 * 체이닝의 핵심 원리
 *
 * 1. then()은 항상 새로운 Promise를 반환
 * 2. then 콜백의 반환값:
 *    - 일반 값: Promise.resolve(값)로 자동 래핑
 *    - Promise: 그 Promise가 완료될 때까지 대기
 *    - 아무것도 반환하지 않음: Promise.resolve(undefined)
 * 3. 에러 발생 시 다음 catch까지 건너뜀
 */

console.log("--- 예제: 기본 체이닝 ---\n");

Promise.resolve(1)
	.then((num) => {
		console.log("1단계:", num); // 1
		return num + 10; // 11을 다음으로 전달
	})
	.then((num) => {
		console.log("2단계:", num); // 11
		return num * 2; // 22를 다음으로 전달
	})
	.then((num) => {
		console.log("3단계:", num); // 22
		console.log("→ 각 then의 반환값이 다음으로 전달됨\n");
	});

	console.log("==================================================\n");

/**
 * ⭐ 예측 훈련 1~10
 *
 * 각 코드의 출력 순서와 값을 예측해보세요!
 * 실행하기 전에 종이에 예상 결과를 적어보세요.
 */

	console.log("=== 예측 훈련 1: 기본 체이닝 ===\n");
	console.log("아래 코드의 출력을 예측하세요:\n");
	console.log("Promise.resolve(5)");
	console.log("  .then(n => { console.log('A:', n); return n * 2; })");
	console.log("  .then(n => { console.log('B:', n); return n + 3; })");
	console.log("  .then(n => { console.log('C:', n); });\n");

	console.log("예측: A, B, C의 값은?\n");
	console.log("정답을 보려면 주석 해제:");
	console.log("==================================================\n");

	// Promise.resolve(5)
	//   .then(n => { console.log('A:', n); return n * 2; })
	//   .then(n => { console.log('B:', n); return n + 3; })
	//   .then(n => { console.log('C:', n); });

	console.log("\n=== 예측 훈련 2: return 누락 ===\n");
	console.log("Promise.resolve(10)");
	console.log("  .then(n => { n + 5; })  // return 없음!");
	console.log("  .then(n => { console.log('결과:', n); });\n");

	console.log("예측: 결과는 15일까요, undefined일까요?\n");
	console.log("정답을 보려면 주석 해제:");
	console.log("==================================================\n");

	// Promise.resolve(10)
	//   .then(n => { n + 5; })
	//   .then(n => { console.log('결과:', n); });

	console.log("\n=== 예측 훈련 3: 에러 발생 ===\n");
	console.log("Promise.resolve(1)");
	console.log("  .then(n => { console.log('A:', n); return n + 1; })");
	console.log("  .then(n => { console.log('B:', n); throw new Error('에러!'); })");
	console.log("  .then(n => { console.log('C:', n); })");
	console.log("  .catch(e => { console.log('에러:', e.message); });\n");

	console.log("예측: A, B, C 중 어디까지 출력될까요?\n");
	console.log("정답을 보려면 주석 해제:");
	console.log("==================================================\n");

	// Promise.resolve(1)
	//   .then(n => { console.log('A:', n); return n + 1; })
	//   .then(n => { console.log('B:', n); throw new Error('에러!'); })
	//   .then(n => { console.log('C:', n); })
	//   .catch(e => { console.log('에러:', e.message); });

/**
 * TODO 1: 예측 훈련 4-10
 *
 * 아래 7개의 코드를 직접 작성하고 실행 전에 예측해보세요!
 */

	console.log("\n=== TODO 1: 예측 훈련 4 - Promise 반환 ===\n");
	console.log("다음 코드를 작성하고 결과를 예측하세요:\n");
	console.log("Promise.resolve(3)");
	console.log("  .then(n => {");
	console.log("    console.log('1:', n);");
	console.log("    return new Promise(resolve => {");
	console.log("      setTimeout(() => resolve(n * 10), 500);");
	console.log("    });");
	console.log("  })");
	console.log("  .then(n => { console.log('2:', n); });\n");

	console.log("예측: 1과 2는 동시에? 순차적으로? 값은?\n");
	console.log("(여기에 코드를 작성하고 테스트하세요)\n");
	console.log("==================================================\n");

	console.log("\n=== TODO 2: 예측 훈련 5 - 에러 복구 ===\n");
	console.log("Promise.reject('초기 에러')");
	console.log("  .catch(e => { console.log('에러1:', e); return '복구'; })");
	console.log("  .then(v => { console.log('값:', v); throw new Error('에러2'); })");
	console.log("  .catch(e => { console.log('에러2:', e.message); });\n");

	console.log("(코드를 작성하고 예측하세요)\n");
	console.log("==================================================\n");

	console.log("\n=== TODO 3: 예측 훈련 6 - finally 위치 ===\n");
	console.log("Promise.resolve(100)");
	console.log("  .then(n => { console.log('A:', n); return n / 2; })");
	console.log("  .finally(() => { console.log('정리1'); })");
	console.log("  .then(n => { console.log('B:', n); })");
	console.log("  .finally(() => { console.log('정리2'); });\n");

	console.log("(출력 순서를 예측하세요)\n");
	console.log("==================================================\n");

	console.log("\n=== TODO 4: 예측 훈련 7 - 중첩 체이닝 ===\n");
	console.log("Promise.resolve(1)");
	console.log("  .then(n => {");
	console.log("    console.log('외부:', n);");
	console.log("    return Promise.resolve(n + 1)");
	console.log("      .then(n2 => {");
	console.log("        console.log('내부:', n2);");
	console.log("        return n2 + 10;");
	console.log("      });");
	console.log("  })");
	console.log("  .then(n => { console.log('최종:', n); });\n");

	console.log("(실행 순서와 값을 예측하세요)\n");
	console.log("==================================================\n");

	console.log("\n=== TODO 5: 예측 훈련 8 - 동기 vs 비동기 ===\n");
	console.log("console.log('1');");
	console.log("Promise.resolve()");
	console.log("  .then(() => console.log('2'))");
	console.log("  .then(() => console.log('3'));");
	console.log("console.log('4');\n");

	console.log("(1, 2, 3, 4의 출력 순서는?)\n");
	console.log("==================================================\n");

	console.log("\n=== TODO 6: 예측 훈련 9 - 복잡한 에러 흐름 ===\n");
	console.log("Promise.resolve(1)");
	console.log("  .then(n => { throw new Error('E1'); })");
	console.log("  .catch(e => { console.log(e.message); return 2; })");
	console.log("  .then(n => { console.log('값:', n); throw new Error('E2'); })");
	console.log("  .then(n => { console.log('실행?', n); })");
	console.log("  .catch(e => { console.log(e.message); });\n");

	console.log("(어떤 메시지들이 어떤 순서로?)\n");
	console.log("==================================================\n");

	console.log("\n=== TODO 7: 예측 훈련 10 - 종합 ===\n");
	console.log("Promise.resolve(5)");
	console.log("  .then(n => {");
	console.log("    console.log('A:', n);");
	console.log("    return new Promise(resolve => {");
	console.log("      setTimeout(() => {");
	console.log("        console.log('B:', n * 2);");
	console.log("        resolve(n * 2);");
	console.log("      }, 500);");
	console.log("    });");
	console.log("  })");
	console.log("  .then(n => {");
	console.log("    console.log('C:', n);");
	console.log("    return n + 100;");
	console.log("  })");
	console.log("  .finally(() => console.log('끝'))");
	console.log("  .then(n => console.log('최종:', n));\n");

	console.log("(전체 흐름을 시간순으로 예측하세요)\n");
	console.log("==================================================\n");

/**
 * 실전 예제: 순차 vs 병렬
 */

	console.log("\n=== 실전 예제: 순차 실행 ===\n");
	console.log("다음 코드는 순차 실행 (느림)입니다:\n");
	console.log("const a = await task1();  // 1초 대기");
	console.log("const b = await task2();  // 1초 더 대기");
	console.log("const c = await task3();  // 1초 더 대기");
	console.log("// 총 3초\n");

	console.log("병렬 실행으로 개선하려면?\n");
	console.log("const [a, b, c] = await Promise.all([");
	console.log("  task1(),");
	console.log("  task2(),");
	console.log("  task3()");
	console.log("]);");
	console.log("// 총 1초!\n");

	console.log("==================================================\n");

/**
 * 학습 정리
 *
 * ✅ then()은 항상 새로운 Promise 반환
 * ✅ 일반 값 반환: 자동으로 Promise.resolve() 래핑
 * ✅ Promise 반환: 해당 Promise 완료까지 대기
 * ✅ return 누락: undefined가 전달됨
 * ✅ throw 또는 reject: 다음 catch로 이동
 * ✅ catch에서 값 반환: 에러 상태 복구
 * ✅ finally는 값을 전달하지 않음
 *
 * 다음 학습: 05-promise-all-race.js (병렬 처리)
 */

	console.log("\n=== 04. Promise 체이닝 학습 완료! ===");
	console.log("\n⭐ 스스로 체크:");
	console.log("   - 10개 예측 중 몇 개 맞췄나요?");
	console.log("   - 90% 이상이면 합격!");
	console.log("   - 부족하면 정답 파일 다시 학습하세요\n");
	console.log("정답 확인: 04-promise-chaining-answer.js");
	console.log("다음 단계: node 05-promise-all-race.js\n");
