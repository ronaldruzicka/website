import TerminalCommand from './terminal-command.svelte';
import TerminalContent from './terminal-content.svelte';
import TerminalCursor from './terminal-cursor.svelte';
import TerminalHeader from './terminal-header.svelte';
import TerminalOutput from './terminal-output.svelte';
import TerminalRoot from './terminal-root.svelte';

export const Terminal = {
	Command: TerminalCommand,
	Content: TerminalContent,
	Cursor: TerminalCursor,
	Header: TerminalHeader,
	Output: TerminalOutput,
	Root: TerminalRoot,
};
