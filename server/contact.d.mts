import type { IncomingMessage, ServerResponse } from 'node:http'

export function createContactApi(): (request: IncomingMessage, response: ServerResponse, next: () => void) => void
