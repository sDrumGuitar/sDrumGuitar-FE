interface SendMessageEditorProps {
  content: string;
  onChange: (value: string) => void;
}

function SendMessageEditor({ content, onChange }: SendMessageEditorProps) {
  return (
    <textarea
      className="w-full min-h-[220px] md:min-h-[360px] resize-none rounded-lg border border-gray-200 bg-white p-3 text-sm text-gray-800 placeholder:text-gray-400 focus:border-primary focus:outline-none"
      rows={10}
      placeholder="전송할 내용을 입력하세요."
      value={content}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}

export default SendMessageEditor;
