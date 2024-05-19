const BottomRows = ({
  description,
  Svg,
  disabled,
  title,
}: {
  description: string;
  Svg: () => JSX.Element;
  disabled: boolean;
  title: string;
}) =>
  title === 'Company' && !disabled && !description.startsWith('@') ? (
    <div className="flex cursor-default gap-[16px] fill-[#4b6a9b] text-left text-[#4b6a9b] transition-colors dark:fill-[#FFFFFF] dark:text-[#FFFFFF]">
      <Svg />
      <span className="max-w-full break-words">{description}</span>
    </div>
  ) : disabled ? (
    <div className="flex cursor-default gap-[16px] fill-[#4b6a9b] text-left text-[#4b6a9b] opacity-50 transition-colors dark:fill-[#FFFFFF] dark:text-[#FFFFFF]">
      <Svg />
      <span className="max-w-full break-words">{description}</span>
    </div>
  ) : (
    <a
      href={
        title === 'Website'
          ? description.startsWith('http')
            ? description
            : `https://${description}`
          : title === 'Twitter'
            ? `https://twitter.com/${description}`
            : title === 'Location'
              ? `https://www.google.com/maps/place/${description}}`
              : ` 
                https://www.github.com/${description.slice(1)}`
      }
      className="group1Parent flex max-w-fit gap-[16px] fill-[#4b6a9b] text-left text-[#4b6a9b] transition-colors dark:fill-[#FFFFFF] dark:text-[#FFFFFF]"
    >
      <Svg />
      <span className="group1Child max-w-full break-words">{description}</span>
    </a>
  );

export default BottomRows;
