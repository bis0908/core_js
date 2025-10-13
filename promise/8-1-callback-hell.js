/**
 * 8-1. 콜백 헬(Callback Hell) 예제
 *
 * 비동기 작업을 콜백 함수로 처리할 때 발생하는 문제점을 보여주는 예제입니다.
 * 여러 비동기 작업이 중첩되면서 코드가 피라미드 형태로 깊어지는 '콜백 헬' 현상을 시연합니다.
 */

console.log("=== 8-1-1. 동기 vs 비동기 처리 비교 ===");

// 동기 처리 예제
console.log("--- 동기 처리 ---");
console.log("첫 번째 작업");
console.log("두 번째 작업");
console.log("세 번째 작업");

// 비동기 처리 예제
console.log("\n--- 비동기 처리 ---");
console.log("첫 번째 작업");

setTimeout(() => {
	console.log("두 번째 작업 (1초 후)");
}, 1000);

console.log("세 번째 작업");
// 출력 순서: 첫 번째 → 세 번째 → 두 번째 (1초 후)

console.log("\n==================================================\n");

console.log("=== 8-1-2. 이벤트 루프 동작 이해 ===");

/**
 * 이벤트 루프 실행 순서 예제
 *
 * 1. 콜 스택에서 동기 코드 실행
 * 2. setTimeout 등의 비동기 API는 Web API로 전달
 * 3. 타이머 완료 후 콜백이 콜백 큐로 이동
 * 4. 콜 스택이 비면 이벤트 루프가 콜백 큐의 함수를 콜 스택으로 이동
 */

console.log("시작");

setTimeout(() => {
	console.log("타이머 완료 (0ms 지연)");
}, 0); // 0ms 지연이어도 콜백 큐로 이동

console.log("끝");
// 출력: 시작 → 끝 → 타이머 완료

console.log("\n==================================================\n");

console.log("=== 8-1-3. 콜백 헬(Callback Hell) 예제 ===");

/**
 * 가상의 데이터 fetch 함수
 * 실제 비동기 작업을 시뮬레이션합니다.
 */
function getData(value, callback) {
	setTimeout(() => {
		console.log(`데이터 로드: ${value}`);
		callback(value + 1);
	}, 500);
}

console.log("--- 콜백 헬 발생 예제 ---");
console.log("순차적 비동기 작업 시작...\n");

// 콜백이 중첩되면서 피라미드 구조 형성 (콜백 헬)
getData(1, (a) => {
	getData(a, (b) => {
		getData(b, (c) => {
			getData(c, (d) => {
				getData(d, (e) => {
					console.log(`\n최종 결과: ${e}`);
					console.log("→ 코드가 5단계 중첩되어 가독성이 매우 낮음");
				});
			});
		});
	});
});

console.log("\n==================================================\n");

/**
 * 콜백 헬의 문제점 시연
 */
setTimeout(() => {
	console.log("=== 콜백 헬의 문제점 ===");
	console.log("1. 가독성 저하 - 피라미드 구조로 인해 코드 흐름 파악 어려움");
	console.log("2. 에러 처리 복잡 - 각 단계마다 에러 처리 코드 추가 필요");
	console.log("3. 유지보수 힘듦 - 로직 변경 시 중첩 구조 전체 수정");
	console.log("4. 디버깅 어려움 - 에러 발생 지점 추적 힘듦");

	console.log("\n==================================================\n");
}, 3500);

/**
 * 에러 처리가 포함된 콜백 헬 예제
 */
setTimeout(() => {
	console.log("=== 에러 처리가 포함된 콜백 헬 ===");

	function getDataWithError(value, callback, errorCallback) {
		setTimeout(() => {
			if (value < 0) {
				errorCallback(new Error("음수는 허용되지 않습니다"));
				return;
			}
			console.log(`데이터 처리: ${value}`);
			callback(value * 2);
		}, 300);
	}

	// 각 단계마다 에러 처리 추가로 더욱 복잡해짐
	getDataWithError(
		1,
		(result1) => {
			getDataWithError(
				result1,
				(result2) => {
					getDataWithError(
						result2,
						(result3) => {
							console.log(`최종 성공 결과: ${result3}`);
						},
						(error) => {
							console.error("3단계 에러:", error.message);
						},
					);
				},
				(error) => {
					console.error("2단계 에러:", error.message);
				},
			);
		},
		(error) => {
			console.error("1단계 에러:", error.message);
		},
	);

	console.log("\n→ Promise를 사용하면 이 문제를 해결할 수 있습니다!");
	console.log("\n==================================================\n");
}, 4000);

/**
 * 실제 상황을 모방한 복잡한 콜백 헬 예제
 */
setTimeout(() => {
	console.log("=== 실무 시나리오: 사용자 데이터 로딩 ===");

	function fetchUser(userId, callback) {
		setTimeout(() => {
			console.log(`1. 사용자 조회 (ID: ${userId})`);
			callback({ id: userId, name: "홍길동" });
		}, 300);
	}

	function fetchUserPosts(userId, callback) {
		setTimeout(() => {
			console.log("2. 사용자 게시글 조회");
			callback([
				{ id: 1, title: "첫 번째 글" },
				{ id: 2, title: "두 번째 글" },
			]);
		}, 300);
	}

	function fetchPostComments(postId, callback) {
		setTimeout(() => {
			console.log(`3. 게시글 댓글 조회 (Post ID: ${postId})`);
			callback([
				{ id: 1, text: "좋은 글이에요!" },
				{ id: 2, text: "감사합니다." },
			]);
		}, 300);
	}

	// 사용자 → 게시글 → 댓글 순차 조회 (콜백 헬)
	fetchUser(123, (user) => {
		console.log(`   사용자: ${user.name}`);

		fetchUserPosts(user.id, (posts) => {
			console.log(`   게시글 수: ${posts.length}`);

			fetchPostComments(posts[0].id, (comments) => {
				console.log(`   댓글 수: ${comments.length}`);
				console.log("\n✅ 모든 데이터 로드 완료");
				console.log("→ 3단계 중첩, 더 많은 단계가 필요하면 더욱 복잡해짐");
			});
		});
	});

	console.log("\n==================================================");
}, 5500);
