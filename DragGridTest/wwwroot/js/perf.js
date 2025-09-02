let rafId = 0, last = performance.now(), frames = 0, fps = 0;
let longTasks = 0, longest = 0;
let pmCount = 0;
let observer;

function tick() {
    frames++;
    const now = performance.now();
    if (now - last >= 1000) {
        fps = frames;
        frames = 0;
        last = now;
    }
    rafId = requestAnimationFrame(tick);
}

export function start(pointerTargetSelector) {
    if (!rafId) rafId = requestAnimationFrame(tick);

    if (!observer && 'PerformanceObserver' in window) {
        observer = new PerformanceObserver((list) => {
            for (const e of list.getEntries()) {
                longTasks++;
                if (e.duration > longest) longest = e.duration;
            }
        });
        try { observer.observe({ entryTypes: ['longtask'] }); } catch {}
    }

    if (pointerTargetSelector) {
        const el = document.querySelector(pointerTargetSelector);
        if (el) {
            el.addEventListener('pointermove', () => { pmCount++; }, { passive: true });
        }
    }
}

export function snapshot(laneSelector) {
    const domNodes = laneSelector ? (document.querySelector(laneSelector)?.querySelectorAll('*').length ?? 0) : 0;
    const snap = { fps, longTasks, longest, pmCount, domNodes, ts: performance.now() };
    longTasks = 0; longest = 0; pmCount = 0;
    return snap;
}

export function stop() {
    if (rafId) { cancelAnimationFrame(rafId); rafId = 0; }
    if (observer) { observer.disconnect(); observer = null; }
}
