import { createContext } from 'svelte';

export type TerminalLine = {
  reset: () => void;
  play: (signal: AbortSignal) => Promise<void>;
  set_cursor_active: (value: boolean) => void;
};

type TerminalContext = {
  get_lines: () => TerminalLine[];
  register_line: (line: TerminalLine) => () => void;
};

const [get_terminal, set_terminal] = createContext<TerminalContext>();

export const use_terminal_content = () => {
  const lines: TerminalLine[] = [];

  const register_line = (line: TerminalLine) => {
    lines.push(line);

    return () => {
      const line_index = lines.indexOf(line);

      if (line_index >= 0) {
        lines.splice(line_index, 1);
      }
    };
  };

  const terminal = {
    get_lines: () => [...lines],
    register_line,
  } satisfies TerminalContext;

  set_terminal(terminal);

  return terminal;
};

export const use_terminal_line = (line: TerminalLine) => {
  return get_terminal().register_line(line);
};
