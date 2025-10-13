/**
 * 8-4-1. Promise.all() - 병렬 처리
 *
 * 여러 Promise를 동시에 실행하고, 모두 완료될 때까지 기다립니다.
 * 모든 Promise가 성공해야 성공하며, 하나라도 실패하면 즉시 실패합니다.
 */

console.log("=== 8-4-1. Promise.all() ===\n");

console.log("--- 기본 사용법 ---\n");

/**
 * Promise.all([promise1, promise2, ...])
 * - 배열의 모든 Promise가 fulfilled되면 성공
 * - 결과는 입력 순서대로 배열로 반환
 * - 하나라도 reject되면 즉시 실패
 */

const promise1 = Promise.resolve(3);
const promise2 = 42; // 일반 값도 가능 (자동으로 Promise.resolve()로 래핑)
const promise3 = new Promise((resolve) => {
	setTimeout(() => resolve("완료"), 500);
});

console.log("3개의 Promise 병렬 실행 중...\n");

Promise.all([promise1, promise2, promise3]).then((results) => {
	console.log("✅ 모든 Promise 완료!");
	console.log("결과 배열:", results); // [3, 42, '완료']
	console.log("→ 입력 순서대로 결과가 반환됨");
	console.log("\n==================================================\n");
});

/**
 * 실전 예제: 여러 API 동시 호출
 */
setTimeout(() => {
	console.log("=== 실전 예제: 여러 데이터 동시 로드 ===\n");

	function fetchUser() {
		return new Promise((resolve) => {
			setTimeout(() => {
				console.log("  ✓ 사용자 데이터 로드 완료 (300ms)");
				resolve({ id: 1, name: "홍길동" });
			}, 300);
		});
	}

	function fetchPosts() {
		return new Promise((resolve) => {
			setTimeout(() => {
				console.log("  ✓ 게시글 데이터 로드 완료 (500ms)");
				resolve([
					{ id: 1, title: "첫 글" },
					{ id: 2, title: "둘째 글" },
				]);
			}, 500);
		});
	}

	function fetchComments() {
		return new Promise((resolve) => {
			setTimeout(() => {
				console.log("  ✓ 댓글 데이터 로드 완료 (400ms)");
				resolve([{ id: 1, text: "좋아요" }]);
			}, 400);
		});
	}

	console.log("병렬 데이터 로딩 시작...\n");
	const startTime = Date.now();

	Promise.all([fetchUser(), fetchPosts(), fetchComments()])
		.then(([user, posts, comments]) => {
			const endTime = Date.now();
			console.log("\n✅ 모든 데이터 로드 완료!");
			console.log(`총 소요 시간: ${endTime - startTime}ms`);
			console.log("→ 가장 느린 작업(500ms) 만큼만 대기");
			console.log("\n구조 분해로 받은 데이터:");
			console.log("  - 사용자:", user.name);
			console.log("  - 게시글:", posts.length, "개");
			console.log("  - 댓글:", comments.length, "개");
			console.log("\n==================================================\n");
		})
		.catch((error) => {
			console.error("❌ 에러:", error.message);
		});
}, 1500);

/**
 * 순차 실행 vs 병렬 실행 비교
 */
setTimeout(() => {
	console.log("=== 순차 vs 병렬 실행 비교 ===\n");

	function task(id, delay) {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(`작업${id} 완료`);
			}, delay);
		});
	}

	// 순차 실행 (느림)
	console.log("[순차 실행]");
	const seq1 = Date.now();
	task(1, 500)
		.then(() => task(2, 500))
		.then(() => task(3, 500))
		.then(() => {
			const seq2 = Date.now();
			console.log(`  총 시간: ${seq2 - seq1}ms (약 1500ms)`);
			console.log("  → 각 작업을 순서대로 대기\n");

			// 병렬 실행 (빠름)
			console.log("[병렬 실행]");
			const par1 = Date.now();
			Promise.all([task(1, 500), task(2, 500), task(3, 500)]).then(() => {
				const par2 = Date.now();
				console.log(`  총 시간: ${par2 - par1}ms (약 500ms)`);
				console.log("  → 모든 작업을 동시에 실행");
				console.log("\n✨ 병렬 실행이 약 3배 빠름!");
				console.log("\n==================================================\n");
			});
		});
}, 3500);

/**
 * 하나라도 실패하면 전체 실패
 */
setTimeout(() => {
	console.log("=== 하나라도 실패하면 즉시 실패 ===\n");

	const success1 = Promise.resolve("성공1");
	const success2 = new Promise((resolve) => {
		setTimeout(() => {
			console.log("  성공2 완료 (500ms)");
			resolve("성공2");
		}, 500);
	});
	const failure = new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log("  실패 발생 (300ms)");
			reject(new Error("작업 실패!"));
		}, 300);
	});
	const success3 = new Promise((resolve) => {
		setTimeout(() => {
			console.log("  성공3 완료 (800ms) - 하지만 이미 실패함");
			resolve("성공3");
		}, 800);
	});

	console.log("4개의 Promise 실행 (하나는 실패 예정)...\n");

	Promise.all([success1, success2, failure, success3])
		.then((results) => {
			console.log("✅ 성공:", results);
		})
		.catch((error) => {
			console.error("\n❌ Promise.all() 실패:", error.message);
			console.log("→ 하나라도 reject되면 즉시 catch로 이동");
			console.log("→ 나머지 Promise는 계속 실행되지만 결과는 무시됨");
			console.log("\n==================================================\n");
		});
}, 7000);

/**
 * 빈 배열 처리
 */
setTimeout(() => {
	console.log("=== 빈 배열 처리 ===\n");

	Promise.all([]).then((results) => {
		console.log("결과:", results); // []
		console.log("→ 빈 배열을 전달하면 즉시 빈 배열로 resolve됨");
		console.log("\n==================================================\n");
	});
}, 9000);

/**
 * 실전 패턴: 여러 이미지 다운로드
 */
setTimeout(() => {
	console.log("=== 실전 패턴: 여러 이미지 다운로드 ===\n");

	function downloadImage(url, delay) {
		return new Promise((resolve, reject) => {
			console.log(`  📥 다운로드 시작: ${url}`);

			setTimeout(() => {
				if (Math.random() > 0.2) {
					// 80% 성공률
					console.log(`  ✓ 다운로드 완료: ${url}`);
					resolve({ url, size: "1.2MB" });
				} else {
					console.log(`  ✗ 다운로드 실패: ${url}`);
					reject(new Error(`${url} 다운로드 실패`));
				}
			}, delay);
		});
	}

	const imageUrls = [
		"/images/photo1.jpg",
		"/images/photo2.jpg",
		"/images/photo3.jpg",
	];

	console.log("여러 이미지 병렬 다운로드 시작...\n");

	const downloadPromises = imageUrls.map((url, index) =>
		downloadImage(url, (index + 1) * 300),
	);

	Promise.all(downloadPromises)
		.then((images) => {
			console.log("\n✅ 모든 이미지 다운로드 완료!");
			console.log(`총 ${images.length}개 이미지 다운로드됨`);
			images.forEach((img) => {
				console.log(`  - ${img.url} (${img.size})`);
			});
		})
		.catch((error) => {
			console.error("\n❌ 일부 이미지 다운로드 실패:", error.message);
			console.log("→ 모든 이미지가 필수인 경우 전체 재시도 필요");
		})
		.finally(() => {
			console.log("\n==================================================\n");
		});
}, 10000);

/**
 * 타임아웃과 함께 사용
 */
setTimeout(() => {
	console.log("=== 타임아웃과 함께 사용 ===\n");

	function timeout(ms) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				reject(new Error(`타임아웃 ${ms}ms 초과`));
			}, ms);
		});
	}

	function fetchDataWithTimeout(url, timeoutMs) {
		const fetchPromise = new Promise((resolve) => {
			setTimeout(() => {
				resolve(`데이터: ${url}`);
			}, 800); // 800ms 소요
		});

		// 실제 작업과 타임아웃을 race로 경쟁
		return Promise.race([fetchPromise, timeout(timeoutMs)]);
	}

	console.log("타임아웃 있는 여러 요청 병렬 실행...\n");

	Promise.all([
		fetchDataWithTimeout("/api/fast", 1000), // 성공 (800ms < 1000ms)
		fetchDataWithTimeout("/api/slow", 500), // 실패 (800ms > 500ms)
	])
		.then((results) => {
			console.log("✅ 모두 성공:", results);
		})
		.catch((error) => {
			console.error("❌ 타임아웃 또는 에러:", error.message);
			console.log("→ Promise.all()은 하나라도 실패하면 전체 실패");
			console.log("→ 부분 성공을 허용하려면 Promise.allSettled() 사용");
			console.log("\n==================================================");
		});
}, 14000);
