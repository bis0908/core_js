/**
 * 실무 예제 1: API 요청 캐싱 (Memoization)
 *
 * 클로저를 활용하여 API 요청 결과를 캐싱하는 패턴입니다.
 * 같은 URL에 대한 중복 요청을 방지하고 성능을 최적화할 수 있습니다.
 *
 * 실무에서는 네트워크 비용을 줄이고 사용자 경험을 개선하기 위해 자주 사용됩니다.
 */

console.log("=== 실무 예제 1: API 요청 캐싱 ===");

var createApiClient = function() {
  var cache = {}; // private 캐시 저장소

  return {
    fetch: function(url) {
      // 캐시에 이미 있으면 바로 반환
      if (cache[url]) {
        console.log("캐시에서 반환:", url);
        return Promise.resolve(cache[url]);
      }

      // 없으면 실제 API 호출 후 캐시에 저장
      console.log("API 호출:", url);
      return fetch(url)
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          cache[url] = data;
          return data;
        });
    },
    clearCache: function() {
      cache = {};
      console.log("캐시 초기화됨");
    },
    getCacheSize: function() {
      return Object.keys(cache).length;
    },
  };
};

// 사용 예시
var apiClient = createApiClient();

// 첫 번째 호출 - 실제 API 요청
apiClient.fetch("https://api.example.com/users/1").then(function(data) {
  console.log("첫 번째 호출 결과:", data);
});

// 두 번째 호출 - 캐시에서 반환
apiClient.fetch("https://api.example.com/users/1").then(function(data) {
  console.log("두 번째 호출 결과:", data);
});

console.log("=========================");
