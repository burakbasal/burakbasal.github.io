const methods = [
  'log', 'info', 'warn', 'error', 'debug', 'trace', 'dir', 'dirxml',
  'table', 'group', 'groupCollapsed', 'groupEnd', 'time', 'timeEnd',
  'timeLog', 'count', 'countReset', 'assert', 'clear', 'profile', 'profileEnd',
] as const

const noop = () => {}

/**
 * Production console stays empty and cannot be restored by typing in DevTools.
 * Properties are made non-writable and non-configurable, then the object is frozen.
 */
export function silenceConsole() {
  const target = console as unknown as Record<string, unknown>
  for (const method of methods) {
    try {
      Object.defineProperty(target, method, {
        value: noop,
        writable: false,
        enumerable: false,
        configurable: false,
      })
    } catch {
      // A locked-down host console is already silent enough.
    }
  }
  try {
    Object.freeze(target)
  } catch {
    // Ignore hosts that refuse freezing; the no-ops are still installed.
  }
}
