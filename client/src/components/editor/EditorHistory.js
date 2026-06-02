// src/components/editor/EditorHistory.js

/**
 * Simple undo/redo stack for the editor.
 * Stores deep-cloned snapshots of the components array.
 *
 * Usage:
 *   const history = useRef(createHistory(initialComponents));
 *   history.current.push(components);      // save snapshot
 *   const prev = history.current.undo();   // go back  → returns state or null
 *   const next = history.current.redo();   // go forward → returns state or null
 *   history.current.canUndo()              // boolean
 *   history.current.canRedo()              // boolean
 */
export const createHistory = (initial = []) => {
  const stack  = [JSON.parse(JSON.stringify(initial))];
  let   cursor = 0;

  return {
    push(state) {
      // Discard any future states when a new action is taken
      stack.splice(cursor + 1);
      stack.push(JSON.parse(JSON.stringify(state)));
      if (stack.length > 50) stack.shift(); // cap at 50 states
      cursor = stack.length - 1;
    },
    undo() {
      if (cursor <= 0) return null;
      cursor--;
      return JSON.parse(JSON.stringify(stack[cursor]));
    },
    redo() {
      if (cursor >= stack.length - 1) return null;
      cursor++;
      return JSON.parse(JSON.stringify(stack[cursor]));
    },
    canUndo() { return cursor > 0; },
    canRedo()  { return cursor < stack.length - 1; },
    reset(state) {
      stack.length = 0;
      stack.push(JSON.parse(JSON.stringify(state)));
      cursor = 0;
    },
  };
};