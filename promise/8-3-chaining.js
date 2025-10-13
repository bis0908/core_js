/**
 * 8-3. Promise 체이닝
 *
 * Promise의 then() 메서드는 새로운 Promise를 반환하므로
 * 여러 비동기 작업을 순차적으로 연결(체이닝)할 수 있습니다.
 * 이를 통해 콜백 헬 문제를 해결하고 가독성 높은 코드를 작성할 수 있습니다.
 */

console.log("=== 8-3. Promise 체이닝 ===\n");

console.log("--- 8-3-1. 체이닝의 기본 개념 ---\n");

/**
 * then()은 항상 새로운 Promise를 반환
 * 따라서 계속해서 then()을 연결할 수 있음
 */

Promise.resolve(1)
	.then((num) => {
		console.log("1단계:", num); // 1
		return num + 10;
	})
	.then((num) => {
		console.log("2단계:", num); // 11
		return num + 100;
	})
	.then((num) => {
		console.log("3단계:", num); // 111
		console.log("\n→ 각 then()의 반환값이 다음 then()의 인자로 전달됨");
		console.log("\n==================================================\n");
	});

/**
 * 체이닝의 장점
 */
setTimeout(() => {
	console.log("=== 체이닝의 장점 ===");
	console.log("1. 콜백 헬 해결 - 평탄한(flat) 구조");
	console.log("2. 가독성 향상 - 위에서 아래로 읽기 쉬움");
	console.log("3. 에러 처리 간소화 - 하나의 catch()로 모든 에러 처리");
	console.log("4. 순차적 흐름 제어 - 비동기 작업을 동기처럼 표현");
	console.log("\n==================================================\n");
}, 500);

/**
 * 8-3-2. 반환값 전달하기
 */
setTimeout(() => {
	console.log("=== 8-3-2. 일반 값 반환 ===\n");

	// 일반 값을 반환하면 자동으로 Promise.resolve()로 감싸짐
	Promise.resolve("시작")
		.then((msg) => {
			console.log("1단계:", msg);
			return "중간"; // Promise.resolve('중간')과 동일
		})
		.then((msg) => {
			console.log("2단계:", msg);
			return "완료";
		})
		.then((msg) => {
			console.log("3단계:", msg);
			console.log("\n→ 일반 값도 자동으로 Promise로 래핑됨");
			console.log("\n==================================================\n");
		});
}, 1500);

/**
 * Promise를 반환하는 체이닝
 */
setTimeout(() => {
	console.log("=== Promise 반환하기 ===\n");

	function delay(ms, value) {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(value);
			}, ms);
		});
	}

	console.log("순차적 비동기 작업 시작...\n");

	delay(500, "첫 번째")
		.then((msg) => {
			console.log("✅", msg);
			return delay(500, "두 번째"); // Promise 반환
		})
		.then((msg) => {
			console.log("✅", msg);
			return delay(500, "세 번째");
		})
		.then((msg) => {
			console.log("✅", msg);
			console.log("\n→ Promise를 반환하면 자동으로 언래핑됨");
			console.log("→ 각 작업이 완료될 때까지 대기");
			console.log("\n==================================================\n");
		});
}, 3000);

/**
 * 8-3-3. 에러 전파와 처리
 */
setTimeout(() => {
	console.log("=== 8-3-3. 에러 전파 ===\n");

	Promise.resolve(1)
		.then((num) => {
			console.log("1단계:", num);
			return num + 10;
		})
		.then((num) => {
			console.log("2단계:", num);
			throw new Error("의도적 에러 발생!"); // 에러 발생
		})
		.then((num) => {
			console.log("3단계: 실행 안 됨", num);
		})
		.catch((error) => {
			console.error("\n❌ catch()에서 에러 잡음:", error.message);
			console.log("→ 에러 발생 시 이후 then()은 건너뛰고 catch()로 이동");
			console.log("\n==================================================\n");
		});
}, 6000);

/**
 * 중간에서 에러 복구하기
 */
setTimeout(() => {
	console.log("=== 에러 복구 패턴 ===\n");

	Promise.reject("초기 에러")
		.catch((error) => {
			console.log("❌ 에러 발생:", error);
			console.log("→ 에러 처리 후 복구 시도...");
			return "복구된 값"; // 새로운 값 반환으로 에러 복구
		})
		.then((value) => {
			console.log("✅ 복구 후 계속 진행:", value);
			return value + " - 추가 처리";
		})
		.then((value) => {
			console.log("✅ 정상 흐름 복귀:", value);
			console.log("\n→ catch()에서 값을 반환하면 에러 상태에서 벗어남");
			console.log("\n==================================================\n");
		});
}, 7000);

/**
 * 8-3-4. 콜백 헬 vs Promise 체이닝 비교
 */
setTimeout(() => {
	console.log("=== 8-3-4. 콜백 헬 vs Promise 체이닝 ===\n");

	// 가상의 비동기 함수들
	function getUser(id) {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve({ id, name: "홍길동" });
			}, 300);
		});
	}

	function getPosts(userId) {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve([
					{ id: 1, title: "첫 번째 글" },
					{ id: 2, title: "두 번째 글" },
				]);
			}, 300);
		});
	}

	function getComments(postId) {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve([
					{ id: 1, text: "좋아요!" },
					{ id: 2, text: "감사합니다" },
				]);
			}, 300);
		});
	}

	console.log("콜백 헬 방식:");
	console.log("  getUser(callback)");
	console.log("    getPosts(callback)");
	console.log("      getComments(callback) ← 3단계 중첩\n");

	console.log("Promise 체이닝 방식:");
	console.log("  getUser()");
	console.log("    .then(getPosts)");
	console.log("    .then(getComments) ← 평탄한 구조\n");

	console.log("실제 실행:\n");

	getUser(123)
		.then((user) => {
			console.log("1. 사용자 조회:", user.name);
			return getPosts(user.id);
		})
		.then((posts) => {
			console.log("2. 게시글 조회:", posts.length, "개");
			return getComments(posts[0].id);
		})
		.then((comments) => {
			console.log("3. 댓글 조회:", comments.length, "개");
			console.log("\n✅ 모든 작업 완료");
			console.log("→ 콜백 헬 없이 깔끔한 순차 처리");
			console.log("\n==================================================\n");
		})
		.catch((error) => {
			console.error("❌ 에러:", error.message);
		});
}, 8500);

/**
 * 복잡한 체이닝 예제
 */
setTimeout(() => {
	console.log("=== 복잡한 체이닝 예제 ===\n");

	function fetchData(step) {
		return new Promise((resolve) => {
			setTimeout(() => {
				console.log(`  ✓ ${step} 완료`);
				resolve(step);
			}, 400);
		});
	}

	console.log("다단계 비동기 작업 시작...\n");

	fetchData("1단계: 사용자 인증")
		.then(() => fetchData("2단계: 권한 확인"))
		.then(() => fetchData("3단계: 데이터 조회"))
		.then(() => fetchData("4단계: 데이터 가공"))
		.then(() => fetchData("5단계: 결과 반환"))
		.then(() => {
			console.log("\n🎉 전체 프로세스 완료!");
			console.log("→ 5단계의 비동기 작업을 순차적으로 처리");
			console.log("\n==================================================\n");
		})
		.catch((error) => {
			console.error("❌ 프로세스 중단:", error.message);
		});
}, 11000);

/**
 * 실전 패턴: 데이터 변환 파이프라인
 */
setTimeout(() => {
	console.log("=== 실전 패턴: 데이터 변환 파이프라인 ===\n");

	function fetchRawData() {
		return Promise.resolve('{"name":"홍길동","age":"30","city":"서울"}');
	}

	function parseJSON(data) {
		console.log("1. JSON 파싱");
		return Promise.resolve(JSON.parse(data));
	}

	function validateData(data) {
		console.log("2. 데이터 검증");
		if (!data.name || !data.age) {
			return Promise.reject(new Error("필수 필드 누락"));
		}
		return Promise.resolve(data);
	}

	function transformData(data) {
		console.log("3. 데이터 변환");
		return Promise.resolve({
			...data,
			age: Number(data.age),
			adult: Number(data.age) >= 19,
		});
	}

	function saveData(data) {
		console.log("4. 데이터 저장");
		return new Promise((resolve) => {
			setTimeout(() => {
				console.log("   저장 완료:", data);
				resolve(data);
			}, 300);
		});
	}

	// 파이프라인 실행
	fetchRawData()
		.then(parseJSON)
		.then(validateData)
		.then(transformData)
		.then(saveData)
		.then((result) => {
			console.log("\n✅ 전체 파이프라인 완료");
			console.log("최종 결과:", result);
			console.log("\n→ 각 단계가 명확히 분리되어 있음");
			console.log("→ 유지보수와 테스트가 용이함");
			console.log("\n==================================================\n");
		})
		.catch((error) => {
			console.error("❌ 파이프라인 에러:", error.message);
		});
}, 14000);

/**
 * 체이닝 주의사항
 */
setTimeout(() => {
	console.log("=== 체이닝 주의사항 ===\n");

	console.log("❌ 나쁜 예: 값을 반환하지 않음");
	Promise.resolve(1)
		.then((num) => {
			num + 10; // return 누락!
		})
		.then((result) => {
			console.log("   결과:", result); // undefined
		});

	setTimeout(() => {
		console.log("\n✅ 좋은 예: 값을 명시적으로 반환");
		Promise.resolve(1)
			.then((num) => {
				return num + 10; // return 명시
			})
			.then((result) => {
				console.log("   결과:", result); // 11
			});

		console.log("\n주의사항:");
		console.log("• then() 콜백에서 값을 반환해야 다음 then()으로 전달");
		console.log("• return을 빼먹으면 undefined가 전달됨");
		console.log("• Promise를 반환하는 경우 자동으로 언래핑됨");
		console.log("\n==================================================");
	}, 500);
}, 16500);
