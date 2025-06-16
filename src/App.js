// App.jsx
import React, { useState, useRef } from 'react';
import '../src/css/App.css';
import '../src/css/board.css';
import '../src/css/chat.css';
import '../src/css/dropdown.css';
import '../src/css/feature.css';
import '../src/css/header.css';
import '../src/css/hero.css';
import '../src/css/login.css';
import '../src/css/map.css';
import '../src/css/small_translate.css';

const App = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [selectedBoard, setSelectedBoard] = useState('');
  const [selectedChat, setSelectedChat] = useState(null);
  const [isAdmin] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [subMenuVisible, setSubMenuVisible] = useState(null);

  const chatHistory = [
    { summary: '1차 상담 내용' },
    { summary: '2차 상담 내용' },
    { summary: '3차 상담 내용' }
  ];

  const faqList = [
    { q: 'Q. AI 상담이 실제 사람처럼 이야기하나요?', a: 'A. Mind Bridge는 자연어 이해와 공감 대화를 기반으로 상담 서비스를 제공드리기 위해 노력하고 있습니다' },
    { q: 'Q. 개인 정보는 안전한가요?', a: 'A. 철저한 암호화와 보안 시스템으로 보호되고 있습니다' },
    { q: 'Q. 이용 요금이 있나요?', a: 'A. 기본 상담은 무료로 진행되며 추후 업데이트를 통해 기능이 추가되면 유료 버전이 생길수도 있습니다' }
  ];

  const leaveTimer = useRef(null);
  const locationRef = useRef(null);
  const introRef = useRef(null);
  const noticeRef = useRef(null);

  const handleMouseEnter = (menu) => {
    clearTimeout(leaveTimer.current);
    setHoveredMenu(menu);
  };

  const handleMouseLeaveAll = () => {
    leaveTimer.current = setTimeout(() => {
      setHoveredMenu(null);
      setSubMenuVisible(null);
    }, 200);
  };

  const showSection = (id) => {
    setActiveSection(id);
    setHoveredMenu(null);
    setSubMenuVisible(null);
    setSelectedBoard('');
    setSelectedChat(null);
  };

  const handleBoardSelect = (value) => {
    if (value === 'adminBoard' && !isAdmin) {
      alert('관리자만 접근 가능합니다.');
      return;
    }
    setSelectedBoard(value);
    setActiveSection('board');
  };

  const handleSendEmail = () => {
    if (selectedChat === null) {
      alert('보낼 상담 기록을 선택해주세요.');
      return;
    }
    alert(`선택한 기록을 메일로 전송했습니다: ${chatHistory[selectedChat].summary}`);
  };

  const handleRead = () => {
    if (selectedChat === null) {
      alert('읽을 상담 기록을 선택해주세요.');
      return;
    }
    alert(`선택한 기록:\n${chatHistory[selectedChat].summary}`);
  };

  return (
    <div>
      <header className="header">
        <div className="header-inner">
          <img src="/로고.png" alt="Mind Bridge 로고" className="logo" onClick={() => showSection('about')} style={{ cursor: 'pointer' }} />
        </div>
        <div id="google_translate_element" className="translate"></div>
      </header>

      <nav className="nav">
        <div className="nav-left"></div>
        <div className="nav-center">
          {['about', 'services', 'board'].map((sec) => (
            <div
              key={sec}
              className="nav-item-wrapper"
              onMouseEnter={() => (sec === 'services' || sec === 'board') && handleMouseEnter(sec)}
              onMouseLeave={handleMouseLeaveAll}
            >
              <a
                href="#"
                onClick={() => (sec !== 'services' && sec !== 'board') && showSection(sec)}
                className={`nav-link ${activeSection === sec && sec !== 'about' ? 'nav-link-hover' : ''}`}
              >
                {sectionLabels[sec]}
              </a>
              {sec === 'services' && hoveredMenu === 'services' && (
                <div className="dropdown-wrapper">
                  <div className="dropdown">
                    <div className="dropdown-column">
                      {['상담', '고객 서비스'].map((item, i) => (
                        <div
                          key={i}
                          className={`dropdown-item ${subMenuVisible === item ? 'highlight' : ''}`}
                          onMouseEnter={() => setSubMenuVisible(item)}
                        >
                          {item}
                          {subMenuVisible === item && (
                            <div className="dropdown-submenu">
                              {item === '상담' && (
                                <>
                                  <div className="dropdown-item" onClick={() => showSection('chat')}>AI 상담</div>
                                  <div className="dropdown-item" onClick={() => showSection('email')}>메일</div>
                                </>
                              )}
                              {item === '고객 서비스' && (
                                <>
                                  <div className="dropdown-item">서비스 준비 중</div>
                                  <div className="dropdown-item">서비스 준비 중</div>
                                </>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {sec === 'board' && hoveredMenu === 'board' && (
                <div className="dropdown-wrapper">
                  <div className="dropdown">
                    <div className="dropdown-column">
                      <div className="dropdown-item" onClick={() => handleBoardSelect('generalBoard')}>일반 게시판</div>
                      <div className="dropdown-item" onClick={() => handleBoardSelect('adminBoard')}>관리자 게시판</div>
                      <div className="dropdown-item" onClick={() => handleBoardSelect('noticeBoard')}>공지사항</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="nav-right">
          <button onClick={() => showSection('login')} className="auth-button">로그인</button>
        </div>
      </nav>

      {activeSection === 'about' && (
        <section className="hero">
          <h1><strong>당신의 마음을 이해하는</strong> AI Mind Bridge</h1>
          <p>감성 분석, AI 상담, 번역, 이미지 기반 소통까지 한 번에</p>
          <a href="#faq" className="cta" onClick={() => showSection('faq')}>자주 묻는 질문</a>
        </section>
      )}

      {activeSection === 'faq' && (
        <section className="form-section">
          <h2>자주 묻는 질문</h2>
          {faqList.map((item, i) => (
            <p key={i}><strong>{item.q}</strong><br />{item.a}</p>
          ))}
        </section>
      )}

      {['login', 'signup', 'id', 'password'].includes(activeSection) && (
        <section className="form-section">
          <h2>{sectionLabels[activeSection]}</h2>
          {formInputs[activeSection].map((input, i) => (
            <input key={i} type={input.type} placeholder={input.placeholder} className="input" />
          ))}
          <button className="button">{buttonLabels[activeSection]}</button>
          {formLinks[activeSection] && (
            <div className="form-links">
              {formLinks[activeSection].map(({ label, id }) => (
                <a key={id} href="#" onClick={() => showSection(id)}>{label}</a>
              ))}
            </div>
          )}
        </section>
      )}

      {activeSection === 'chat' && (
        <section className="chat-section">
          <h2>AI 상담 챗봇</h2>
          <div className="chat-box"><p><strong>AI:</strong> 안녕하세요 어떤 고민이 있으신가요?</p></div>
          <input type="text" placeholder="메시지를 입력하세요..." className="input-full" />
        </section>
      )}

      {activeSection === 'board' && (
        <section className="board-section">
          <h2>게시판</h2>
          {selectedBoard === 'generalBoard' && (
            <>
              <textarea className="textarea" placeholder="당신의 감정을 나눠보세요..."></textarea>
              <div>
                {['공개', '비공개', '관리자만 공개'].map((label, i) => (
                  <label key={i}><input type="checkbox" /> {label}</label>
                ))}
              </div>
            </>
          )}
          {selectedBoard === 'adminBoard' && (
            <>
              <p>관리자 전용 게시판입니다.</p>
              <textarea className="textarea" placeholder="관리자만 작성 가능합니다"></textarea>
            </>
          )}
          {selectedBoard === 'noticeBoard' && (
            <>
              <textarea className="textarea" placeholder="공지사항 작성 (관리자만)"></textarea>
              <p>※ 일반 사용자는 읽기만 가능합니다.</p>
            </>
          )}
        </section>
      )}

      {activeSection === 'email' && (
        <section className="board-section">
          <h2>AI 상담 기록 메일 전송</h2>
          <ul style={{ textAlign: 'left' }}>
            {chatHistory.map((item, idx) => (
              <li key={idx}>
                <label>
                  <input
                    type="radio"
                    name="chatSelect"
                    value={idx}
                    checked={selectedChat === idx}
                    onChange={() => setSelectedChat(idx)}
                  />
                  {item.summary.length > 30 ? item.summary.slice(0, 30) + '...' : item.summary}
                </label>
              </li>
            ))}
          </ul>
          <div style={{ marginTop: '1rem' }}>
            <button className="button" onClick={handleRead}>텍스트 읽기</button>
            <button className="button" onClick={handleSendEmail}>메일 전송</button>
          </div>
        </section>
      )}

      {activeSection === 'about' && (
        <>
          <section ref={introRef} className="section">
            <h2>회사 소개</h2>
            <p>Mind Bridge는 인공지능 기반 정서 분석 및 상담 서비스를 제공합니다.</p>
          </section>

          <section ref={noticeRef} className="section">
            <h2>공지 사항</h2>
            <p>현재 정기 점검 중이며, 서비스가 일부 제한될 수 있습니다.</p>
          </section>

          <section ref={locationRef} className="section">
            <h2>회사 위치</h2>
            <div className="map-container">
              <iframe
                src="https://map.naver.com/p/search/%EC%84%9C%EC%9A%B8%20%EC%A4%91%EA%B5%AC%20%ED%86%B5%EC%9D%BC%EB%A1%9C%20114"
                allowFullScreen
                className="map-iframe"
                title="회사 위치"
              />
              <p className="map-caption">📍 서울시 중구 통일로 114</p>
            </div>
          </section>
        </>
      )}

      <footer className="footer">
        주식회사 : (주) 화재감지기 | 주소 : 서울시 중구 통일로 114<br />
        이메일 : help@mindbridge.ai | 전화: 02-1234-5678
        <img src="/문의.jpg" className="small-img" />
      </footer>
    </div>
  );
};

const sectionLabels = {
  about: '소개',
  services: '서비스',
  board: '게시판',
  chat: 'AI 상담',
  map: '회사 위치',
  email: '메일',
  login: '로그인',
  signup: '회원가입',
  id: '아이디 찾기',
  password: '비밀번호 찾기',
  faq: '자주 묻는 질문'
};

const formInputs = {
  login: [
    { type: 'email', placeholder: '아이디' },
    { type: 'password', placeholder: '비밀번호' }
  ],
  signup: [
    { type: 'text', placeholder: '이름' },
    { type: 'email', placeholder: '이메일' },
    { type: 'tel', placeholder: '전화번호' },
    { type: 'password', placeholder: '비밀번호' }
  ],
  id: [
    { type: 'text', placeholder: '이름' },
    { type: 'tel', placeholder: '전화번호' },
    { type: 'email', placeholder: '이메일' }
  ],
  password: [
    { type: 'text', placeholder: '아이디' },
    { type: 'tel', placeholder: '전화번호' },
    { type: 'email', placeholder: '이메일' }
  ]
};

const buttonLabels = {
  login: '로그인',
  signup: '가입하기',
  id: '아이디 찾기',
  password: '비밀번호 찾기'
};

const formLinks = {
  login: [
    { label: '회원가입', id: 'signup' },
    { label: '아이디 찾기', id: 'id' },
    { label: '비밀번호 찾기', id: 'password' }
  ]
};

export default App;
