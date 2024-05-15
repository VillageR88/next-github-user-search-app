export default function ModuleEmail({ Button }: { Button(): JSX.Element }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between px-1">
        <label className="flex w-fit items-center gap-2" htmlFor="email">
          <svg
            className="transition dark:fill-white"
            xmlns="http://www.w3.org/2000/svg"
            height="18"
            viewBox="0 -960 960 960"
            width="18"
          >
            <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" />
          </svg>
          <span>Email</span>
        </label>
        <Button />
      </div>
      <input
        name="email"
        required
        autoComplete="email"
        placeholder="example@domain.com"
        className="regularInput"
        id="email"
        type="email"
        pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
      />
    </div>
  );
}
