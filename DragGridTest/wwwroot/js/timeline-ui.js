export function capture(el, pointerId) {
    if (!el) return;
    try { el.setPointerCapture(pointerId); } catch {}
}

export function release(el, pointerId) {
    if (!el) return;
    try { el.releasePointerCapture(pointerId); } catch {}
}

export function showPreview(previewEl, leftPx, widthPx, topPx, label, bg, border, text) {
    if (!previewEl) return;
    previewEl.style.display = "flex";
    previewEl.style.top = `${topPx}px`;
    previewEl.style.transform = `translateX(${leftPx}px)`;
    previewEl.style.width = `${widthPx}px`;
    if (bg) previewEl.style.background = bg;
    if (border) previewEl.style.border = `1px solid ${border}`;
    if (text) previewEl.style.color = text;

    const lab = previewEl.querySelector(".label");
    if (lab) lab.textContent = label ?? "";
}

export function hidePreview(previewEl) {
    if (!previewEl) return;
    previewEl.style.display = "none";
}

export function laneHit(clientX, clientY) {
    const el = document.elementFromPoint(clientX, clientY);
    if (!el) return { idx: -1, offsetX: 0, offsetY: 0 };

    const lane = el.closest?.(".lane");
    if (!lane) return { idx: -1, offsetX: 0, offsetY: 0 };

    const idxStr = lane.getAttribute("data-lane-idx");
    const idx = idxStr ? parseInt(idxStr, 10) : -1;

    const r = lane.getBoundingClientRect();
    const offsetX = clientX - r.left;
    const offsetY = clientY - r.top;

    return { idx, offsetX, offsetY };
}
