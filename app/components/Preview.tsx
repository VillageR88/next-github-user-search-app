import { Fragment, LegacyRef } from 'react';

const Preview = ({
  text,
  refProp,
  previewOn,
}: {
  text: string;
  refProp: LegacyRef<HTMLDivElement> | undefined;
  previewOn: boolean;
}) => {
  function linkAfterProcessor(text: string) {
    const regex = /\[(.*?)\]\((.*?)\)/g;
    const parts = Array.from(text.matchAll(regex));
    if (parts.length === 0) return text;
    return parts.map((part, index) => {
      const linkText = part[1];
      const linkUrl = part[2];
      return (
        <Fragment key={index}>
          <span>{text.slice(0, part.index)}</span>
          <a href={linkUrl} className="underline">
            {linkText}
          </a>
          <span>{text.slice(part.index + part[0].length)}</span>
        </Fragment>
      );
    });
  }
  const parseText = (text: string) => {
    const markList = [] as number[];
    const markListArray = [] as [number, number][];
    const markMapArray = [] as number[][];
    text.split('\n').forEach((line, index) => {
      if (line.startsWith('```')) {
        markList.push(index);
      }
    });
    for (let i = 0; i < markList.length; i += 2) {
      if (i + 1 >= markList.length) break;
      markListArray.push([markList[i], markList[i + 1]]);
    }
    markListArray.map((mark, index) => {
      for (let i = mark[0] + 1; i < mark[1]; i++) {
        if (!markMapArray[index]) markMapArray[index] = [];
        markMapArray[index].push(i);
      }
    });
    return text.split('\n').map((line, index) => {
      if (markMapArray.some((mark) => mark.includes(index - 1))) {
        return null;
      } else if (line.startsWith('```')) {
        return null;
      } else if (markMapArray.some((mark) => mark.includes(index))) {
        const markIndex = markMapArray.findIndex((mark) => mark.includes(index));
        return (
          <pre
            key={index}
            className="flex flex-col rounded-[8px] bg-[#F5F5F5] p-[24px] transition-colors dark:bg-[#2B2D31]"
          >
            {markMapArray[markIndex].map((mark) => {
              return (
                <p
                  className="break-all font-robotoMono text-[14px] leading-[24px] text-[#35393F] transition-colors dark:text-[#C1C4CB]"
                  key={mark}
                >
                  {linkAfterProcessor(text.split('\n')[mark])}
                </p>
              );
            })}
          </pre>
        );
      } else if (line.startsWith('# ')) {
        return (
          <p
            className="font-robotoSlab text-[32px] font-bold text-[#35393F] transition-colors dark:text-[#FFFFFF]"
            key={index}
          >
            {linkAfterProcessor(line.slice(2))}
          </p>
        );
      } else if (line.startsWith('## ')) {
        return (
          <p
            className="font-robotoSlab text-[28px] font-light text-[#35393F] transition-colors dark:text-[#FFFFFF]"
            key={index}
          >
            {linkAfterProcessor(line.slice(3))}
          </p>
        );
      } else if (line.startsWith('### ')) {
        return (
          <p
            className="font-robotoSlab text-[24px] font-bold text-[#35393F] transition-colors dark:text-[#FFFFFF]"
            key={index}
          >
            {linkAfterProcessor(line.slice(4))}
          </p>
        );
      } else if (line.startsWith('#### ')) {
        return (
          <p
            className="font-robotoSlab text-[20px] font-bold leading-[24px] text-[#35393F] transition-colors dark:text-[#FFFFFF]"
            key={index}
          >
            {linkAfterProcessor(line.slice(5))}
          </p>
        );
      } else if (line.startsWith('##### ')) {
        return (
          <p
            className="font-robotoSlab text-[16px] font-bold leading-[22px] text-[#35393F] transition-colors dark:text-[#FFFFFF]"
            key={index}
          >
            {linkAfterProcessor(line.slice(6))}
          </p>
        );
      } else if (line.startsWith('###### ')) {
        return (
          <p
            className="font-robotoSlab text-[14px] font-bold leading-[20px] text-[#E46643] transition-colors dark:text-[#E46643]"
            key={index}
          >
            {linkAfterProcessor(line.slice(7))}
          </p>
        );
      } else if (/^\d+\.\s/.test(line)) {
        const part1 = line.split('. ')[0];
        const part2 = line.split('. ')[1];
        return (
          <div key={index} className="flex items-start pl-[24px] leading-[22px]">
            <p className="font-robotoSlab text-[14px] text-[#7C8187] transition-colors dark:text-[#C1C4CB]">
              {part1.concat('.')}
            </p>
            <p className="pl-[16px] font-robotoSlab text-[14px] text-[#7C8187] transition-colors dark:text-[#C1C4CB]">
              {linkAfterProcessor(part2)}
            </p>
          </div>
        );
      } else if (line.startsWith('- ')) {
        return (
          <ul key={index} className="custom-list orangeLi pl-[50px]">
            <li className="font-robotoSlab text-[14px] leading-[20px] text-[#7C8187] transition-colors dark:text-[#C1C4CB]">
              {linkAfterProcessor(line.split('- ')[1])}
            </li>
          </ul>
        );
      } else if (line.startsWith('> ')) {
        let parts = line.split('> ')[1];
        if (parts.endsWith('.')) parts = parts.slice(0, parts.length - 1);
        return (
          <div key={index} className="inline-flex w-full">
            <div className="h-full w-[4px] shrink-0 rounded-l bg-[#E46643]"></div>
            <div className="w-[calc(100%-4px)] rounded-r bg-[#F5F5F5] p-[24px] transition-colors dark:bg-[#2B2D31]">
              <p className="font-robotoSlab text-[14px] font-bold leading-[24px] text-[#35393F] transition-colors dark:text-[#FFFFF]">
                {linkAfterProcessor(parts)}
              </p>
            </div>
          </div>
        );
      } else if (line.includes('`')) {
        const lines = line.split('`').map((part, index) => (
          <span
            className={`${
              index % 2 === 0
                ? 'font-robotoSlab text-[#35393F] dark:text-[#C1C4CB]'
                : 'font-robotoMono text-[#35393F] dark:text-[#FFFFFF]'
            } font-robotoMono text-[14px]  transition-colors`}
            key={index}
          >
            {linkAfterProcessor(part)}
          </span>
        ));
        return (
          <span key={index} className="leading-[24px] tracking-normal">
            {lines}
          </span>
        );
      } else {
        return (
          <p
            className="font-robotoSlab text-[14px] leading-[24px] tracking-normal text-[#7C8187] transition-colors dark:text-[#C1C4CB]"
            key={index}
          >
            {linkAfterProcessor(line)}
          </p>
        );
      }
    });
  };

  return (
    <div
      ref={refProp}
      className={`${previewOn ? 'w-[720px]' : 'w-full max-w-[720px]'} no-scrollbar flex h-full flex-col gap-[12px] overflow-scroll break-words px-[23px] pb-[100px] pt-[30px] font-robotoMono text-[14px] leading-[40px] text-[#35393F] transition-colors dark:text-[#C1C4CB]`}
    >
      {parseText(text)}
    </div>
  );
};

export default Preview;
