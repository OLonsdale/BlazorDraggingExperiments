export function capture(el, pointerId) {
    if (!el) return;
    try { el.setPointerCapture(pointerId); } catch {}
}

export function release(el, pointerId) {
    if (!el) return;
    try { el.releasePointerCapture(pointerId); } catch {}
}

export function showPreview(previewEl, leftPx, widthPx) {
    if (!previewEl) return;
    previewEl.style.display = "block";
    previewEl.style.transform = `translateX(${leftPx}px)`;
    previewEl.style.width = `${widthPx}px`;
}

export function hidePreview(previewEl) {
    if (!previewEl) return;
    previewEl.style.display = "none";
}

export function laneHit(clientX, clientY) {
    const el = document.elementFromPoint(clientX, clientY);
    if (!el) return { idx: -1, offsetX: 0 };

    const lane = el.closest?.(".lane");
    if (!lane) return { idx: -1, offsetX: 0 };

    const idxStr = lane.getAttribute("data-lane-idx");
    const idx = idxStr ? parseInt(idxStr, 10) : -1;

    const r = lane.getBoundingClientRect();
    const offsetX = clientX - r.left;

    return { idx, offsetX };
}
