window.dragGrid = {
  getHitInfo: function (clientX, clientY, cols) {
    try {
      const el = document.elementFromPoint(clientX, clientY);
      if (!el) return null;
      const td = el.closest('td');
      if (!td) return null;
      const tr = td.parentElement;
      const table = tr.closest('table');
      if (!table) return null;
      const col = td.cellIndex;
      // rowIndex relative to tbody
      let row = Array.from(table.rows).indexOf(tr);
      // If there's a THEAD, adjust to tbody index
      const thead = table.tHead;
      if (thead) {
        row -= thead.rows.length;
      }
      if (row < 0) row = 0;
      const idx = row * cols + col;

      // Determine which slice within the cell
      const rect = td.getBoundingClientRect();
      const relY = (clientY - rect.top) / rect.height;
      const slices = td.querySelectorAll('.slice');
      let stackIndex = 0;
      if (slices.length > 0) {
        const h = 1 / slices.length;
        stackIndex = Math.min(slices.length - 1, Math.max(0, Math.floor(relY / h)));
      }

      // Determine part by class name
      let part = 'body';
      let cur = el;
      while (cur && cur !== td) {
        if (cur.classList && cur.classList.contains('eventStart')) { part = 'start'; break; }
        if (cur.classList && cur.classList.contains('eventEnd')) { part = 'end'; break; }
        if (cur.classList && cur.classList.contains('event')) { part = 'body'; break; }
        cur = cur.parentElement;
      }

      return { row, col, idx, part, stackIndex };
    } catch (e) {
      return null;
    }
  }
};
