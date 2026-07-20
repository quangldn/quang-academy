import React from 'react';

/**
 * LessonStub — placeholder nhất quán cho bài đang biên soạn.
 * Vẫn hiển thị MỤC TIÊU học để khung khoá học có giá trị ngay,
 * kèm nhãn trạng thái rõ ràng.
 */
export default function LessonStub({objective}) {
  return (
    <div>
      {objective ? (
        <div
          style={{
            borderLeft: '4px solid var(--ifm-color-primary)',
            background: 'var(--ifm-color-emphasis-100)',
            padding: '0.9rem 1.1rem',
            borderRadius: '0 8px 8px 0',
            margin: '1rem 0',
          }}
        >
          <strong>🎯 Mục tiêu bài học: </strong>
          {objective}
        </div>
      ) : null}

      <div
        style={{
          border: '1px dashed var(--ifm-color-emphasis-400)',
          borderRadius: '8px',
          padding: '1rem 1.2rem',
          margin: '1.2rem 0',
          color: 'var(--ifm-color-emphasis-700)',
          fontSize: '0.92rem',
          lineHeight: 1.7,
        }}
      >
        <span
          style={{
            display: 'inline-block',
            background: 'var(--ifm-color-warning)',
            color: '#3a2d00',
            fontSize: '0.7rem',
            fontWeight: 700,
            padding: '0.15rem 0.5rem',
            borderRadius: '5px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            marginBottom: '0.6rem',
          }}
        >
          Đang biên soạn
        </span>
        <p style={{margin: '0.4rem 0 0'}}>
          Nội dung chi tiết của bài này đang được biên soạn theo cùng chuẩn với các
          bài mẫu (lý thuyết → hình/sơ đồ → ví dụ số → công cụ tương tác → quiz).
          Khung mục tiêu ở trên là cam kết nội dung sẽ bao phủ.
        </p>
        <p style={{margin: '0.6rem 0 0'}}>
          Xem bài mẫu hoàn chỉnh để hình dung chất lượng đích:{' '}
          <a href="/hoc/level-1-fresher/1-4-4-link-budget">Link budget &amp; OSNR</a>{' '}
          hoặc <a href="/hoc/level-3-senior/3-1-coherent">Coherent &amp; điều chế</a>.
        </p>
      </div>
    </div>
  );
}
