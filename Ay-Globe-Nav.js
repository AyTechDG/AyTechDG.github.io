/**
 * AyTech Globe-Navigator
 * Self-contained floating navigator widget
 * No external resources (icons via inline SVG, no CDN)
 */
(function () {
    'use strict';

    // جلوگیری از تزریق دوباره
    if (window.__AY_GLOBE_NAV_LOADED__) return;
    window.__AY_GLOBE_NAV_LOADED__ = true;

    // ============================================================
    // 1) تزریق استایل‌ها (Self-contained)
    // ============================================================
    var style = document.createElement('style');
    style.id = 'ay-globe-nav-styles';
    style.textContent = `
        /* --- AyTech Globe-Navigator --- */
        .ay-globe-nav-container {
            position: fixed;
            bottom: 30px;
            left: 30px;
            z-index: 2147483000;
            font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
            /* متغیرهای رنگی قابل رویت روی هر پس‌زمینه */
            --ay-navy: #0a1a2f;
            --ay-deep: #061224;
            --ay-cyan: #00e5ff;
            --ay-magenta: #ff2bd6;
            --ay-gold: #ffd54f;
            --ay-glass: rgba(10, 26, 47, 0.55);
            --ay-glass-strong: rgba(6, 18, 36, 0.85);
            --ay-ring: rgba(0, 229, 255, 0.55);
        }

        /* دکمه اصلی (کُره) */
        .ay-globe-nav-main {
            position: relative;
            width: 62px;
            height: 62px;
            border-radius: 50%;
            border: none;
            cursor: pointer;
            z-index: 2147483002;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0;
            color: #fff;
            background:
                radial-gradient(circle at 30% 30%, #1e3a5f 0%, #0a1a2f 55%, #040b16 100%);
            box-shadow:
                0 0 0 2px rgba(255,255,255,0.10),
                0 0 22px rgba(0, 229, 255, 0.45),
                0 0 42px rgba(255, 43, 214, 0.18),
                inset 0 0 18px rgba(0, 229, 255, 0.18);
            transition: transform 0.35s cubic-bezier(.68,-0.55,.27,1.55),
                        box-shadow 0.35s ease;
            isolation: isolate;
            -webkit-tap-highlight-color: transparent;
        }

        /* لایه گرادیانت چرخان */
        .ay-globe-nav-main::before {
            content: "";
            position: absolute;
            inset: -3px;
            border-radius: 50%;
            background: conic-gradient(
                from 0deg,
                var(--ay-cyan),
                var(--ay-magenta),
                var(--ay-gold),
                var(--ay-cyan)
            );
            opacity: 0.85;
            z-index: -2;
            animation: ay-globe-spin 6s linear infinite;
            filter: blur(0.5px);
        }

        /* ماسک برای حلقه‌ی گرادیانت */
        .ay-globe-nav-main::after {
            content: "";
            position: absolute;
            inset: 2px;
            border-radius: 50%;
            background: radial-gradient(circle at 30% 30%, #122844 0%, #071326 70%);
            z-index: -1;
        }

        /* افکت برق زدن (Shimmer) */
        .ay-globe-nav-main .ay-globe-shimmer {
            position: absolute;
            inset: 0;
            border-radius: 50%;
            overflow: hidden;
            z-index: 1;
            pointer-events: none;
        }
        .ay-globe-nav-main .ay-globe-shimmer::before {
            content: "";
            position: absolute;
            top: -60%;
            left: -60%;
            width: 220%;
            height: 220%;
            background: linear-gradient(
                115deg,
                transparent 0%,
                transparent 40%,
                rgba(255,255,255,0.55) 50%,
                transparent 60%,
                transparent 100%
            );
            transform: translateX(-100%) rotate(0deg);
            animation: ay-globe-shimmer 3s ease-in-out infinite;
        }

        /* آیکون اصلی کُره */
        .ay-globe-nav-main .ay-globe-icon {
            position: relative;
            z-index: 2;
            width: 30px;
            height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: transform 0.35s cubic-bezier(.68,-0.55,.27,1.55), opacity 0.2s ease;
            filter: drop-shadow(0 0 6px rgba(0,229,255,0.6));
        }
        .ay-globe-nav-main .ay-globe-icon svg {
            width: 100%;
            height: 100%;
            animation: ay-globe-spin 12s linear infinite;
        }

        /* آیکون جایگزین (وقتی آیتم هاور است) */
        .ay-globe-nav-main .ay-globe-icon-replacement {
            position: absolute;
            z-index: 3;
            width: 28px;
            height: 28px;
            display: flex;
            justify-content: center;
            align-items: center;
            opacity: 0;
            transform: scale(0.5);
            transition: opacity 0.25s ease, transform 0.3s cubic-bezier(.68,-0.55,.27,1.55);
            filter: drop-shadow(0 0 8px rgba(255,43,214,0.8));
            color: #fff;
        }
        .ay-globe-nav-main .ay-globe-icon-replacement svg {
            width: 100%;
            height: 100%;
        }

        /* حالت هاور/فوکوس دکمه اصلی */
        .ay-globe-nav-main:hover,
        .ay-globe-nav-main:focus-visible {
            transform: scale(1.08);
            box-shadow:
                0 0 0 2px rgba(255,255,255,0.18),
                0 0 30px rgba(0, 229, 255, 0.7),
                0 0 60px rgba(255, 43, 214, 0.35),
                inset 0 0 22px rgba(0, 229, 255, 0.28);
            outline: none;
        }

        /* وقتی منو باز است */
        .ay-globe-nav-container.ay-active .ay-globe-nav-main {
            transform: scale(0.95);
        }
        .ay-globe-nav-container.ay-active .ay-globe-nav-main .ay-globe-icon svg {
            animation-play-state: paused;
        }

        /* وقتی یکی از آیتم‌ها هاور/فوکوس شده: آیکون اصلی پنهان، آیکون جایگزین ظاهر */
        .ay-globe-nav-container.ay-hovering .ay-globe-nav-main .ay-globe-icon {
            opacity: 0;
            transform: scale(0.3) rotate(90deg);
        }
        .ay-globe-nav-container.ay-hovering .ay-globe-nav-main .ay-globe-icon-replacement {
            opacity: 1;
            transform: scale(1);
        }
        .ay-globe-nav-container.ay-hovering .ay-globe-nav-main {
            box-shadow:
                0 0 0 2px rgba(255,255,255,0.20),
                0 0 30px rgba(255, 43, 214, 0.65),
                0 0 60px rgba(0, 229, 255, 0.35),
                inset 0 0 22px rgba(255, 43, 214, 0.25);
        }

        /* --- آیتم‌های منو --- */
        .ay-globe-nav-items {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0;
            height: 0;
            z-index: 2147483001;
            pointer-events: none;
        }

        .ay-globe-nav-item {
            position: absolute;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            text-decoration: none;
            opacity: 0;
            transform: translate(0, 0) scale(0.4);
            pointer-events: none;
            color: #fff;
            background:
                radial-gradient(circle at 30% 30%, rgba(30,58,95,0.95), rgba(6,18,36,0.95));
            box-shadow:
                0 0 0 1px rgba(255,255,255,0.12),
                0 0 14px rgba(0, 229, 255, 0.35),
                inset 0 0 10px rgba(0, 229, 255, 0.12);
            transition: transform 0.45s cubic-bezier(.68,-0.55,.27,1.55),
                        opacity 0.35s ease,
                        box-shadow 0.3s ease,
                        background 0.3s ease;
            -webkit-tap-highlight-color: transparent;
            overflow: hidden;
        }
        .ay-globe-nav-item svg {
            width: 22px;
            height: 22px;
            position: relative;
            z-index: 2;
            filter: drop-shadow(0 0 4px rgba(0,229,255,0.5));
            transition: transform 0.3s ease;
        }

        /* افکت برق زدن آیتم‌ها */
        .ay-globe-nav-item::before {
            content: "";
            position: absolute;
            top: -50%;
            left: -80%;
            width: 220%;
            height: 200%;
            background: linear-gradient(
                115deg,
                transparent 0%,
                transparent 42%,
                rgba(255,255,255,0.5) 50%,
                transparent 58%,
                transparent 100%
            );
            transform: translateX(-100%);
            animation: ay-globe-shimmer 3s ease-in-out infinite;
            z-index: 1;
            pointer-events: none;
        }

        /* حلقه گرادیانت اطراف آیتم ها */
        .ay-globe-nav-item::after {
            content: "";
            position: absolute;
            inset: 2px;
            border-radius: 50%;
            border: 1px solid rgba(0, 229, 255, 0.35);
            pointer-events: none;
            z-index: 0;
        }

        /* حالت باز منو: موقعیت قوسی */
        .ay-globe-nav-container.ay-active .ay-globe-nav-item {
            opacity: 1;
            pointer-events: auto;
        }
        .ay-globe-nav-container.ay-active .ay-globe-nav-item:nth-child(1) {
            transform: translate(46px, -128px) scale(1);
        }
        .ay-globe-nav-container.ay-active .ay-globe-nav-item:nth-child(2) {
            transform: translate(118px, -110px) scale(1);
        }
        .ay-globe-nav-container.ay-active .ay-globe-nav-item:nth-child(3) {
            transform: translate(128px, -40px) scale(1);
        }

        /* هاور / فوکوس روی آیتم */
        .ay-globe-nav-item:hover,
        .ay-globe-nav-item:focus-visible {
            outline: none;
            background:
                radial-gradient(circle at 30% 30%, rgba(0,229,255,0.35), rgba(255,43,214,0.25) 60%, rgba(6,18,36,0.95));
            box-shadow:
                0 0 0 1px rgba(255,255,255,0.25),
                0 0 22px rgba(0, 229, 255, 0.75),
                0 0 40px rgba(255, 43, 214, 0.4),
                inset 0 0 14px rgba(255, 43, 214, 0.3);
        }
        .ay-globe-nav-item:hover svg,
        .ay-globe-nav-item:focus-visible svg {
            transform: scale(1.15);
        }

        /* --- انیمیشن‌ها --- */
        @keyframes ay-globe-spin {
            100% { transform: rotate(360deg); }
        }
        @keyframes ay-globe-shimmer {
            0%   { transform: translateX(-100%) rotate(0deg); }
            40%  { transform: translateX(-30%) rotate(0deg); }
            60%  { transform: translateX(30%) rotate(0deg); }
            100% { transform: translateX(100%) rotate(0deg); }
        }

        /* دسترسی‌پذیری: کاهش حرکت */
        @media (prefers-reduced-motion: reduce) {
            .ay-globe-nav-main::before,
            .ay-globe-nav-main .ay-globe-shimmer::before,
            .ay-globe-nav-item::before,
            .ay-globe-nav-main .ay-globe-icon svg {
                animation: none !important;
            }
        }

        /* موبایل */
        @media (max-width: 480px) {
            .ay-globe-nav-container { bottom: 20px; left: 20px; }
            .ay-globe-nav-main { width: 56px; height: 56px; }
            .ay-globe-nav-item { width: 46px; height: 46px; }
            .ay-globe-nav-container.ay-active .ay-globe-nav-item:nth-child(1) { transform: translate(42px, -118px) scale(1); }
            .ay-globe-nav-container.ay-active .ay-globe-nav-item:nth-child(2) { transform: translate(108px, -100px) scale(1); }
            .ay-globe-nav-container.ay-active .ay-globe-nav-item:nth-child(3) { transform: translate(116px, -36px) scale(1); }
        }
    `;
    document.head.appendChild(style);

    // ============================================================
    // 2) آیکون‌های SVG اینلاین (Self-contained)
    // ============================================================
    var ICONS = {
        globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
        home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M9.5 21v-6h5v6"/></svg>',
        link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.07 0l2.12-2.12a5 5 0 0 0-7.07-7.07l-1.13 1.13"/><path d="M14 11a5 5 0 0 0-7.07 0l-2.12 2.12a5 5 0 0 0 7.07 7.07l1.13-1.13"/></svg>',
        globe2: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M4.5 6.5h15"/><path d="M4.5 17.5h15"/></svg>'
    };

    // ============================================================
    // 3) ساخت DOM ویجت
    // ============================================================
    var container = document.createElement('div');
    container.className = 'ay-globe-nav-container';
    container.id = 'ayGlobeNavContainer';
    container.setAttribute('dir', 'ltr');

    // آیتم‌ها
    var itemsWrap = document.createElement('div');
    itemsWrap.className = 'ay-globe-nav-items';

    var navItems = [
        { href: 'https://shammay.ir',  title: 'Shammay.ir',  icon: ICONS.home },
        { href: 'https://shaammy.ir',  title: 'Shaammy.ir',  icon: ICONS.link },
        { href: 'https://shammay.cam', title: 'Shammay.cam', icon: ICONS.globe2 }
    ];

    var itemEls = [];
    navItems.forEach(function (item) {
        var a = document.createElement('a');
        a.className = 'ay-globe-nav-item';
        a.href = item.href;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.title = item.title;
        a.setAttribute('aria-label', item.title);
        a.innerHTML = item.icon;
        a.dataset.icon = item.icon; // برای جایگزینی روی دکمه اصلی
        itemsWrap.appendChild(a);
        itemEls.push(a);
    });

    // دکمه اصلی
    var mainBtn = document.createElement('button');
    mainBtn.className = 'ay-globe-nav-main';
    mainBtn.type = 'button';
    mainBtn.setAttribute('aria-label', 'AyTech Globe Navigator');
    mainBtn.setAttribute('aria-expanded', 'false');

    // لایه shimmer
    var shimmer = document.createElement('span');
    shimmer.className = 'ay-globe-shimmer';

    // آیکون اصلی
    var iconMain = document.createElement('span');
    iconMain.className = 'ay-globe-icon';
    iconMain.innerHTML = ICONS.globe;

    // آیکون جایگزین (مخفی)
    var iconRepl = document.createElement('span');
    iconRepl.className = 'ay-globe-icon-replacement';
    iconRepl.innerHTML = '';

    mainBtn.appendChild(shimmer);
    mainBtn.appendChild(iconMain);
    mainBtn.appendChild(iconRepl);

    container.appendChild(itemsWrap);
    container.appendChild(mainBtn);

    // ============================================================
    // 4) منطق تعامل
    // ============================================================
    var isOpen = false;

    function setOpen(state) {
        isOpen = state;
        container.classList.toggle('ay-active', isOpen);
        mainBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        // هنگام بستن، آیکون جایگزین پاک شود
        if (!isOpen) {
            iconRepl.innerHTML = '';
            container.classList.remove('ay-hovering');
        }
    }

    function toggle() {
        setOpen(!isOpen);
    }

    // کلیک روی دکمه اصلی
    mainBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        // اگر روی دکمه اصلی کلیک شد و آیکون جایگزین فعال بود (حالت هاور آیتم)،
        // کاری نکن جز اینکه منو را باز/بسته کن
        toggle();
    });

    mainBtn.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggle();
        }
    });

    // کلیک بیرون برای بستن
    document.addEventListener('click', function (e) {
        if (isOpen && !container.contains(e.target)) {
            setOpen(false);
        }
    });

    // بستن با Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && isOpen) {
            setOpen(false);
            mainBtn.focus();
        }
    });

    // --- رفتار هاور آیتم‌ها: جایگزینی آیکون روی دکمه اصلی ---
    function showItemIcon(itemEl) {
        iconRepl.innerHTML = itemEl.dataset.icon || '';
        container.classList.add('ay-hovering');
    }
    function hideItemIcon() {
        // اگر هنوز روی هیچ آیتمی نیستیم
        var anyHover = itemEls.some(function (el) {
            return el.matches(':hover') || el.matches(':focus-visible');
        });
        if (!anyHover) {
            container.classList.remove('ay-hovering');
            // پاکسازی پس از پایان انیمیشن
            setTimeout(function () {
                if (!container.classList.contains('ay-hovering')) {
                    iconRepl.innerHTML = '';
                }
            }, 250);
        }
    }

    itemEls.forEach(function (el) {
        el.addEventListener('mouseenter', function () { showItemIcon(el); });
        el.addEventListener('mouseleave', hideItemIcon);
        el.addEventListener('focus', function () { showItemIcon(el); });
        el.addEventListener('blur', hideItemIcon);
        // بعد از کلیک، منو بسته می‌شود (لینک در تب جدید باز می‌شود)
        el.addEventListener('click', function () {
            // اجازه بده لینک باز شود؛ فقط حالت را پاک کن
            setTimeout(function () {
                setOpen(false);
            }, 120);
        });
    });

    // ============================================================
    // 5) اتصال به DOM
    // ============================================================
    function mount() {
        if (!document.body) {
            document.addEventListener('DOMContentLoaded', mount, { once: true });
            return;
        }
        // اگر از قبل وجود دارد، دوباره اضافه نکن
        if (document.getElementById('ayGlobeNavContainer')) return;
        document.body.appendChild(container);
    }
    mount();

})();