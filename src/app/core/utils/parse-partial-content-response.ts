export function parsePartialContentResponse(body: Record<string, string>) {
  let message = '';

  for (const key in body) {
    if (Object.prototype.hasOwnProperty.call(body, key)) {
      const element = body[key];
      message += `"${key}" ${element}. `;
    }
  }

  return message.trim();
}
