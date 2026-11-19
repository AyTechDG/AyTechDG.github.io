/**
 * AyTech Globe-Navigator — 5 Buttons
 * Self-contained. No external resources. No emojis.
 */
(function () {
    'use strict';
    if (window.__AY_GLOBE_NAV_LOADED__) return;
    window.__AY_GLOBE_NAV_LOADED__ = true;

    var style = document.createElement('style');
    style.id = 'ay-globe-nav-styles';
    style.textContent = `
        .ay-globe-nav-container {
            position: fixed;
            bottom: 40px; left: 55px;
            z-index: 2147483000;
            font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
            --ay-cyan: #00e5ff;
            --ay-magenta: #ff2bd6;
            --ay-gold: #ffd54f;
            --ay-radius: 44px;
            --ay-item-size: 40px;
            --ay-gap: 18px;
            --ay-glass-border: rgba(255,255,255,0.28);
            --ay-glass-shadow: rgba(0,0,0,0.35);
        }
        .ay-globe-nav-main {
            position: relative;
            width: var(--ay-radius); height: var(--ay-radius);
            border-radius: 50%; border: none; cursor: pointer;
            z-index: 2147483002;
            display: flex; justify-content: center; align-items: center;
            padding: 0; color: #fff;
            background: radial-gradient(circle at 30% 30%,
                rgba(255,255,255,0.22) 0%,
                rgba(10,26,47,0.55) 55%,
                rgba(6,18,36,0.78) 100%);
            -webkit-backdrop-filter: blur(14px) saturate(160%);
            backdrop-filter: blur(14px) saturate(160%);
            border: 1px solid var(--ay-glass-border);
            box-shadow:
                0 0 0 1px rgba(255,255,255,0.10),
                0 0 22px rgba(0,229,255,0.35),
                0 0 42px rgba(255,43,214,0.16),
                inset 0 1px 0 rgba(255,255,255,0.35),
                inset 0 0 20px rgba(0,229,255,0.12),
                0 8px 24px var(--ay-glass-shadow);
            transition: transform 0.35s cubic-bezier(.68,-0.55,.27,1.55),
                        box-shadow 0.35s ease;
            isolation: isolate;
            -webkit-tap-highlight-color: transparent;
        }
        .ay-globe-nav-main::before {
            content: ""; position: absolute; inset: -3px; border-radius: 50%;
            background: conic-gradient(from 0deg, var(--ay-cyan), var(--ay-magenta), var(--ay-gold), var(--ay-cyan));
            opacity: 0.85; z-index: -2; animation: ay-spin 6s linear infinite;
        }
        .ay-globe-nav-main::after {
            content: ""; position: absolute; inset: 2px; border-radius: 50%;
            background: radial-gradient(circle at 30% 30%,
                rgba(255,255,255,0.18) 0%, rgba(10,26,47,0.55) 60%, rgba(6,18,36,0.85) 100%);
            z-index: -1;
        }
        .ay-globe-nav-main .ay-shimmer {
            position: absolute; inset: 0; border-radius: 50%; overflow: hidden;
            z-index: 1; pointer-events: none;
        }
        .ay-globe-nav-main .ay-shimmer::before {
            content: ""; position: absolute; top: -60%; left: -60%;
            width: 220%; height: 220%;
            background: linear-gradient(115deg, transparent 0%, transparent 40%,
                rgba(255,255,255,0.55) 50%, transparent 60%, transparent 100%);
            transform: translateX(-100%);
            animation: ay-shimmer 3s ease-in-out infinite;
        }
        .ay-globe-nav-main .ay-icon-cycle {
            position: relative; z-index: 2; width: 28px; height: 28px;
            display: flex; justify-content: center; align-items: center;
            filter: drop-shadow(0 0 6px rgba(0,229,255,0.65));
        }
        .ay-globe-nav-main .ay-icon-cycle > svg {
            position: absolute; inset: 0; width: 100%; height: 100%;
            opacity: 0; transform: scale(0.4) rotate(-90deg);
            animation: ay-cycle 9s ease-in-out infinite;
        }
        .ay-globe-nav-main .ay-icon-cycle > svg:nth-child(1) { animation-delay: 0s; }
        .ay-globe-nav-main .ay-icon-cycle > svg:nth-child(2) { animation-delay: 3s; }
        .ay-globe-nav-main .ay-icon-cycle > svg:nth-child(3) { animation-delay: 6s; }
        .ay-globe-nav-main .ay-icon-replacement {
            position: absolute; z-index: 3; width: 26px; height: 26px;
            display: flex; justify-content: center; align-items: center;
            opacity: 0; transform: scale(0.5);
            transition: opacity 0.25s ease, transform 0.3s cubic-bezier(.68,-0.55,.27,1.55);
            filter: drop-shadow(0 0 8px rgba(255,43,214,0.8));
            color: #fff;
        }
        .ay-globe-nav-main .ay-icon-replacement svg { width: 100%; height: 100%; }
        .ay-globe-nav-main:hover, .ay-globe-nav-main:focus-visible {
            transform: scale(1.08);
            box-shadow:
                0 0 0 1px rgba(255,255,255,0.20),
                0 0 30px rgba(0,229,255,0.65),
                0 0 60px rgba(255,43,214,0.32),
                inset 0 1px 0 rgba(255,255,255,0.45),
                inset 0 0 22px rgba(0,229,255,0.22),
                0 10px 30px var(--ay-glass-shadow);
            outline: none;
        }
        .ay-globe-nav-container.ay-hovering .ay-globe-nav-main .ay-icon-cycle {
            opacity: 0; transform: scale(0.3);
        }
        .ay-globe-nav-container.ay-hovering .ay-globe-nav-main .ay-icon-replacement {
            opacity: 1; transform: scale(1);
        }
        .ay-globe-nav-container.ay-hovering .ay-globe-nav-main {
            box-shadow:
                0 0 0 1px rgba(255,255,255,0.22),
                0 0 30px rgba(255,43,214,0.60),
                0 0 60px rgba(0,229,255,0.32),
                inset 0 1px 0 rgba(255,255,255,0.45),
                inset 0 0 22px rgba(255,43,214,0.22),
                0 10px 30px var(--ay-glass-shadow);
        }
        .ay-globe-nav-items {
            position: absolute; bottom: 0; left: 0;
            width: 0; height: 0;
            z-index: 2147483001; pointer-events: none;
        }
        .ay-globe-nav-item {
            position: absolute;
            width: var(--ay-item-size); height: var(--ay-item-size);
            border-radius: 50%;
            display: flex; justify-content: center; align-items: center;
            text-decoration: none; color: #fff;
            background: radial-gradient(circle at 30% 30%,
                rgba(255,255,255,0.20) 0%,
                rgba(10,26,47,0.42) 55%,
                rgba(6,18,36,0.62) 100%);
            -webkit-backdrop-filter: blur(12px) saturate(160%);
            backdrop-filter: blur(12px) saturate(160%);
            border: 1px solid var(--ay-glass-border);
            box-shadow:
                0 0 0 1px rgba(255,255,255,0.06),
                0 0 14px rgba(0,229,255,0.28),
                inset 0 1px 0 rgba(255,255,255,0.28),
                inset 0 0 12px rgba(0,229,255,0.10),
                0 6px 18px var(--ay-glass-shadow);
            opacity: 0; transform: translate(0,0) scale(0.4);
            pointer-events: none;
            transition: transform 0.5s cubic-bezier(.68,-0.55,.27,1.55),
                        opacity 0.35s ease, box-shadow 0.3s ease, background 0.3s ease;
            -webkit-tap-highlight-color: transparent;
            overflow: hidden;
        }
        .ay-globe-nav-item svg {
            width: 20px; height: 20px; position: relative; z-index: 2;
            filter: drop-shadow(0 0 4px rgba(0,229,255,0.55));
            transition: transform 0.3s ease;
        }
        .ay-globe-nav-item::before {
            content: ""; position: absolute; top: -50%; left: -80%;
            width: 220%; height: 200%;
            background: linear-gradient(115deg, transparent 0%, transparent 42%,
                rgba(255,255,255,0.45) 50%, transparent 58%, transparent 100%);
            transform: translateX(-100%);
            animation: ay-shimmer 3s ease-in-out infinite;
            z-index: 1; pointer-events: none;
        }
        .ay-globe-nav-container.ay-active .ay-globe-nav-item {
            opacity: 1; pointer-events: auto;
        }
        .ay-globe-nav-item:hover, .ay-globe-nav-item:focus-visible {
            outline: none;
            background: radial-gradient(circle at 30% 30%,
                rgba(255,255,255,0.30) 0%,
                rgba(0,229,255,0.22) 50%,
                rgba(255,43,214,0.20) 75%,
                rgba(6,18,36,0.65) 100%);
            box-shadow:
                0 0 0 1px rgba(255,255,255,0.30),
                0 0 22px rgba(0,229,255,0.75),
                0 0 44px rgba(255,43,214,0.42),
                inset 0 1px 0 rgba(255,255,255,0.40),
                inset 0 0 16px rgba(255,43,214,0.25),
                0 10px 26px var(--ay-glass-shadow);
        }
        .ay-globe-nav-item:hover svg, .ay-globe-nav-item:focus-visible svg {
            transform: scale(1.25);
        }
        @keyframes ay-spin { 100% { transform: rotate(360deg); } }
        @keyframes ay-shimmer {
            0% { transform: translateX(-100%); }
            50% { transform: translateX(100%); }
            100% { transform: translateX(100%); }
        }
        @keyframes ay-cycle {
            0% { opacity: 0; transform: scale(0.4) rotate(-90deg); }
            8% { opacity: 1; transform: scale(1) rotate(0deg); }
            30% { opacity: 1; transform: scale(1) rotate(0deg); }
            38% { opacity: 0; transform: scale(1.3) rotate(90deg); }
            100% { opacity: 0; transform: scale(0.4) rotate(90deg); }
        }
        @media (prefers-reduced-motion: reduce) {
            .ay-globe-nav-main::before,
            .ay-globe-nav-main .ay-shimmer::before,
            .ay-globe-nav-item::before,
            .ay-globe-nav-main .ay-icon-cycle > svg { animation: none !important; }
            .ay-globe-nav-main .ay-icon-cycle > svg:nth-child(1) { opacity: 1; transform: scale(1); }
        }
        @media (max-width: 480px) {
            .ay-globe-nav-container {
                bottom: 33px; left: 40px;
                --ay-radius: 46px;
                --ay-item-size: 36px;
                --ay-gap: 16px;
            }
        }
    `;
    document.head.appendChild(style);

    var ICONS = {
        home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M9.5 21v-6h5v6"/></svg>',
        link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.07 0l2.12-2.12a5 5 0 0 0-7.07-7.07l-1.13 1.13"/><path d="M14 11a5 5 0 0 0-7.07 0l-2.12 2.12a5 5 0 0 0 7.07 7.07l1.13-1.13"/></svg>',
        globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
        mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
        star: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3 2.7 5.7 6.3.9-4.6 4.4 1.1 6.3L12 17.8 6.5 20.3l1.1-6.3L3 9.6l6.3-.9z"/></svg>',
        moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
        bolt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 4.5 13.5H11l-1 8.5L19.5 10H13z"/></svg>',
        earth: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M4.5 6.5h15"/><path d="M4.5 17.5h15"/></svg>'
    };

    var container = document.createElement('div');
    container.className = 'ay-globe-nav-container';
    container.id = 'ayGlobeNavContainer';
    container.setAttribute('dir', 'ltr');

    var itemsWrap = document.createElement('div');
    itemsWrap.className = 'ay-globe-nav-items';

    var navItems = [
        { href: 'https://shammay.cam',  title: 'Ay Tech Site',  icon: ICONS.globe },
        { href: 'https://shaammy.ir',  title: 'Ay VPN Store',  icon: ICONS.moon },
        { href: 'https://shammay.ir', title: 'Ay Tech Home', icon: ICONS.home },
        { href: 'https://white30m.ir', title: 'Ay Tech Links',    icon: ICONS.link },
        { href: 'https://github.com/AyTechDG', title: 'GitHub', icon: ICONS.star }
    ];

    var itemEls = [];
    navItems.forEach(function (item) {
        var a = document.createElement('a');
        a.className = 'ay-globe-nav-item';
        a.href = item.href; a.target = '_blank'; a.rel = 'noopener noreferrer';
        a.title = item.title; a.setAttribute('aria-label', item.title);
        a.innerHTML = item.icon; a.dataset.icon = item.icon;
        itemsWrap.appendChild(a); itemEls.push(a);
    });

    var mainBtn = document.createElement('button');
    mainBtn.className = 'ay-globe-nav-main';
    mainBtn.type = 'button';
    mainBtn.setAttribute('aria-label', 'AyTech Globe Navigator');
    mainBtn.setAttribute('aria-expanded', 'false');

    var shimmer = document.createElement('span');
    shimmer.className = 'ay-shimmer';

    var iconCycle = document.createElement('span');
    iconCycle.className = 'ay-icon-cycle';
    iconCycle.innerHTML = ICONS.moon + ICONS.bolt + ICONS.earth;

    var iconRepl = document.createElement('span');
    iconRepl.className = 'ay-icon-replacement';

    mainBtn.appendChild(shimmer);
    mainBtn.appendChild(iconCycle);
    mainBtn.appendChild(iconRepl);
    container.appendChild(itemsWrap);
    container.appendChild(mainBtn);

    function getNumbers() {
        var cs = getComputedStyle(container);
        return {
            radius: parseFloat(cs.getPropertyValue('--ay-radius')) || 58,
            itemSize: parseFloat(cs.getPropertyValue('--ay-item-size')) || 44,
            gap: parseFloat(cs.getPropertyValue('--ay-gap')) || 12
        };
    }

    // نسخه ۵ دکمه‌ای: محور ۶۵°، گام ریزتر و قوس پهن‌تر
    function layout() {
        var n = itemEls.length; if (n === 0) return;
        var s = getNumbers();
        var orbit = s.radius / 2 + s.gap + s.itemSize / 2;
        var baseAngle = 65 * Math.PI / 180;
        var arcStep = (s.itemSize + s.gap) / orbit;
        var totalArc = arcStep * (n - 1);
        var startAngle = baseAngle - totalArc / 2;
        var cx = s.radius / 2, cy = -s.radius / 2;
        itemEls.forEach(function (el, i) {
            var ang = startAngle + arcStep * i;
            var x = cx + Math.cos(ang) * orbit - s.itemSize / 2;
            var y = cy - Math.sin(ang) * orbit - s.itemSize / 2;
            el.style.setProperty('--ay-open-x', x.toFixed(2) + 'px');
            el.style.setProperty('--ay-open-y', y.toFixed(2) + 'px');
        });
    }
    function applyPositions() {
        itemEls.forEach(function (el) {
            var x = el.style.getPropertyValue('--ay-open-x') || '0px';
            var y = el.style.getPropertyValue('--ay-open-y') || '0px';
            el.style.transform = 'translate(' + x + ',' + y + ') scale(1)';
        });
    }
    function relayout() {
        layout();
        if (container.classList.contains('ay-active')) applyPositions();
    }

    var isOpen = false, hoverOpenTimer = null, hoverCloseTimer = null;
    function setOpen(state) {
        isOpen = state;
        container.classList.toggle('ay-active', isOpen);
        mainBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        if (isOpen) { relayout(); requestAnimationFrame(applyPositions); }
        else {
            itemEls.forEach(function (el) { el.style.transform = ''; });
            iconRepl.innerHTML = '';
            container.classList.remove('ay-hovering');
        }
    }
    function toggle() { setOpen(!isOpen); }
    mainBtn.addEventListener('click', function (e) { e.stopPropagation(); toggle(); });
    mainBtn.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });
    mainBtn.addEventListener('mouseenter', function () {
        if (hoverCloseTimer) { clearTimeout(hoverCloseTimer); hoverCloseTimer = null; }
        if (!isOpen) hoverOpenTimer = setTimeout(function () { setOpen(true); }, 120);
    });
    mainBtn.addEventListener('mouseleave', function () {
        if (hoverOpenTimer) { clearTimeout(hoverOpenTimer); hoverOpenTimer = null; }
        if (isOpen) hoverCloseTimer = setTimeout(function () { setOpen(false); }, 350);
    });
    itemsWrap.addEventListener('mouseenter', function () {
        if (hoverCloseTimer) { clearTimeout(hoverCloseTimer); hoverCloseTimer = null; }
    });
    itemsWrap.addEventListener('mouseleave', function () {
        if (isOpen) hoverCloseTimer = setTimeout(function () { setOpen(false); }, 300);
    });
    document.addEventListener('click', function (e) {
        if (isOpen && !container.contains(e.target)) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && isOpen) { setOpen(false); mainBtn.focus(); }
    });
    function showItemIcon(el) {
        iconRepl.innerHTML = el.dataset.icon || '';
        container.classList.add('ay-hovering');
    }
    function hideItemIcon() {
        var anyHover = itemEls.some(function (el) {
            return el.matches(':hover') || el.matches(':focus-visible');
        });
        if (!anyHover) {
            container.classList.remove('ay-hovering');
            setTimeout(function () {
                if (!container.classList.contains('ay-hovering')) iconRepl.innerHTML = '';
            }, 250);
        }
    }
    itemEls.forEach(function (el) {
        el.addEventListener('mouseenter', function () { showItemIcon(el); });
        el.addEventListener('mouseleave', hideItemIcon);
        el.addEventListener('focus', function () { showItemIcon(el); });
        el.addEventListener('blur', hideItemIcon);
        el.addEventListener('click', function () { setTimeout(function () { setOpen(false); }, 120); });
    });

    function mount() {
        if (!document.body) {
            document.addEventListener('DOMContentLoaded', mount, { once: true });
            return;
        }
        if (document.getElementById('ayGlobeNavContainer')) return;
        document.body.appendChild(container);
        requestAnimationFrame(relayout);
    }
    mount();
    window.addEventListener('resize', function () { relayout(); }, { passive: true });
})();