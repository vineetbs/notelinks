interface InputProps {
  placeholder: string;
  reference?: any;
}

export const InputBox = ({ placeholder, reference }: InputProps) => {
  return (
    <div className="flex justify-center">
      <input
        type="text"
        placeholder={placeholder}
        className="m-1 p-3 rounded border border-slate-500 px-2  "
        ref={reference}
      />
    </div>
  );
};
