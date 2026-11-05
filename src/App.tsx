import { FormEvent, useEffect, useState } from "react"

type ModalType = "booking" | "consult" | "search" | "video" | "gallery" | "clinic" | "notice"

type ModalState = {
  type: ModalType
  title?: string
  detail?: string
  artwork?: number
} | null

const heroSlides = [
  {
    eyebrow: "몸과 마음이 다시, 편안해지는 곳",
    title: ["일상의 건강을", "되찾는 한방의 힘"],
    description: [
      "사람을 먼저 생각하는 다온한방병원이",
      "건강한 하루를 함께 만들어갑니다.",
    ],
    palette: 0,
  },
  {
    eyebrow: "오늘의 나를 세심하게 살피는 진료",
    title: ["내 몸에 맞춘", "정직한 한방치료"],
    description: [
      "충분한 상담과 꼼꼼한 진단을 바탕으로",
      "나에게 꼭 맞는 치료를 제안합니다.",
    ],
    palette: 1,
  },
  {
    eyebrow: "전통의 지혜를 현대의 일상으로",
    title: ["더 편안한 내일을", "함께 만드는 다온"],
    description: [
      "건강한 회복의 과정마다 따뜻한 마음으로",
      "다온한방병원이 함께하겠습니다.",
    ],
    palette: 2,
  },
]

const services = [
  {
    icon: "✦",
    title: "맞춤 한방치료",
    lines: ["개인별 체질과 상태에 맞춘", "1:1 맞춤 치료"],
  },
  {
    icon: "✿",
    title: "안전한 한약 처방",
    lines: ["믿을 수 있는", "청정 한약재 사용"],
  },
  {
    icon: "⌁",
    title: "통증 클리닉",
    lines: ["허리·목·관절 등", "만성 통증 치료"],
  },
  {
    icon: "♧",
    title: "생활질환 클리닉",
    lines: ["소화기·호흡기·여성질환 등", "생활 속 건강 관리"],
  },
  {
    icon: "✧",
    title: "면역·보약 클리닉",
    lines: ["체질 개선과", "면역력 증진"],
  },
]

const clinics = [
  {
    title: "통증·척추 클리닉",
    detail: "허리, 목, 어깨, 무릎 등",
    tone: "#cfc7ba",
  },
  { title: "소화기 클리닉", detail: "소화불량, 위장장애 등", tone: "#e0d1bf" },
  {
    title: "교통사고 후유증 클리닉",
    detail: "사고 후 통증, 재활 치료",
    tone: "#c2c4ba",
  },
  {
    title: "여성건강 클리닉",
    detail: "생리통, 갱년기, 여성질환 등",
    tone: "#dec9c2",
  },
  {
    title: "소아·성장 클리닉",
    detail: "성장, 면역, 체질 개선",
    tone: "#ccd1bf",
  },
  {
    title: "보약·면역 클리닉",
    detail: "체질 개선, 기력 회복",
    tone: "#c4ccc2",
  },
]

const rooms = ["진료실", "추나요법실", "한약조제실", "입원실"]

const notices = [
  ["추석 연휴 진료 일정 안내", "2024.09.10"],
  ["특강 해열 한약 프로그램 안내", "2024.09.05"],
  ["진료 예약 시스템 오픈 안내", "2024.08.28"],
]

// Figma 시안에서 반복되는 실내 이미지를 하나의 재사용 가능한 도형 컴포넌트로 구성합니다.
function Artwork({
  variant = 0,
  compact = false,
}: {
  variant?: number
  compact?: boolean
}) {
  return (
    <div
      className={`artwork artwork--${variant} ${
        compact ? "artwork--compact" : ""
      }`}
      aria-hidden="true"
    >
      <span className="artwork__light" />
      <span className="artwork__shadow" />
      <span className="artwork__line" />
      <span className="artwork__floor" />
      <span className="artwork__desk" />
      <span className="artwork__base" />
    </div>
  )
}

// 데스크톱 내비게이션과 모바일 햄버거 메뉴를 함께 관리하는 헤더입니다.
function Header({ openModal }: { openModal: (modal: ModalState) => void }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigation = [
    ["병원소개", "#about"],
    ["진료안내", "#services"],
    ["치료클리닉", "#clinics"],
    ["한방건강정보", "#information"],
    ["커뮤니티", "#community"],
  ]

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="header">
      <div className="header__inner">
        <a
          className="brand"
          href="#top"
          onClick={closeMenu}
          aria-label="다온한방병원 홈"
        >
          <img src="/daon-leaf.svg" alt="" width="46" height="43" />
          <span>
            <strong>다온한방병원</strong>
            <small>DAON KOREAN MEDICINE HOSPITAL</small>
          </span>
        </a>

        <nav
          className={`navigation ${menuOpen ? "navigation--open" : ""}`}
          aria-label="주요 메뉴"
        >
          {navigation.map(([label, href]) => (
            <a key={label} href={href} onClick={closeMenu}>
              {label}
            </a>
          ))}
          <div className="navigation__mobile-actions">
            <button onClick={() => openModal({ type: "consult" })}>
              온라인 상담
            </button>
            <button
              className="button button--brown"
              onClick={() => openModal({ type: "booking" })}
            >
              예약하기
            </button>
          </div>
        </nav>

        <div className="header__actions">
          <button
            className="search-button"
            onClick={() => openModal({ type: "search" })}
            aria-label="검색"
          >
            <span aria-hidden="true" />
          </button>
          <button
            className="button button--ghost"
            onClick={() => openModal({ type: "consult" })}
          >
            온라인 상담
          </button>
          <button
            className="button button--brown"
            onClick={() => openModal({ type: "booking" })}
          >
            예약하기
          </button>
        </div>

        <button
          className={`menu-button ${menuOpen ? "menu-button--open" : ""}`}
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="메뉴 열기"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}

// 히어로는 자동 전환과 이전/다음 버튼을 모두 지원하는 실제 슬라이더입니다.
function Hero({ openModal }: { openModal: (modal: ModalState) => void }) {
  const [slide, setSlide] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(
      () => setSlide((current) => (current + 1) % heroSlides.length),
      7000,
    )
    return () => window.clearInterval(timer)
  }, [])

  const moveSlide = (direction: number) => {
    setSlide(
      (current) =>
        (current + direction + heroSlides.length) % heroSlides.length,
    )
  }

  return (
    <section className="hero" id="top" aria-label="다온한방병원 주요 안내">
      <div className="hero__copy" key={slide}>
        <p className="hero__eyebrow">{heroSlides[slide].eyebrow}</p>
        <h1>
          {heroSlides[slide].title.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h1>
        <p className="hero__description">
          {heroSlides[slide].description.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </p>
        <div className="hero__buttons">
          <button
            className="button button--brown button--wide"
            onClick={() => openModal({ type: "booking" })}
          >
            진료 예약하기 <span aria-hidden="true">→</span>
          </button>
          <a className="button button--cream button--wide" href="#about">
            병원 소개 보기
          </a>
        </div>
        <div className="hero__pagination" aria-label="슬라이드 페이지">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={slide === index ? "active" : ""}
              onClick={() => setSlide(index)}
              aria-label={`${index + 1}번 슬라이드`}
            >
              {String(index + 1).padStart(2, "0")}
            </button>
          ))}
        </div>
      </div>
      <div className="hero__visual" key={`art-${slide}`}>
        <Artwork variant={heroSlides[slide].palette} />
      </div>
      <div className="hero__arrows">
        <button onClick={() => moveSlide(-1)} aria-label="이전 슬라이드">
          ‹
        </button>
        <button onClick={() => moveSlide(1)} aria-label="다음 슬라이드">
          ›
        </button>
      </div>
    </section>
  )
}

// 반복되는 대표 진료 항목은 배열을 순회해 동일한 구조로 렌더링합니다.
function SignatureServices() {
  return (
    <section
      className="signature-services"
      id="services"
      aria-label="다온의 주요 진료"
    >
      <div className="signature-services__inner">
        {services.map((service, index) => (
          <a className="service-item" href="#clinics" key={service.title}>
            <span className="service-item__icon" aria-hidden="true">
              {service.icon}
            </span>
            <strong>{service.title}</strong>
            <span>
              {service.lines[0]}
              <br />
              {service.lines[1]}
            </span>
            {index < services.length - 1 && <i aria-hidden="true" />}
          </a>
        ))}
      </div>
    </section>
  )
}

// 병원의 진료 철학과 소개 영상 진입점을 담은 영역입니다.
function Philosophy({ openModal }: { openModal: (modal: ModalState) => void }) {
  return (
    <section className="philosophy" id="about">
      <div className="philosophy__visual">
        <Artwork variant={1} />
      </div>
      <div className="philosophy__copy">
        <p className="section-kicker">
          ━&nbsp;&nbsp; 전통의 지혜, 오늘의 건강으로
        </p>
        <h2>
          사람을 위한
          <br />
          올바른 한방치료
        </h2>
        <p className="section-description">
          다온한방병원은 전통의 가치를 바탕으로
          <br />
          현대인의 건강 고민을 함께 해결합니다.
        </p>
        <div className="care-values">
          {[
            ["♡", "환자 중심 진료"],
            ["♧", "안전한 의료 시스템"],
            ["♙", "풍부한 임상 경험"],
          ].map(([icon, label]) => (
            <div key={label}>
              <span aria-hidden="true">{icon}</span>
              <strong>{label}</strong>
            </div>
          ))}
        </div>
      </div>
      <button
        className="video-button"
        onClick={() => openModal({ type: "video" })}
        aria-label="다온한방병원 소개 영상 보기"
      >
        <span aria-hidden="true">▶</span>
        <strong>
          다온한방병원
          <br />
          소개 영상 보기
        </strong>
      </button>
    </section>
  )
}

// 각 클리닉 카드는 클릭하면 해당 진료 설명 팝업을 엽니다.
function ClinicSection({
  openModal,
}: {
  openModal: (modal: ModalState) => void
}) {
  return (
    <section className="clinics" id="clinics">
      <div className="section-heading">
        <h2>주요 진료 클리닉</h2>
        <p>
          다양한 한방 진료로
          <br />
          일상의 건강을 지켜드립니다.
        </p>
        <a href="#services">전체 진료 보기&nbsp; →</a>
      </div>
      <div className="clinic-grid">
        {clinics.map((clinic, index) => (
          <button
            className="clinic-card"
            key={clinic.title}
            onClick={() =>
              openModal({
                type: "clinic",
                title: clinic.title,
                detail: clinic.detail,
                artwork: index,
              })
            }
          >
            <span
              className="clinic-card__image"
              style={{ backgroundColor: clinic.tone }}
            >
              <i />
              <b />
            </span>
            <strong>{clinic.title}</strong>
            <small>{clinic.detail}</small>
          </button>
        ))}
      </div>
    </section>
  )
}

// 공간 썸네일은 같은 Artwork 컴포넌트를 작은 크기로 재사용합니다.
function Gallery({ openModal }: { openModal: (modal: ModalState) => void }) {
  return (
    <section className="gallery" id="gallery">
      <div className="gallery__intro">
        <h2>
          편안함이 머무는
          <br />
          치료 공간
        </h2>
        <p>
          몸과 마음이 모두 편안할 수 있는
          <br />
          쾌적한 진료 환경을 제공합니다.
        </p>
        <button
          className="button button--cream button--wide"
          onClick={() =>
            openModal({ type: "gallery", title: rooms[0], artwork: 0 })
          }
        >
          병원 둘러보기&nbsp; →
        </button>
      </div>
      <div className="gallery__rooms">
        {rooms.map((room, index) => (
          <button
            key={room}
            onClick={() =>
              openModal({ type: "gallery", title: room, artwork: index })
            }
          >
            <Artwork compact variant={index % 3} />
            <span>{room}</span>
          </button>
        ))}
      </div>
    </section>
  )
}

// 공지, 환자 이야기, 오시는 길, 예약 정보를 한곳에 구성한 하단 정보 영역입니다.
function Information({
  openModal,
}: {
  openModal: (modal: ModalState) => void
}) {
  return (
    <section className="information" id="information">
      <div className="information__notices" id="community">
        <div className="information__title">
          <h2>공지사항</h2>
          <span>더보기&nbsp; +</span>
        </div>
        <ul>
          {notices.map(([title, date]) => (
            <li key={title}>
              <button
                onClick={() =>
                  openModal({
                    type: "notice",
                    title,
                    detail: `${date} 등록된 다온한방병원 공지입니다.`,
                  })
                }
              >
                <span>{title}</span>
                <time>{date}</time>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="information__story">
        <h2>환자분들의 이야기</h2>
        <blockquote>
          “꾸준한 치료로 허리 통증이 많이 좋아졌어요.
          <br />
          친절하고 세심한 진료에 늘 감사합니다.”
        </blockquote>
        <p>김○○ 님&nbsp; | &nbsp;허리 통증 치료</p>
      </div>

      <div className="information__location">
        <h2>오시는 길</h2>
        <div className="map-placeholder">
          <span aria-hidden="true">●</span>
        </div>
        <p>
          경상남도 진주시 진주대로 123
          <br />
          다온한방병원
        </p>
        <a
          className="button button--green"
          href="https://map.kakao.com/link/search/경상남도%20진주시%20진주대로%20123"
          target="_blank"
          rel="noreferrer"
        >
          지도에서 보기&nbsp; →
        </a>
      </div>

      <div className="information__contact">
        <h2>진료 예약 및 상담</h2>
        <a className="contact-phone" href="tel:055-123-4567">
          ☎&nbsp; 055-123-4567
        </a>
        <p>
          평일&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 09:00 - 18:00
          <br />
          토요일&nbsp;&nbsp; 09:00 - 13:00
          <br />
          점심시간&nbsp; 12:30 - 13:30
        </p>
        <div>
          <button
            className="button button--cream"
            onClick={() => openModal({ type: "booking" })}
          >
            진료 예약하기 →
          </button>
          <button
            className="text-action"
            onClick={() => openModal({ type: "consult" })}
          >
            온라인 상담 →
          </button>
        </div>
      </div>
    </section>
  )
}

// 예약·상담·검색 등 여러 기능을 한 팝업 뼈대에서 내용만 바꿔 표시합니다.
function Modal({
  modal,
  close,
  open,
}: {
  modal: NonNullable<ModalState>
  close: () => void
  open: (modal: NonNullable<ModalState>) => void
}) {
  const [submitted, setSubmitted] = useState(false)
  const [query, setQuery] = useState("")

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) =>
      event.key === "Escape" && close()
    window.addEventListener("keydown", onKeyDown)
    document.body.classList.add("modal-open")
    return () => {
      window.removeEventListener("keydown", onKeyDown)
      document.body.classList.remove("modal-open")
    }
  }, [close])

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
  }

  const titles: Record<ModalType, string> = {
    booking: "진료 예약하기",
    consult: "온라인 상담",
    search: "사이트 검색",
    video: "다온한방병원 소개",
    gallery: modal.title ?? "병원 둘러보기",
    clinic: modal.title ?? "진료 클리닉",
    notice: modal.title ?? "공지사항",
  }

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => event.currentTarget === event.target && close()}
    >
      <section
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button className="modal__close" onClick={close} aria-label="팝업 닫기">
          ×
        </button>
        <p className="modal__kicker">DAON KOREAN MEDICINE HOSPITAL</p>
        <h2 id="modal-title">{titles[modal.type]}</h2>

        {(modal.type === "booking" || modal.type === "consult") &&
          (submitted ? (
            <div className="modal__success">
              <span aria-hidden="true">✓</span>
              <strong>
                {modal.type === "booking"
                  ? "예약 신청이 접수되었습니다."
                  : "상담 신청이 접수되었습니다."}
              </strong>
              <p>확인 후 입력하신 연락처로 안내드리겠습니다.</p>
              <button className="button button--brown" onClick={close}>
                확인
              </button>
            </div>
          ) : (
            <form className="modal-form" onSubmit={submitForm}>
              <label>
                성함
                <input
                  name="name"
                  required
                  placeholder="성함을 입력해 주세요"
                />
              </label>
              <label>
                연락처
                <input
                  name="phone"
                  required
                  type="tel"
                  placeholder="010-0000-0000"
                />
              </label>
              {modal.type === "booking" && (
                <label>
                  희망 진료일
                  <input name="date" required type="date" />
                </label>
              )}
              <label>
                {modal.type === "booking" ? "진료 내용" : "상담 내용"}
                <textarea
                  name="message"
                  required
                  placeholder="문의하실 내용을 입력해 주세요"
                />
              </label>
              <button className="button button--brown" type="submit">
                신청하기
              </button>
            </form>
          ))}

        {modal.type === "search" && (
          <form
            className="search-form"
            onSubmit={(event) => {
              event.preventDefault()
              setSubmitted(true)
            }}
          >
            <div>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                required
                autoFocus
                placeholder="검색어를 입력해 주세요"
              />
              <button type="submit">검색</button>
            </div>
            {submitted && (
              <p>‘{query}’에 대한 검색 결과는 상담실로 문의해 주세요.</p>
            )}
          </form>
        )}

        {modal.type === "video" && (
          <div className="video-placeholder">
            <Artwork variant={2} />
            <span aria-hidden="true">▶</span>
            <p>
              환자의 일상 가까이에서
              <br />
              건강한 회복을 함께하는 다온한방병원입니다.
            </p>
          </div>
        )}

        {modal.type === "gallery" && (
          <div className="gallery-modal">
            <Artwork variant={(modal.artwork ?? 0) % 3} />
            <p>
              편안한 진료를 위해 차분하고 쾌적하게 마련한 {modal.title}입니다.
            </p>
            <div>
              {rooms.map((room, index) => (
                <button
                  key={room}
                  onClick={() =>
                    open({ type: "gallery", title: room, artwork: index })
                  }
                >
                  {room}
                </button>
              ))}
            </div>
          </div>
        )}

        {(modal.type === "clinic" || modal.type === "notice") && (
          <div className="content-modal">
            {modal.type === "clinic" && (
              <div className="content-modal__image">
                <Artwork variant={(modal.artwork ?? 0) % 3} />
              </div>
            )}
            <p>{modal.detail}</p>
            <p>
              {modal.type === "clinic"
                ? "환자분의 현재 상태를 세심하게 살핀 뒤 맞춤 진료 계획을 안내해 드립니다."
                : "자세한 내용은 대표전화 또는 온라인 상담을 통해 안내받으실 수 있습니다."}
            </p>
            <button className="button button--brown" onClick={close}>
              확인
            </button>
          </div>
        )}
      </section>
    </div>
  )
}

export default function App() {
  const [modal, setModal] = useState<ModalState>(null)

  return (
    <>
      <Header openModal={setModal} />
      <main>
        <Hero openModal={setModal} />
        <SignatureServices />
        <Philosophy openModal={setModal} />
        <ClinicSection openModal={setModal} />
        <Gallery openModal={setModal} />
        <Information openModal={setModal} />
      </main>
      {modal && (
        <Modal modal={modal} close={() => setModal(null)} open={setModal} />
      )}
    </>
  )
}
