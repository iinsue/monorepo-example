import { Suspense } from "react";
import { db } from "@/lib/db";
import { posts, desc } from "@mono/database";
import { createPostAction } from "./actions";

// 1. DB 조회를 담당하는 별도 서버 컴포넌트 분리
async function PostListSection() {
  const postList = await db.select().from(posts).orderBy(desc(posts.createdAt));

  return (
    <section>
      <h3>게시글 목록 (총 {postList.length}개)</h3>
      {postList.length === 0 ? (
        <p style={{ color: "#888" }}>게시글이 없습니다.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {postList.map((post) => (
            <li
              key={post.id}
              style={{
                borderBottom: "1px solid #eee",
                paddingBottom: 12,
                marginBottom: 12,
              }}
            >
              <h4 style={{ margin: "0 0 4px 0" }}>{post.title}</h4>
              <p style={{ margin: "0 0 8px 0", color: "#444" }}>
                {post.content}
              </p>
              <small style={{ color: "#888" }}>
                작성자: {post.author} |{" "}
                {new Date(post.createdAt).toLocaleString()}
              </small>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default async function HomePage() {
  return (
    <main
      style={{ maxWidth: 640, margin: "40px auto", fontFamily: "sans-serif" }}
    >
      <h1>모노레포 Drizzle DB 공유 테스트</h1>

      {/* 1. 글 작성 Form (Server Action) */}
      <section
        style={{
          border: "1px solid #ddd",
          padding: 16,
          borderRadius: 8,
          marginBottom: 24,
        }}
      >
        <h3>Next.js에서 글 작성하기</h3>
        <form
          action={createPostAction}
          style={{ display: "flex", flexDirection: "column", gap: 8 }}
        >
          <input
            name="title"
            placeholder="제목"
            required
            style={{ padding: 8, border: "1px solid #ccc", borderRadius: 4 }}
          />
          <textarea
            name="content"
            placeholder="내용"
            required
            rows={3}
            style={{ padding: 8, border: "1px solid #ccc", borderRadius: 4 }}
          />
          <button
            type="submit"
            style={{
              padding: 8,
              background: "#0070f3",
              color: "#fff",
              border: "none",
              borderRadius: 4,
              cursor: "pointer",
            }}
          >
            작성하기
          </button>
        </form>
      </section>

      {/* 2. 글 목록 (Server Component) */}
      {/* DB 조회 영역을 Suspense로 감싸 사전 렌더링 블로킹 해제 */}
      <Suspense fallback={<p>게시글 목록을 불러오는 중...</p>}>
        <PostListSection />
      </Suspense>
    </main>
  );
}
