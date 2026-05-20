import { useState } from 'react';
import { SECTIONS, TECHS, TEMPLATES } from '../../utils/constants';
import { useTranslation } from '../../hooks/useTranslation';

export default function Sidebar({
  sectionState, toggleSection,
  sectionOrder, updateSectionOrder,
  selectedTechs, toggleTech,
  applyTemplate, activeTemplate,
}) {
const t = useTranslation();

const [draggedIndex, setDraggedIndex] = useState(null);

const handleDragStart = (e, index) => {
  setDraggedIndex(index);
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/plain', String(index));
};

const handleDragEnter = (e, targetIndex) => {
  if (draggedIndex === null || draggedIndex === targetIndex) return;

  const newOrder = [...sectionOrder];
  const [draggedItem] = newOrder.splice(draggedIndex, 1);
  newOrder.splice(targetIndex, 0, draggedItem);

  setDraggedIndex(targetIndex);
  updateSectionOrder(newOrder);
};

const handleDragEnd = () => {
  setDraggedIndex(null);
};
  const activeSectionCount = Object.values(sectionState).filter(Boolean).length;

  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <div className="sidebar-label">{t.templates}</div>
        <div className="templates-grid">
          {Object.entries(TEMPLATES).map(([key, template]) => (
            <button
              key={key}
              className={`template-btn${activeTemplate === key ? ' selected' : ''}`}
              onClick={() => applyTemplate(template, key)}
            >
              {key === 'webapp' && `🌐 ${t.webApp}`}
              {key === 'ml' && `🤖 ${t.mlAi}`}
              {key === 'api' && `⚡ ${t.backendApi}`}
              {key === 'cli' && `💻 ${t.cliTool}`}
              {key === 'academic' && `🎓 ${t.academicResearch}`}
              {key === 'mobile' && `📱 ${t.mobileApp}`}
              {key === 'lib' && `📦 ${t.library}`}
              {key === 'hackathon' && `🏆 ${t.hackathon}`}
              {key === 'oss' && `🔓 ${t.openSource}`}
            </button>
          ))}
        </div>
      </div>

      <div className="sidebar-section" style={{ flex: 1 }}>
<div className="sidebar-label">
  {t.sections}
  <span
    style={{
      fontSize: 10,
      fontWeight: 500,
      color: 'var(--muted)',
      marginLeft: 6
    }}
  >
    (drag to reorder)
  </span>
</div>
        <div className="section-toggles">
          {sectionOrder.map((id, idx) => {
            const sec = SECTIONS.find(s => s.id === id);
            if (!sec) return null;
            return (
              <div
                key={sec.id}
                className={`sec-toggle${sectionState[sec.id] ? ' active' : ''}${draggedIndex === idx ? ' dragging' : ''}`}
                draggable
                onDragStart={(e) => handleDragStart(e, idx)}
                onDragEnter={(e) => handleDragEnter(e, idx)}
                onDragEnd={handleDragEnd}
                onDragOver={(e) => e.preventDefault()}
              >
                <div className="sec-toggle-left">
                  <div className="drag-handle" title="Drag to reorder">
                    <svg width="10" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <circle cx="9" cy="5" r="1.5" /><circle cx="15" cy="5" r="1.5" />
                      <circle cx="9" cy="12" r="1.5" /><circle cx="15" cy="12" r="1.5" />
                      <circle cx="9" cy="19" r="1.5" /><circle cx="15" cy="19" r="1.5" />
                    </svg>
                  </div>
                  <span className="sec-toggle-icon">{sec.icon}</span>
                  {sec.label}
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={sectionState[sec.id]}
                    onChange={e => toggleSection(sec.id, e.target.checked)}
                  />
                  <span className="tslider" />
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
