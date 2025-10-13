/**
 * 8-2-3. then, catch, finally 메서드
 *
 * Promise의 결과를 처리하기 위한 3가지 핵심 메서드:
 * - then(): 성공(fulfilled) 시 실행
 * - catch(): 실패(rejected) 시 실행
 * - finally(): 성공/실패 무관하게 항상 실행
 */

console.log("=== 8-2-3. then, catch, finally 메서드 ===\n");

console.log("--- 1. then() - 성공 처리 ---\n");

/**
 * then() 메서드
 * - Promise가 fulfilled 상태가 되면 실행
 * - resolve()로 전달된 값을 인자로 받음
 * - 새로운 Promise를 반환 (체이닝 가능)
 */

const successPromise = new Promise((resolve) => {
	setTimeout(() => {
		resolve("작업 완료!");
	}, 500);
});

successPromise.then((result) => {
	console.log("✅ then() 실행됨");
	console.log("   전달받은 값:", result);
	console.log("\n==================================================\n");
});

/**
 * 2. catch() - 실패 처리
 */
setTimeout(() => {
	console.log("--- 2. catch() - 실패 처리 ---\n");

	const failPromise = new Promise((resolve, reject) => {
		setTimeout(() => {
			reject(new Error("작업 실패!"));
		}, 500);
	});

	failPromise.catch((error) => {
		console.log("❌ catch() 실행됨");
		console.log("   전달받은 에러:", error.message);
		console.log("\n==================================================\n");
	});
}, 1500);

/**
 * 3. finally() - 항상 실행
 */
setTimeout(() => {
	console.log("--- 3. finally() - 항상 실행 ---\n");

	function createPromise(willSucceed) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if (willSucceed) {
					resolve("성공 데이터");
				} else {
					reject(new Error("실패 원인"));
				}
			}, 500);
		});
	}

	// 성공 케이스
	console.log("[성공 케이스]");
	createPromise(true)
		.then((result) => {
			console.log("✅ then():", result);
		})
		.catch((error) => {
			console.error("❌ catch():", error.message);
		})
		.finally(() => {
			console.log("🏁 finally(): 항상 실행됨\n");
		});

	// 실패 케이스
	setTimeout(() => {
		console.log("[실패 케이스]");
		createPromise(false)
			.then((result) => {
				console.log("✅ then():", result);
			})
			.catch((error) => {
				console.error("❌ catch():", error.message);
			})
			.finally(() => {
				console.log("🏁 finally(): 성공/실패 무관하게 실행\n");
				console.log("==================================================\n");
			});
	}, 1000);
}, 3000);

/**
 * then()의 두 개 인자 사용
 */
setTimeout(() => {
	console.log("=== then()의 완전한 형태 ===\n");

	/**
	 * then(onFulfilled, onRejected)
	 * - 첫 번째 인자: 성공 콜백
	 * - 두 번째 인자: 실패 콜백 (선택적)
	 */

	function testPromise(shouldSucceed) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if (shouldSucceed) {
					resolve("성공!");
				} else {
					reject(new Error("실패!"));
				}
			}, 500);
		});
	}

	// 성공과 실패를 then() 하나로 처리
	testPromise(true).then(
		(result) => {
			console.log("✅ 성공 콜백:", result);
		},
		(error) => {
			console.error("❌ 실패 콜백:", error.message);
		},
	);

	setTimeout(() => {
		testPromise(false).then(
			(result) => {
				console.log("✅ 성공 콜백:", result);
			},
			(error) => {
				console.error("❌ 실패 콜백:", error.message);
				console.log("\n→ catch() 대신 then()의 두 번째 인자 사용 가능");
				console.log("→ 하지만 일반적으로 catch()를 더 많이 사용함\n");
				console.log("==================================================\n");
			},
		);
	}, 1000);
}, 6500);

/**
 * 메서드 체이닝
 */
setTimeout(() => {
	console.log("=== 메서드 체이닝 ===\n");

	Promise.resolve("초기값")
		.then((value) => {
			console.log("1. then():", value);
			return "변환된 값";
		})
		.then((value) => {
			console.log("2. then():", value);
			throw new Error("의도적 에러");
		})
		.then((value) => {
			console.log("3. then(): 실행 안 됨", value);
		})
		.catch((error) => {
			console.error("4. catch():", error.message);
			return "에러 복구";
		})
		.then((value) => {
			console.log("5. then():", value);
		})
		.finally(() => {
			console.log("6. finally(): 마지막 정리 작업");
			console.log("\n→ 체이닝으로 여러 단계를 연결할 수 있음");
			console.log("\n==================================================\n");
		});
}, 9500);

/**
 * 실전 예제: 파일 다운로드 시뮬레이션
 */
setTimeout(() => {
	console.log("=== 실전 예제: 파일 다운로드 ===\n");

	function downloadFile(url, simulateError = false) {
		return new Promise((resolve, reject) => {
			console.log(`📥 다운로드 시작: ${url}`);

			// 로딩 애니메이션 시뮬레이션
			let progress = 0;
			const interval = setInterval(() => {
				progress += 25;
				console.log(`   진행률: ${progress}%`);

				if (progress >= 100) {
					clearInterval(interval);

					if (simulateError) {
						reject(new Error("네트워크 오류"));
					} else {
						resolve({
							url,
							size: "2.5MB",
							name: "document.pdf",
						});
					}
				}
			}, 300);
		});
	}

	// 성공 케이스
	downloadFile("/files/document.pdf")
		.then((file) => {
			console.log("\n✅ 다운로드 완료!");
			console.log(`   파일명: ${file.name}`);
			console.log(`   크기: ${file.size}`);
			return file;
		})
		.then((file) => {
			console.log("\n📂 파일 저장 중...");
			return new Promise((resolve) => {
				setTimeout(() => {
					console.log("✅ 파일 저장 완료");
					resolve(file);
				}, 500);
			});
		})
		.catch((error) => {
			console.error("\n❌ 다운로드 실패:", error.message);
		})
		.finally(() => {
			console.log("\n🏁 작업 종료\n");
		});

	// 실패 케이스
	setTimeout(() => {
		console.log("[에러 케이스]");
		downloadFile("/files/error.pdf", true)
			.then((file) => {
				console.log("✅ 다운로드 완료:", file.name);
			})
			.catch((error) => {
				console.error("\n❌ 다운로드 실패:", error.message);
				console.log("→ 재시도 또는 대체 방법 안내");
			})
			.finally(() => {
				console.log("\n🏁 작업 종료 (실패했지만 finally는 실행)");
				console.log("\n==================================================\n");
			});
	}, 3500);
}, 11000);

/**
 * finally()의 특징
 */
setTimeout(() => {
	console.log("=== finally()의 특별한 특징 ===\n");

	Promise.resolve("원본 값")
		.finally(() => {
			console.log("1. finally() 실행");
			return "finally의 반환값"; // 이 값은 무시됨!
		})
		.then((value) => {
			console.log("2. then()에서 받는 값:", value);
			console.log("   → '원본 값'이 그대로 전달됨");
			console.log("\n특징:");
			console.log("• finally()는 인자를 받지 않음");
			console.log("• finally()의 반환값은 다음 then()으로 전달되지 않음");
			console.log("• 원래 Promise의 값/에러가 그대로 전파됨");
			console.log("• 정리(cleanup) 작업에 주로 사용");
			console.log("\n==================================================");
		});
}, 18000);
