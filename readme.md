## 모노레포

- Next.js
- Nest.js
- DrizzleORM
- NeonDB

---

### 해결된 이슈

- dotenv-cli 로 루트에서 turbo dev를 실행할 때 루트 .env를 읽어 모든 하위 앱의 프로세스 환경변수로 밀어 넣어주고 개발환경에서 사용하는 환경변수 관련 코드 제거.
- tsup을 사용해서 packages/database를 JS로 빌드하고 애플리케이션들(Next, Nest)는 빌드된 결과물을 참조하도록 변경해서 Nest.js 관련 오류 수정.
- 매번 database 코드를 수정할 때마다 수동으로 빌드 하지 않아도 되도록 `turbo.json`에 dev 실행 시 의존 패키지 빌드가 선행되도록 파이프라인 추가.
