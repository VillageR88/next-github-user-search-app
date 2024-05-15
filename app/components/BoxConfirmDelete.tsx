import { useContext } from 'react';
import { DataContext } from '../_providers/DataContext';

const BoxConfirmDelete = () => {
  const { setShowDeleteConfirmation, selected, setDataContext, initialDataContext, setSelected, setHandleAutosave } =
    useContext(DataContext);
  return (
    <div className="relative flex h-[218px] w-[343px] flex-col rounded-[4px] bg-[#FFFFFF] transition-colors dark:bg-[#1D1F22]">
      <button
        type="button"
        onClick={() => {
          setShowDeleteConfirmation(false);
        }}
        className="absolute right-4 top-2 font-bold text-[#1D1F22] transition-colors dark:text-[#FFFFFF]"
      >
        x
      </button>
      <div className="flex size-full flex-col items-start justify-between p-[24px]">
        <h1 className="font-robotoSlab text-[20px] font-bold tracking-normal">Delete this document?</h1>
        <p className="mb-1 font-robotoSlab text-[14px] leading-[24px] text-[#7C8187] dark:text-[#C1C4CB]">
          Are you sure you want to delete the &lsquo;welcome.md&rsquo; document and its contents? This action cannot be
          reversed.
        </p>
        <button
          type="button"
          onClick={() => {
            if (selected === null) return;
            setDataContext((prev) => {
              const temp = [...prev];
              temp.splice(selected, 1);
              initialDataContext.current = temp;
              return temp;
            });
            setSelected(null);
            setHandleAutosave(true);
            setShowDeleteConfirmation(false);
          }}
          className="button2Frame h-[40px] w-full font-roboto text-[15px]"
        >
          Confirm & Delete
        </button>
      </div>
    </div>
  );
};

export default BoxConfirmDelete;
