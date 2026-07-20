import React from 'react';

/**
 * Callout — hộp ghi chú (thay cho admonition ::: để tránh xung đột linter).
 * type: info | goal | tip | note | caution
 */
const STYLES = {
  info:    {border: '#0a72b5', bg: 'rgba(10,114,181,0.10)',  icon: 'ℹ️', label: 'Thông tin'},
  goal:    {border: '#8957e5', bg: 'rgba(137,87,229,0.10)',  icon: '🎯', label: 'Mục tiêu bài học'},
  tip:     {border: '#2da44e', bg: 'rgba(45,164,78,0.10)',   icon: '💡', label: 'Mẹo'},
  note:    {border: '#6e7781', bg: 'rgba(110,119,129,0.10)', icon: '📌', label: 'Ghi chú'},
  caution: {border: '#bf8700', bg: 'rgba(191,135,0,0.12)',   icon: '⚠️', label: 'Lưu ý'},
};

export default function Callout({type = 'info', title, children}) {
  const s = STYLES[type] || STYLES.info;
  return (
    <div
      style={{
        borderLeft: `4px solid ${s.border}`,
        background: s.bg,
        borderRadius: '0 8px 8px 0',
        padding: '0.85rem 1.1rem',
        margin: '1.3rem 0',
      }}
    >
      <div style={{fontWeight: 700, marginBottom: '0.35rem', color: s.border}}>
        <span style={{marginRight: '0.4rem'}}>{s.icon}</span>
        {title || s.label}
      </div>
      <div>{children}</div>
    </div>
  );
}
