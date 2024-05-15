export default function ModulePassword({ Button, newPassword }: { Button?: () => JSX.Element; newPassword?: boolean }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between px-1">
        <label className="flex w-fit items-center gap-[6px]" htmlFor="password">
          <svg
            className="transition dark:fill-white"
            xmlns="http://www.w3.org/2000/svg"
            height="18"
            viewBox="0 -960 960 960"
            width="18"
          >
            <path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z" />
          </svg>
          <span>{newPassword ? 'New Password' : 'Password'}</span>
        </label>
        {Button && <Button />}
      </div>
      <input
        className="regularInput"
        name="password"
        required
        minLength={8}
        autoComplete="current-password"
        placeholder="Enter your password"
        id="password"
        type="password"
      />
    </div>
  );
}
