# Todo List - NestJS

Nest.js로 만든 간단한 할 일 관리 웹 애플리케이션입니다.

## 기능

- ✅ 할 일 추가
- ✅ 할 일 완료/미완료 토글
- ✅ 할 일 삭제
- ✅ 반응형 웹 디자인

## 기술 스택

- **Backend**: NestJS, TypeScript
- **Frontend**: Vanilla JavaScript, HTML, CSS
- **Template Engine**: Handlebars (HBS)
- **Deployment**: Vercel

## 로컬 개발

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

http://localhost:3000 에서 애플리케이션을 확인할 수 있습니다.

### 빌드

```bash
npm run build
```

### 프로덕션 실행

```bash
npm start
```

## API 엔드포인트

- `GET /` - 메인 페이지
- `GET /todos` - 모든 할 일 조회
- `GET /todos/:id` - 특정 할 일 조회
- `POST /todos` - 새 할 일 생성
- `PATCH /todos/:id` - 할 일 수정
- `DELETE /todos/:id` - 할 일 삭제

## Vercel 배포

1. GitHub에 프로젝트 업로드
2. Vercel 계정으로 GitHub 리포지토리 연결
3. 자동 배포 설정 완료

## 프로젝트 구조

```
src/
├── todo/
│   ├── dto/
│   │   ├── create-todo.dto.ts
│   │   └── update-todo.dto.ts
│   ├── todo.controller.ts
│   ├── todo.entity.ts
│   ├── todo.module.ts
│   └── todo.service.ts
├── app.controller.ts
├── app.module.ts
└── main.ts
views/
└── index.hbs
```