import { useState } from 'react';

export function ChatWindow({ onSend }: { onSend: (message: string) => void }) {
  const [message, setMessage] = useState('');

  return (
    <div>
      <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={() => onSend(message)}>Send</button>
    </div>
  );
}
