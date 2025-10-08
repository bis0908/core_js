# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

이 프로젝트는 "코어 자바스크립트" 학습을 위한 저장소입니다. 자바스크립트의 핵심 이론들(데이터 타입, 실행 컨텍스트, this, 콜백함수, 클로저, 프로토타입, 클래스)을 다룹니다.

## 프로젝트 구조

```dir
core_js/
├── documents/          # 각 장별 학습 노트 (1.md ~ 7.md)
├── hoisting/          # 호이스팅 관련 실습 코드
├── biome.json         # Biome 설정 (린터/포매터)
├── package.json       # 프로젝트 의존성
└── readme.md         # 프로젝트 소개 및 목차
```

## 개발 명령어

### 코드 품질 관리

```bash
# 코드 린팅
npx biome lint

# 코드 포맷팅
npx biome format --write

# 린팅과 포맷팅 동시 실행
npx biome check --apply
```

## 코드 스타일

- **포맷터**: Biome 사용
- **들여쓰기**: 스페이스 사용
- **따옴표**: 더블 쿼트 (`"`) 사용
- **모듈 시스템**: CommonJS (`require/module.exports`)

## 학습 자료 구조

- `documents/`: 각 장별로 번호가 매겨진 마크다운 파일들 (1.md부터 7.md까지)
- 각 문서는 해당 장의 핵심 개념과 예제 코드를 포함
- 실습 코드는 별도 디렉토리에서 관리 (예: `hoisting/`)

## 작업 시 고려사항

- 모든 자바스크립트 코드는 ES5 기준으로 작성되어 있음 (학습 목적)
- 코드 예제는 개념 이해를 위한 것으로, 실제 프로덕션 코드와는 다를 수 있음
- 새로운 실습 코드 추가 시 해당 주제별 디렉토리 생성 권장
- 각 장별 폴더 / 하위 레벨의 챕터를 각 파일 분할로 나누어 집중 학습을 할 수 있도록 유도
  - 예시 폴더 `this/` 내부에 `3-1-1.js` 와 같이 예제 코드용 파일을 생성
  - **(중요!) 개념 설명을 추가할때는 `console.log()`를 사용하지 않고 반드시 `JSDOC` 형식을 항상 사용**
- 현재 biome.js 설정은 es6 이상을 따르고 있기 때문에 `function () {}`을 사용해도 자동으로 `()=>{}` 으로 변환되기 때문에 이 부분을 굳이 수정하려고 하지 말것.
- 각각의 예시 코드 전 후에는 구분을 할 수 있는 `console.log()` 추가 필요 (콘솔 창에서 구분해서 읽기 위함)

```js example
console.log("학습 내용에 대한 설명");
function(){
  // detail...
}
console.log("==================================================");
// 다음 코드 소개...
```
